/*
 *  自动填充数据插件
 *
 *  author hjj
 *  date 2018-02-07
 */

(function (global, factory) {

    if (typeof define === "function" && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('jquery'));
    } else {
        global.AutoFill = factory(global.jQuery);
    }

})(this, function ($) {
    'use struct';

    if(!$) {
        throw new Error("请先加载jquery插件");
    }

    var AutoFill = function(options) {
        return new AutoFill.fn.init(options);
    };

    AutoFill.defaultDateFormater = function(value) {

        var date = new Date(value),
            year = date.getFullYear() > 9 ? date.getFullYear() : "0" + date.getFullYear(),
            month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1),
            date = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

        return year + "-" + month + "-" + date;
    };

    AutoFill.fn = AutoFill.prototype = {
        constructor: AutoFill,
        init: function(options) {
            console.info("欢迎使用自动填充数据插件!");

            var data = options.data;
            if(Object.prototype.toString.call(data) !== "[object Object]") {
                console.error("数据类型有误!")
                return;
            }

            var keys = Object.keys(data);
            for(var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                // id检索
                if($("#" + key).length > 0) {
                    AutoFill.fn.switchTagName.call($("#" + key),data[key]);
                }
                // class检索
                else if($("." + key).length > 0) {
                    AutoFill.fn.switchTagName.call($("." + key),data[key]);
                }
            }
            return this.constructor;
        },
        switchTagName: function(value) {

            // 空值的话不进行赋值
            if(value === null || value === undefined || value === "") {
                return;
            }
            if(this.hasClass('form-date')) {
                this.val(AutoFill.defaultDateFormater(value));
            }
            // 单选填充,下标对应
            else if(this.hasClass('auto-radio')) {
                this.find('input[type=radio]').each((index, item) => {
                    if(value == index) {
                        $(item).prop("checked", true);
                    }
                });
            }
            // 单选填充,值对应
            else if(this.hasClass('auto-radio-value')) {
                this.find('input[type=radio]').each((index, item) => {
                    if(value == $(item).val()) {
                        $(item).prop("checked", true);
                    }
                });
            }
            else if(this.hasClass('my-select')) {
                var text = this.find("li a[key=" + value+ "]").text();
                // 显示值放入val显示,真实值放入key中存起来
                this.find('input').val(text);
                this.find('input').prop("key", value);
            }
            else if(this.is("div") || this.is("span")) {
                this.text(value);
            }
            else {
                this.val(value);
            }
        }
    };

    AutoFill.prototype.constructor = AutoFill;

    return AutoFill;

});