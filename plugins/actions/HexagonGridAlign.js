import HexagonGrid from 'rexPlugins/utils/grid/hexagon/HexagonCore.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const NOOP = function () {};
const Zone = Phaser.GameObjects.Zone;

var tempZone = new Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
var tempHexagonGrid = new HexagonGrid();

/**
 * @typedef {object} GridAlignConfig
 *
 * @property {integer} [width=-1] - The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
 *                                  If both this value and height are set to -1 then this value overrides it and the `height` value is ignored.
 * @property {integer} [height=-1] - The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
 *                                   If both this value and `width` are set to -1 then `width` overrides it and this value is ignored.
 * @property {integer} [cellWidth=1] - The width of the cell, in pixels, in which the item is positioned.
 * @property {integer} [cellHeight=1] - The height of the cell, in pixels, in which the item is positioned.
 * @property {integer} [position=6] - The alignment position. One of the Phaser.Display.Align consts such as `TOP_LEFT` or `RIGHT_CENTER`.
 * @property {number} [x=0] - Optionally place the top-left of the final grid at this coordinate.
 * @property {number} [y=0] - Optionally place the top-left of the final grid at this coordinate.
 */

var GridAlign = function (items, options) {
    if (options === undefined) {
        options = {};
    }

    var width = GetFastValue(options, 'width', -1);
    var height = GetFastValue(options, 'height', -1);
    var cellWidth = GetFastValue(options, 'cellWidth', 1);
    var cellHeight = GetFastValue(options, 'cellHeight', cellWidth);
    var staggeraxis = GetFastValue(options, 'staggeraxis', 1);
    var staggerindex = GetFastValue(options, 'staggerindex', 1);
    var position = GetFastValue(options, 'position', Phaser.Display.Align.CENTER);
    var x = GetFastValue(options, 'x', 0);
    var y = GetFastValue(options, 'y', 0);

    tempHexagonGrid
        .setOriginPosition(x, y)
        .setCellSize(cellWidth, cellHeight)
        .setType(staggeraxis, staggerindex);

    tempZone.setSize(cellWidth, cellHeight);

    var lastRowIdx = height - 1,
        lastColIdx = width - 1,
        rowIdx = 0,
        colIdx = 0;

    for (var i = 0, cnt = items.length; i < cnt; i++) {
        tempZone.x = tempHexagonGrid.getWorldX(colIdx, rowIdx);
        tempZone.y = tempHexagonGrid.getWorldY(colIdx, rowIdx);
        AlignIn(items[i], tempZone, position);

        if (width === -1) {
            rowIdx++;
        } else if (height === -1) {
            colIdx++;
        } else {
            if (colIdx === lastColIdx) {
                if (rowIdx === lastRowIdx) {
                    break;
                } else {
                    colIdx = 0;
                    rowIdx++;
                }
            } else {
                colIdx++;
            }
        }
    }

    return items;
};


export default GridAlign;