"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
    (function () {
        var setStyle = function setStyle(elem, style_map) {
            var style_text = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = style_map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    style_text += key + ":" + value + ";";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            elem.style.cssText += style_text;
        };

        var getRect = function getRect(elem) {
            return elem.getBoundingClientRect();
        };

        var Zoom = function Zoom(_ref) {
            var _this = this;

            var zoom_wrap = _ref.zoom_wrap,
                scale = _ref.scale; //这是写的不好，区分不出可选和必选

            var _ref2 = [zoom_wrap, scale];
            this.zoom_wrap = _ref2[0];
            this.scale = _ref2[1];

            this.big_picture = this.zoom_wrap.querySelector(".enlarge__bigPic");
            this.small_picture = this.zoom_wrap.querySelector(".enlarge__smallPic");
            this.big_wrap = this.zoom_wrap.querySelector(".enlarge__bigWrap");
            this.small_wrap = this.zoom_wrap.querySelector(".enlarge__smallWrap");
            this.layer = this.small_wrap.appendChild(this.getLayer());

            this.init();
            {
                (function () {
                    var max_top = _this.small_picture.clientHeight - 50;
                    var max_left = _this.small_picture.clientWidth - 50;
                    _this.big_picture.style.cssText += "position:absolute;";
                    _this.small_wrap.onmouseenter = function (e) {
                        show(_this.layer);
                        show(_this.big_wrap);
                    };
                    _this.small_wrap.onmousemove = function (e) {
                        var top = e.clientY - getRect(_this.small_wrap).top - 25,
                            left = e.clientX - getRect(_this.small_wrap).left - 25;
                        if (top < 0) top = 0;
                        if (top > max_top) top = max_top;
                        if (left < 0) left = 0;
                        if (left > max_left) left = max_left;
                        _this.layer.style.cssText += "top:" + top + "px;left:" + left + "px;";

                        _this.big_wrap.style.cssText += "top:" + e.clientY + "px;left:" + (e.clientX + 50) + "px;";
                        _this.big_picture.style.cssText += "top:" + -top * _this.scale + "px;left:" + -left * _this.scale + "px;";
                    };
                    _this.small_wrap.onmouseleave = function (e) {
                        hide(_this.layer);
                        hide(_this.big_wrap);
                    };
                })();
            }
        };

        Zoom.prototype.setBigPicSize = function () {
            var small_picture_width = this.small_picture.width;
            var small_picture_height = this.small_picture.height;
            this.big_picture.style.width = small_picture_width * this.scale + "px";
            this.big_picture.style.height = small_picture_height * this.scale + "px";
        };

        Zoom.prototype.initLayer = function () {
            var layer = this.getLayer();
            this.small_wrap.appendChild(layer);
            var style_map = new Map([["box-sizing", "border-box"], ["position", "absolute"], ["display", "none"], ["width", "50px"], ["height", "50px"], ["border", "3px solid red"], ["border-radius", "5px"], ["background-color", "rgba(255,255,255,0.7)"]]);
            setStyle(layer, style_map);
        };

        Zoom.prototype.setBigWrapStyle = function (scale) {
            this.big_wrap.style.cssText += "display:none;overflow:hidden;width:" + 50 * scale + "px;height:" + 50 * scale + "px;";
        };

        Zoom.prototype.init = function () {
            this.setBigPicSize();
            this.initLayer();
            this.setBigWrapStyle(this.scale);
        };

        var hide = function hide(elem) {
            elem.style.display = "none";
        };

        var show = function show(elem) {
            elem.style.display = "block";
        };

        Zoom.prototype.getLayer = function () {
            var div = void 0;
            return function (top, left) {
                if (!div) div = document.createElement("div");
                return div;
            };
        }();
        window.H = {};
        window.H.Zoom = Zoom;
    })();
}