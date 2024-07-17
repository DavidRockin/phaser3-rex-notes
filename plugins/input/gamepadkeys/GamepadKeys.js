import CursorKeys from '../../utils/input/CursorKeys.js';
import BindGamepadMethods from './methods/BindGamepadMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const KeyNames = ['A', 'Y', 'X', 'B', 'L1', 'L2', 'R1', 'R2'];

class GamepadKeys extends CursorKeys {
    constructor(scene, config) {
        super(scene);
        // this.scene = scene;

        if (!this.gamepadManager) {
            console.warn(`Gamepad feature is not activated`);
        }

        this.addKeys(KeyNames);
        this._gamepad = null;
        this.waitBinding = false;
        this.setAutoBinding(GetValue(config, 'autoBinding', true));

        this.boot();
    }

    boot() {
        var gamepadManager = this.gamepadManager;
        if (gamepadManager) {
            gamepadManager.on('down', this.onUpdateKeysState, this);
            gamepadManager.on('up', this.onUpdateKeysState, this);
            gamepadManager.on('disconnected', this.onDisconnect, this);

            if (this.autoBinding) {
                this.bindGamepad();
            }
        }
    }

    shutdown(fromScene) {
        var gamepadManager = this.gamepadManager;
        if (gamepadManager) {
            gamepadManager.off('down', this.onUpdateKeysState, this);
            gamepadManager.off('up', this.onUpdateKeysState, this);
            gamepadManager.off('disconnected', this.onDisconnect, this);
        }

        super.shutdown(fromScene);
    }

    onUpdateKeysState(gamepad) {
        if (!this.isMyPad(gamepad)) {
            return;
        }

        for (var keyName in this.keys) {
            this.setKeyState(keyName, gamepad[keyName]);
        }
    }

    onDisconnect(gamepad, event) {
        if (!this.isMyPad(gamepad)) {
            return;
        }

        this.setGamepad(null);

        if (this.autoBinding) {
            this.bindGamepad();
        }
    }

    setAutoBinding(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.autoBinding = enable;
        return this;
    }

    isMyPad(gamepad) {
        return this.isConnected && (this.gamepad === gamepad);
    }

    get gamepadManager() {
        return this.scene.input.gamepad;
    }

    get gamepad() {
        return this._gamepad;
    }

    set gamepad(value) {
        this._gamepad = value;

        if (value) {
            this.onUpdateKeysState(value);

        } else {
            this.clearAllKeysState();

            if (this.autoBinding) {
                this.bindGamepad();
            }
        }
    }

    get isConnected() {
        return !!this.gamepad;
    }

    get AKeyDown() {
        return this.keys.A.isDown;
    }

    get YKeyDown() {
        return this.keys.Y.isDown;
    }

    get XKeyDown() {
        return this.keys.X.isDown;
    }

    get BKeyDown() {
        return this.keys.B.isDown;
    }

    get L1KeyDown() {
        return this.keys.L1.isDown;
    }

    get L2KeyDown() {
        return this.keys.L2.isDown;
    }

    get R1KeyDown() {
        return this.keys.R1.isDown;
    }

    get R2KeyDown() {
        return this.keys.R2.isDown;
    }

}

Object.assign(
    GamepadKeys.prototype,
    BindGamepadMethods
)

export default GamepadKeys;