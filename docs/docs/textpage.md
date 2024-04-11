## Introduction

Display text page by page on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text object](tagtext.md).

- Author: Rex
- Behavior of text object

## Live demos

- [BBCode text + page + typing](https://codepen.io/rexrainbow/pen/yjZveb)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textpage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextextpageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextpageplugin.min.js', true);
    ```
- Add page behavior
    ```javascript
    var page = scene.plugins.get('rextextpageplugin').add(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextPagePlugin from 'phaser3-rex-plugins/plugins/textpage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextPage',
                plugin: TextPagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add page behavior
    ```javascript
    var page = scene.plugins.get('rexTextPage').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TextPage from 'phaser3-rex-plugins/plugins/textpage.js';
    ```
- Add page behavior
    ```javascript
    var page = new TextPage(textGameObject, config);
    ```

### Create instance

```javascript
var page = scene.plugins.get('rexTextPage').add(textGameObject, {
    // text: '',              // content in string or array
    // maxLines: undefined,
    // pageBreak: '\f\n',
});
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [bitmap text object](bitmaptext.md)
- `text` : content in string or array, optional
- `maxLines` : Max lines of a page.
    - `undefined` : Default value. For [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md)
        - Use style property `maxLines`.
        - Count number of lines if it has `fixedHeight` setting.
    - A number : Max lines of a page, for [bitmap text object](bitmaptext.md)
- `pageBreak` : Symbol of page-break. Default value is `'\f\n'`. String after this page-break symbol will be placed to a new page. 

### Set content

- Set content
    ```javascript
    page.setText(content);
    ```
    - `content` : String, number, or string array. Can insert `pageBreak` symbol.
- Append content
    ```javascript
    page.appendText(content);
    ```
    - `content` : String, number, or string array. Can insert `pageBreak` symbol.
- Clear content
    ```javascript
    page.clearText()
    ```
- Append page
    ```javascript
    page.appendPage(content);   // content in string or array
    ```
    - `content` : String, number, or string array. **Don't** insert `pageBreak` symbol.

### Show page

- Display current page
    ```javascript
    page.showPage();
    ```
- Display next page
    ```javascript
    page.showNextPage();
    ```
- Display previous page
    ```javascript
    page.showPreviousPage();
    ```
- Display first page
    ```javascript
    page.showFirstPage();
    ```
- Display last page
    ```javascript
    page.showLastPage();
    ```
- Display page by index
    ```javascript
    page.showPage(index);
    ```
- Display page by line index
    ```javascript
    page.showPageNyLineIndex(index);
    ``` 

!!! note
    Initial page index is `-1`, so user could call `page.showNextPage()` to display first page.

### Get lines of page

#### Page by page

- Get lines of current page
    ```javascript
    var lines = page.getPage();
    ```
- Get lines of next page
    ```javascript
    var lines = page.getNextPage();
    ```
- Get lines of previous page
    ```javascript
    var lines = page.getPreviousPage();
    ```
- Get lines of first page
    ```javascript
    var lines = page.getFirstPage();
    ```
- Get lines of last page
    ```javascript
    var lines = page.getLastPage();
    ```
- Get lines of page by page index
    ```javascript
    var lines = page.getPage(index);
    ```

#### Page of line

- Get line of page by line index
    ```javascript
    var lines = page.getPageByLineIndex(index);
    ```
- Get page of next line
    ```javascript
    var lines = page.getPageOfNextLine(index);
    ```
- Get page of previous line
    ```javascript
    var lines = page.getPageOfPreviousLine(index);
    ```

### Other properties

### Page by page

- Is last page
    ```javascript
    var isLastPage = page.isLastPage;
    ```
- Is first page
    ```javascript
    var isFirstPage = page.isFirstPage;
    ```
- Current page index
    ```javascript
    var pageIndex = page.pageIndex;
    ```
- Number of pages
    ```javascript
    var pageIndex = page.pageCount;
    ```

#### Page of line

- Is last line
    ```javascript
    var isLastLine = page.isLastLine;
    ```
- Is first line
    ```javascript
    var isFirstLine = page.isFirstLine;
    ```
- Start line index
    ```javascript
    var startLineIndex = page.startLineIndex;
    ```
- End line index
    ```javascript
    var endLineIndex = page.endLineIndex;
    ```
- Number of lines
    ```javascript
    var totalLinesCount = page.totalLinesCount;
    ```
