import InputFiledBase from './InputFieldBase.js';
import CreateColorInput from '../../../utils/build/CreateColorInput.js';

class ColorInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ColorInput';

        var colorInputConfig = config.colorInput;
        var colorInput = CreateColorInput(scene, colorInputConfig);

        this.add(
            colorInput,
            { proportion: 1, expand: true, key: 'colorInput' }
        )

        colorInput.on('valuechange', function (value) {
            this.setValue(value);
        }, this);

        this.setDisplayValueCallback(function (gameObject, value) {
            colorInput.setValue(value);
        })
    }
}

export default ColorInput;