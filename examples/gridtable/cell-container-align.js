import phaser from 'phaser/src/phaser.js';
import GridTablePlugin from '../../plugins/gridtable-plugin.js';

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
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellsCount: 100,
            columns: 1,
            cellVisibleCallback: function (cell) {
                var scene = cell.scene;
                var bg = scene.add.rectangle(0, 0, 200, cell.height, COLOR_MAIN)
                    .setStrokeStyle(2, COLOR_LIGHT);

                cell.setContainer(bg);
                cell.setCellContainerAlign((cell.index % 2) ? 'right' : 'left');
                //console.log('Cell ' + cell.index + ' visible');
            },
            // reuseCellContainer: true,
            mask: {
                padding: 2,
            },
            // enableLayer: true,
        });

        // draw bound
        this.add.graphics()
            .lineStyle(2, 0xff0000)
            .strokeRectShape(table.getBounds())
            .setDepth(1);

        // drag table content
        table
            .setInteractive()
            .on('pointermove', function (pointer) {
                if (!pointer.isDown) {
                    return;
                }
                var dx = pointer.x - pointer.prevPosition.x;
                var dy = pointer.y - pointer.prevPosition.y;
                table.addTableOXY(dx, dy).updateTable();
            });

        this.add.text(0, 580, 'Destroy table')
            .setInteractive()
            .on('pointerdown', function () {
                table.destroy();
            })
    }

    update() {
    }
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
        global: [{
            key: 'rexGridTable',
            plugin: GridTablePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);