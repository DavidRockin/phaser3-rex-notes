import { SimpleTextBox } from '../../../ui/ui-components.js';
import { TransitionImagePack } from '../../../ui/ui-components.js';
import { AIO as AIOSpinner } from '../../../spinner/spinner-components.js';
import DecorateGameObject from '../../../ui/utils/build/DecorateGameObject.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import AddEvent from '../../../../plugins/utils/gameobject/addevent/AddEvent.js';
import KeyMap from '../../../../plugins/utils/input/KeyMap.js';
import { AddShakeBehavior } from '../utils/Shake.js';


var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {},
    creators
) {

    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (
        scene,
        {
            vpw, vph,
            width = 0, height = 0,
            vpx = 0.5, vpy = 1,

            frameDelimiter = defaultFrameDelimiter,

            clickTarget, clickShortcutKeys,

            commandExecutor, eventSheetManager, eventsheet,
        } = {},
    ) {

        if (vpw !== undefined) {
            width = viewport.width * vpw;
        }

        if (vph !== undefined) {
            height = viewport.height * vph;
        }

        if (width > 0) {
            SetValue(style, 'expandTextWidth', true);
        }
        if (height > 0) {
            SetValue(style, 'expandTextHeight', true);
        }

        if (creators === undefined) {
            creators = {};
        }

        if (!creators.hasOwnProperty('icon')) {
            creators.icon = function (scene, config) {
                var gameObject = new TransitionImagePack(scene, config);
                DecorateGameObject(gameObject, config);
                gameObject.setOrigin(0.5, 1);

                scene.add.existing(gameObject);
                return gameObject;
            }
        }

        var useDefaultWaitIcon = false;
        if (!creators.hasOwnProperty('action')) {
            creators.action = function (scene, config) {
                if (config === undefined) {
                    config = {};
                }
                var gameObject = new AIOSpinner(scene, config);
                DecorateGameObject(gameObject, config);

                scene.add.existing(gameObject);
                return gameObject;
            }

            useDefaultWaitIcon = true;
        }

        var gameObject = new SimpleTextBox(scene, style, creators);

        gameObject
            .setMinSize(width, height)
            .setOrigin(0.5, 1)  // Align to bottom
            .layout();

        scene.add.existing(gameObject);

        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        gameObject.frameDelimiter = frameDelimiter;

        /*
        Fire textbox's 'click' event when
        - Pointer-down on clickTarget (screen or this textbox) 
        - Press keyboard's key
        
        !!! note
            Since 'click' event might fire during typing, don't use *wait pointerdown|keydown*
        */

        gameObject.emitClick = function () {
            gameObject.emit('click');
        }

        var touchEE;
        if (clickTarget === undefined) {
            clickTarget = eventSheetManager.getData('$clickTarget');
        }
        if (clickTarget === null) {
            // No click target
        } else if (clickTarget.toLowerCase() === 'screen') {
            touchEE = scene.input;
        } else {
            touchEE = gameObject.setInteractive();
        }

        if (touchEE) {
            AddEvent(
                gameObject,              // target
                touchEE, 'pointerdown',  // eventEmitter, eventName
                gameObject.emitClick     // callback
            );
        }

        AddEvent(
            gameObject,                       // target
            scene.input.keyboard, 'keydown',  // eventEmitter, eventName
            function (event) {                // callback
                if (clickShortcutKeys === undefined) {
                    clickShortcutKeys = eventSheetManager.getData('$clickShortcutKeys');
                }
                if (!clickShortcutKeys) {
                    return;
                }

                var keys = clickShortcutKeys.split('|');
                var inputKey = KeyMap[event.keyCode]
                if (keys.indexOf(inputKey) !== -1) {
                    gameObject.emitClick();
                }
            }
        );

        // On click
        var onClick = function () {
            if (gameObject.isTyping) {
                // Wait clicking for typing next page, 
                // or emitting 'complete2' event
                gameObject
                    .once('click', onClick)
                    .stop(true);

            } else if (!gameObject.isLastPage) {
                // !gameObject.isLastPage && !gameObject.isTyping
                // Typing next page, interrupted by click event
                gameObject
                    .once('click', onClick)
                    .typeNextPage();

            } else {
                gameObject.emit('complete2');

            }
        }

        // on 'pageend', wait click
        var onPause = function () {
            if (useDefaultWaitIcon) {
                waitIcon.start();
                gameObject.setChildVisible(waitIcon, true);
            }

            eventSheetManager.emit('pause.input');

            if (gameObject.autoTyping) {
            }

            gameObject.once('click', onResume);
        }

        // on 'pageend', on 'click'
        var onResume = function () {
            gameObject.off('click', onResume);

            if (useDefaultWaitIcon) {
                waitIcon.stop();
                gameObject.setChildVisible(waitIcon, false);
            }

            if (gameObject.autoTyping) {

            }

            eventSheetManager.emit('resume.input');
        }

        var waitIcon;
        if (useDefaultWaitIcon) {
            waitIcon = gameObject.getElement('action');
            gameObject.setChildVisible(waitIcon, false);
        }

        gameObject
            .on('pageend', onPause)
            .on('start', function () {
                // Remove pending callback, add new one
                gameObject
                    .off('click', onClick)
                    .once('click', onClick)
            });

        AddShakeBehavior(gameObject);

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;