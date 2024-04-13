// libs
const vscode = require('vscode');

function activate(context) {
	const disposable = vscode.commands.registerCommand('fastCssCopy.copyStyles', async () => {
		const htmlMarkers = {
			start: '<!-- start -->',
			end: '<!-- end -->',
		};

		const cssMarkers = {
			start: '/* start */',
			end: '/* end */',
		}

		let htmlFragment = HTML_MARKERS(htmlMarkers.start, htmlMarkers.end);
		let cssFileData = await CSS_MARKERS(cssMarkers.start, cssMarkers.end);

		if (!htmlFragment || !cssFileData) { return; }

		const classList = classListParser(htmlFragment);
		const newCSS = createNewCSS(cssFileData.path, cssFileData.text, classList, cssMarkers);
		writeInToCSSFile(cssFileData.path, newCSS);

		if (classList === '') {
			vscode.window.showWarningMessage('HTML: no have class name');
		} else {
			vscode.window.showInformationMessage('styles added.');
		}
	});

	context.subscriptions.push(disposable);
}

async function writeInToCSSFile(filePath, content) {
	await vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(content));
}

function createNewCSS(cssFilePath, cssFileList, classList, cssMarkers) {
	const newCSS = [];

	for (let i = 0; i < cssFileList.length; ++i) {
		if (cssFileList[i].includes(cssMarkers.start)) {
			newCSS.push(cssFileList[i]);

			for (let j = 0; j < classList.length; ++j) {
				newCSS.push(`${classList[j]} {}`);
			}

			while (!cssFileList[i].includes(cssMarkers.end)) {
				++i;
			}
			newCSS.push(cssFileList[i]);
		} else {
			newCSS.push(cssFileList[i]);
		}
	}

	return newCSS.join('\n');
}

function classListParser(htmlFragment) {
	const arr = htmlFragment.split('class="');
	if (arr.length < 2) { return ''; }

	const classList = [];

	for (let i = 1; i < arr.length; ++i) {
		const classFragment = arr[i];
		let str = '.';
		for (let j = 0; j < classFragment.length; ++j) {
			if (classFragment[j] === '"') {
				classList.push(str);
				str = '.';
				break;
			}

			if (classFragment[j] === ' ') {
				classList.push(str);
				str = '.';
				continue;
			} else {
				str += classFragment[j];
			}
		}
	}

	return classList;
}

function HTML_MARKERS(startMarker, endMarker) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		const text = document.getText();

		const startIndex = text.indexOf(startMarker);
		const endIndex = text.indexOf(endMarker);

		if (startIndex !== -1 && endIndex !== -1) {
			const htmlFragment = text.substring(startIndex + startMarker.length, endIndex).trim();
			return htmlFragment;
		} else {
			vscode.window.showErrorMessage('HTML markers not found.');
			return null;
		}
	}
}

async function CSS_MARKERS(startMarker, endMarker) {
	const allCssFiles = await vscode.workspace.findFiles('**/*.css');

	for (let i = 0; i < allCssFiles.length; i++) {
		const cssFile = allCssFiles[i];
		const document = await vscode.workspace.openTextDocument(cssFile);
		const text = document.getText();

		if (text.includes(startMarker) && text.includes(endMarker)) {
			return {
				path: cssFile.path,
				text: text.split('\n'),
			};
		}
	}

	vscode.window.showErrorMessage('CSS markers not found.');
	return null;
}

module.exports = {
	activate,
	deactivate: () => {},
};
