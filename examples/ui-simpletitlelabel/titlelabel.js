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

    preload() {
        this.load.image('pause', 'assets/images/pause.png');
        this.load.image('play', 'assets/images/play.png');
    }

    create() {
        var style = {
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 },
            background: {
                color: COLOR_MAIN,
                strokeColor: COLOR_LIGHT,
                radius: 10,
            },
            title: {
                fontSize: 24,
            },
            separator: {
                color: COLOR_DARK,
                height: 2,
            },
            text: {
                fontSize: 20,
            }
        }

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 200,
            orientation: 'y',
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 },
        })
            .addBackground(
                this.rexUI.add.roundRectangle({
                    color: COLOR_DARK,
                    strokeColor: COLOR_LIGHT,
                    radius: 20,
                })
            )
            .add(
                this.rexUI.add.simpleTitleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        title: 'AAA',
                        text: 'aaa'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleTitleLabel(style)
                    .resetDisplayContent({
                        icon: 'pause',
                        title: 'BBB',
                        text: 'bbb'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleTitleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        title: 'CCC',
                        text: 'ccc'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleTitleLabel(style)
                    .resetDisplayContent({
                        icon: 'pause',
                        title: 'DDD',
                        text: 'ddd'
                    }),

                { expand: true }
            )
            .layout()


    }

    update() { }
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