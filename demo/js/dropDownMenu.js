'use strict';

;{
    (function () {
        var $ = jQuery;
        $.fn.extend({
            dropDown: function dropDown() {
                var $mainNav = $('.nav__itemWrap>li>:first-child', this);
                var $subNav = $('.nav__subNav', this);
                $mainNav.click(function () {
                    var $sub = $(this).siblings('.nav__subNav');
                    if ($sub.hasClass('jsCurrent')) {
                        $sub.removeClass('jsCurrent');
                        console.log(1);
                    } else {
                        $subNav.filter('.jsCurrent').removeClass('jsCurrent');
                        $sub.addClass('jsCurrent');
                    }
                });
            }
        });
    })();
}
