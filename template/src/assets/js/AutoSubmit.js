/*
 *  自动提交数据
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
        global.AutoSubmit = factory(global.jQuery);
    }
})(this, function ($) {
    'use struct';

    if (!$) {
        throw new Error("请先加载jquery插件");
    }

    var AutoSubmit = function (options) {
        return new AutoSubmit.fn.init(options);
    };

    AutoSubmit.fn = AutoSubmit.prototype = {
        constructor: AutoSubmit,
        init: function(options) {
            console.info("欢迎使用自动提交数据插件!");

            var _this = this;
            var settings = _this.$settings = $.extend({}, AutoSubmit.fn.defaults, options);

            _this.$submitObj = {};
            _this.$element = $(settings.el);

            if(_this.$element.length > 0) {
                _this.$element.map(function() {
                    var value = AutoSubmit.fn.resolveValue.call($(this));
                    // _this.$submitObj["obj." + this.id] = value;
                    _this.$submitObj[this.id] = value;
                });
            }

            if(Object.keys(_this.$submitObj).length > 0) {
                $.ajax({
                    url: settings.url,
                    type: settings.type,
                    data: $.extend({}, _this.$submitObj, {extraParam: settings.extraParam}),
                    success: settings.onSuccess,
                    error: settings.onError,
                    beforeSend: function() {
                        $(".vali-tip").removeClass('vali-tip has-error');
                        $(".vali-tip-text").remove();
                    }
                });
            }
        },
        resolveValue: function() {
            if(this.hasClass('my-select')) {
                return this.find('input').prop("key");
            }
            // radio 单选提交,返回选中的下标
            else if(this.hasClass('auto-radio')) {
                var value;
                this.find('input[type=radio]').each((index, item) => {
                    if($(item).prop("checked") === true) {
                        value = index;
                        return false;
                    }
                });
                return value;
            }
            // radio 单选提交, 返回选中的value
            else if(this.hasClass('auto-radio-value')) {
                var value;
                this.find('input[type=radio]').each((index, item) => {
                    if($(item).prop("checked") === true) {
                        value = $(item).val();
                        return false;
                    }
                });
                return value;
            }
            else if(this.is("div") || this.is("span")) {
                return this.text();
            }
            else {
                return this.val();
            }
        }
    };

    AutoSubmit.fn.defaults = {
        el: ".submit",// 要提交的元素
        extraParam: {},
        url: "",
        type: "GET",
        onSuccess: function() {
            console.log('提交成功');
        },
        onError: function() {
            console.log("提交失败");
        }
    };

    return AutoSubmit;
});