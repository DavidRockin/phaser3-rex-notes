import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.sizer({
            x: 400,
            y: 300,
            width: 750,
            height: 500,
            orientation: 'x'
        })
        for (var i = 0; i < 3; i++) {
            sizer.add(
                createList(this), // child
                1, // proportion
                'center', // align
                0, // paddingConfig
                true // expand
            )
        }
        sizer.layout();
        sizer.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var createList = function (scene) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'y'
    })
        .add(
            createTitle(scene),
            0
        )
        .add(
            createGrid(scene),
            1, // proportion
            'center', // align
            0, // paddingConfig
            true // expand
        );
    return sizer;
}

var createTitle = function (scene) {
    var word = GetRandomWord(2, 4);
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
        text: scene.add.text(0, 0, word, {
            fontSize: 20
        }),
        space: {
            left: 14,
            right: 14,
            top: 14,
            bottom: 14,
        }
    });
}

var createGrid = function (scene) {
    var sizer = scene.rexUI.add.gridSizer({
        column: 3,
        row: 3,
        columnProportions: 1,
        rowProportions: 1
    })
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            sizer.add(
                createItem(scene), // child
                i, // columnIndex
                j, // rowIndex
                'center', // align
                0, // paddingConfig
                true, // expand
            )
        }
    }

    return sizer;
}

var createItem = function (scene) {
    var text = GetRandomWord(2, 4);
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_MAIN),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        }
    });
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);