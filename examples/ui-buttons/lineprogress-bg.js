import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            orientation: 'y',

            buttons: [
                createButton(this, 'AAA'),
                createButton(this, 'BBB'),
                createButton(this, 'CCC'),
            ],

            space: { item: 8 }

        })
            .on('button.out', function (button) {
                button.getElement('background').easeValueTo(0)
            })
            .on('button.over', function (button) {
                button.getElement('background').easeValueTo(1)
            })
            .layout()

    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 200,
        height: 40,
        background: scene.rexUI.add.lineProgress({
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            value: 0,
            easeValue: {
                duration: 160,
                ease: 'Quad'
            }
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
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