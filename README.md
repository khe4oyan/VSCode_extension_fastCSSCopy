# Fast CSS Copy

Link to extension: [VSCode Marketplace - Fast CSS Copy](https://marketplace.visualstudio.com/items?itemName=FastCSSCopy-khc.fastcopy-css-khc)

## Features

Speed up development by copying styles from HTML to CSS with a single keyboard shortcut

> Add this marks in to your HTML file

```shell
<!-- start -->
```

```shell
<!-- end -->
```

===

> Add this marks in to your CSS file

```shell
/* start */
```

```shell
/* end */
```

## For example

### index.html

```shell
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link rel="stylesheet" href="style.css">

		<title>Fast CSS styles copy | Example</title>
	</head>
	<body>
		<header class="header">
			<h1 class="header_text">Fast CSS styles copy</h1>
		</header>

		<!-- start -->
		<div class="container">
			<p class="paragraph">Paragraph 1</p>
			<p class="paragraph">Paragraph 2</p>
			<p class="paragraph">Paragraph 3</p>
			<p class="paragraph">Paragraph 4</p>
		</div>

		<div class="container_2">
			<div class="box">
				<div class="card">
					<p class="name">Suren</p>
					<a href="https://khechoyan.xyz/" class="portfolio_link">Portfolio</a>
				</div>
			</div>
		</div>
		<!-- end -->
	</body>
	</html>
```


### style.css

```shell
	.header {/* some styles */}
	.header_text {/* some styles */}

	/* start */
	
	/* end */
```

### style.css after copy class names in to css file

```shell
	.header {/* some styles */}
	.header_text {/* some styles */}

	/* start */
	.container {}
	.paragraph {}
	.container_2 {}
	.box {}
	.card {}
	.name {}
	.portfolio_link {}
	/* end */
```

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `khc.copyStyles`: Bind this key for auto past CSS styles in to CSS file.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release

---

**Enjoy!**
