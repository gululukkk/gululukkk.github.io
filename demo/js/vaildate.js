"use strict";

var $radio = $(":radio");
var $username_input = $("#username");
var rules = {
    isOnlyNumber: function isOnlyNumber(value) {
        return !/[^0-9]/.test(value);
    },
    isNoSpace: function isNoSpace(value) {
        return !/\s/.test(value);
    },
    isNoChineseChar: function isNoChineseChar(value) {
        return !/[^\s\w]/.test(value);
    }
};

var reg_set = {
    noNumber: /[^0-9]/,
    noChinese_char: /[^\w\s]/,
    noSpace: /[^\s]/
};

var $hint = $(".hint");
var setHintText = function setHintText(text) {
    $hint.text(text);
};
var clearInputText = function clearInputText($elem) {
    $elem.val("");
};
var $max_length_radio = $(":radio[data-rule='setMaxLength']");
$max_length_radio.focus(function () {
    clearInputText($username_input);
    setHintText($(this).parent().text());
    var max_length = 15;
    $username_input.attr("maxlength", max_length);
    $username_input[0].onkeyup = function () {
        var user_input_length = $(this).val().length;
        var minus = max_length - user_input_length;
        setHintText("\u8FD8\u53EF\u4EE5\u8F93\u5165" + minus + "\u4E2A\u5B57\u7B26");
    };
});

$radio.not($max_length_radio).focus(function () {
    clearInputText($username_input);
    setHintText($(this).parent().text());
    $username_input.attr("maxlength", "");
    var rule = this.dataset.rule;
    var reg = void 0;
    if (this.id === "onlyNum") reg = reg_set.noNumber;
    if (this.id === "noChineseChar") reg = reg_set.noChinese_char;
    $username_input[0].onkeyup = function () {
        var user_input = $(this).val();
        var len = user_input.length;
        var end_index = user_input.search(reg);
        if (!rules[rule](user_input)) {
            reg.test(user_input);
            var index = reg.lastIndex;
            var replace_text = user_input.slice(0, end_index);
            $(this).val(replace_text);
        }
    };
});

var preventBehavior = function preventBehavior(elem, behavior) {
    elem["on" + behavior] = function (e) {
        e.preventDefault();
    };
};

var reg = /copy|cut|paste|contextmenu/g;
var $checkbox = $(":checkbox");
$username_input.focus(function () {
    var $checked = $checkbox.filter(":checked").not("#all_checked");
    var behaviors = [];
    $checked.each(function (i, elem) {
        var behavior = elem.id.match(reg);
        behaviors = behaviors.concat(behavior);
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = behaviors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            preventBehavior($username_input[0], i);
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
});

var toggleChecked = function toggleChecked(index, elem) {
    if ($(elem).prop("checked")) {
        $(elem).prop("checked", false);
    } else {
        $(elem).prop("checked", true);
    }
};
$("#all_checked").click(function () {
    if ($(this).prop("checked")) {
        $checkbox.prop("checked", true);
    } else {
        $checkbox.prop("checked", false);
    }
});


var system = {};
var platform = navigator.platform;
system.win = (platform.indexOf('Win') == 0);
if (!system.win) {
    $checkbox.parent().hide();
};
