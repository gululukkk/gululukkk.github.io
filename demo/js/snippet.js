'use strict';

;{
    var pic_width = 1130;
    var chartlet_width = 113;
    var chartlet_height = 250;
    var cols = 0;
    var rows = 0;
    var cols_total = 10;
    chartlets.each(function (index, elem) {
        if (cols > cols_total - 1) {
            cols = 0;
            rows++;
        };

        var toPercent = function toPercent(para) {
            return Number(para) * 100 + '%';
        };

        var po_x = this.chartlet_width * -cols;
        var po_y = this.chartlet_height * -rows;
        var position_value = String(po_x) + 'px ' + String(po_y) + 'px';
        $(elem).css('background-position', position_value);
        cols++;
    });
}