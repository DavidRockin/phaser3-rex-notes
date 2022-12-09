const PageFadeOutCompleteEvent = 'page.fadeout';

var FadeOutPage = function () {
    if (!this.fadeOutPageCallback || !this.children) {
        this.emit(PageFadeOutCompleteEvent);
        return this;
    }

    var waitObject = this.fadeOutPageCallback(this.children, this.fadeOutPageDuration);
    if (!waitObject) {
        this.emit(PageFadeOutCompleteEvent);
    } else if (waitObject.once) {
        waitObject.once('complete', function () {
            this.emit(PageFadeOutCompleteEvent);
        }, this);
    } else if (waitObject.then) {
        var self = this;
        waitObject.then(function () {
            self.emit(PageFadeOutCompleteEvent);
        })
    } else {
        this.emit(PageFadeOutCompleteEvent);
    }

    return this;
}

export default FadeOutPage;