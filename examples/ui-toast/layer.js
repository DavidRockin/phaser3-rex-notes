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
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var bgLayer = this.add.layer();
        var uiLayer = this.add.layer();

        var toast = CreateToast(this)
            .setPosition(400, 300)
            .addToLayer(uiLayer);

        var bg = this.add.image(400, 300, 'classroom');
        bgLayer.add(bg);


        toast
            .showMessage('Hello world')
            .showMessage('Phaser 3 is good')
            .showMessage('See you next time')
    }

    update() { }
}

var CreateToast = function (scene) {
    return scene.rexUI.add.toast({
        x: 400,
        y: 300,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN),
        text: scene.add.text(0, 0, '', {
            fontSize: '24px'
        }),
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },

        duration: {
            in: 250,
            hold: 1000,
            out: 250,
        },
    })
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