{
    let $ = jQuery;
    let createElem = function({tag_name = 'div',class_name,amount}) {
        let fragment = document.createDocumentFragment();
        for ( let i = 1; i <= amount; i++) {
            $(`<${tag_name} class=${class_name} />`).appendTo(fragment);
        }
        return elem_set = $(fragment).find(`.${class_name}`);
    };

    let hasClass = function(elem,class_name) {
        return $(elem).hasClass(class_name);
    };

    let randomNumBoth = (min,max) => {
        let range = max - min;
        let rand = Math.random();
        let result = min + Math.round(rand * range);
        return result;
    }

    let toArr = function($elem) {
        let arr = [];
        for ( let i = 0,l = $elem.length - 1; i <= l; i++) {
            arr.push($elem.eq(i));
        }
        return arr;
    };

    let Puzzle = function($elem,cols_total,rows_total,{spacing,background}) {
        var $pic = $('.puzzle__source',$elem[0]).hide();
        this.img_url = $pic.attr(`src`);
        this.pic_width = $pic.width();
        this.pic_height = $pic.height();
        this.chartlet_width = this.pic_width / cols_total;
        this.chartlet_height = this.pic_height / rows_total;
        this.chartlet_class_name = `puzzle__chartlet`;
        this.wrap_width = cols_total * this.chartlet_width;
        this.init = function() {
            let cols = 0,rows = 0;
            let chartlet_total = cols_total * rows_total;
            let chartlets = createElem({class_name:this.chartlet_class_name,amount:chartlet_total});
            [this.chartlets,this.chartlet_total] = [chartlets,chartlet_total];
            chartlets.css({cursor:`pointer`,display:`inline-block`,width:this.chartlet_width,height:this.chartlet_height,backgroundImage:`url(${this.img_url})`,verticalAlign:`top`,margin:spacing});
            $elem.eq(0).css({width:cols_total * (this.chartlet_width + spacing * 2),padding:spacing,background:background});
            chartlets.each((i,elem) => {
                if (cols > cols_total - 1) {
                    cols = 0;
                    rows++;
                }
                let po_x = this.chartlet_width * (-cols),
                    po_y = this.chartlet_height * (-rows);
                let position_value = `${po_x}px ${po_y}px`;
                $(elem).css('background-position',position_value);
                cols++;
            });
            chartlets.appendTo($elem[0]);
            $elem[0].ondragstart = (e) => {
                if (!hasClass(e.target,this.chartlet_class_name)) return;
                this.dragHandler[`dragstart`](e);
            };

            $elem[0].ondragover = (e) => {
                if(!hasClass(e.target,this.chartlet_class_name)) return;
                this.dragHandler[`dragover`](e);
            };

            $elem[0].ondrop = (e) => {
                if (!hasClass(e.target,this.chartlet_class_name)) return;
                this.dragHandler[`drop`](e);
            }
        };
        Puzzle.prototype.dragHandler = {
            dragstart(e) {
                let id = `draging`;
                e.target.id = id;
                e.dataTransfer.setData(`text`,id);
            },
            dragover(e) {
                e.preventDefault();
            },
            drop(e) {
                let id = e.dataTransfer.getData(`text`);
                let chartlet_draging = $(`#${id}`);
                chartlet_draging.attr(`id`,``);
                let chartlet_draging_next = chartlet_draging.next(`.puzzle__chartlet`);
                let chartlet_droping = $(e.target);
                let chartlet_droping_next = chartlet_droping.next(`.puzzle__chartlet`);
                let puzzle_wrap = chartlet_draging.parent();
                if (chartlet_droping_next.length !== 0) {
                    chartlet_droping_next.before(chartlet_draging);
                } else {
                    chartlet_draging.appendTo(puzzle_wrap);
                }
                if (chartlet_draging_next.length !== 0) {
                    chartlet_draging_next.before(chartlet_droping);
                } else {
                    chartlet_droping.appendTo(puzzle_wrap);
                }
            }
        }
    }

    Puzzle.prototype.sortImg = function() {
        this.chartlets.each((i,elem) => {
            let index = randomNumBoth(0,this.chartlets.length - 1);
            $(elem).before(this.chartlets.eq(index));
        });
    };

    Puzzle.prototype.isOrdered = function() {
        let chartlets = toArr(this.chartlets);
        let l = chartlets.length;
        let is_ordered = chartlets.every(function($elem,index,arr) {
            if (index === l - 1) return true;
            return arr[index].index() < arr[index + 1].index();
        });
        return is_ordered;
    };

    Puzzle.prototype.reset = function() {
        history.go(0);
    };

    $.extend({
        puzzle:Puzzle

    });
}
{
    let puzzle_obj = new $.puzzle($('.puzzle').eq(0),10,2,{spacing:2,background:`#fff`});
    puzzle_obj.init();
    $(btn).click(function() {
        puzzle_obj.sortImg();
    });

    $(btn2).click(function() {
        puzzle_obj.reset();
    });
}
