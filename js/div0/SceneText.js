var SceneText = (function () {
    function SceneText(text, position, headerFontSize, contentFontSize) {
        this.text = text;
        this.position = position;
        this.contentFontSize = contentFontSize;
        this.headerFontSize = headerFontSize;
    }
    SceneText.prototype.getText = function () {
        return this.text;
    };
    SceneText.prototype.getPosition = function () {
        return this.position;
    };
    SceneText.prototype.getContentFontSize = function () {
        return this.contentFontSize;
    };
    SceneText.prototype.getHeaderFontSize = function () {
        return this.headerFontSize;
    };
    return SceneText;
}());
//# sourceMappingURL=SceneText.js.map