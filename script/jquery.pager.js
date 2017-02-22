(function ($) {
    var Defaults = function () {
        this.autoShow = true;
        this.sign = "ao";
        this.tag = "a";
        this.url = "javascript: void(0);";
        this.search = "";
        this.showSpace = false;
        this.spaceTag = "span";
        this.spaceClass = "space";
        this.spaceCharacter = " | ";
        this.showPageNumber = 5;
        this.pageNumber = 1;
        this.pageSize = 0;
        this.totalPage = 1;
        this.totalNumber = 0;
        this.showFirst = true;
        this.firstClass = "page_first";
        this.firstText = "<<";
        this.showPrevious = true;
        this.previousClass = "page_previous";
        this.previousText = "<";
        this.showPage = true;
        this.pageClass = "page_item";
        this.pageText = "-y-";
        this.currentPageClass = "page_current";
        this.redirectCurrent = false;
        this.showTotal = false;
        this.totalClass = "page_total";
        this.totalText = "-y-/-Y-";
        this.showTurnto = false;
        this.turntoClass = "page_turnto";
        this.turntoText = "GO";
        this.turntoInputClass = "page_turntoinput";
        this.turntoButtonClass = "page_turntobt";
        this.turntoButtonText = "OK";
        this.showNext = true;
        this.nextClass = "page_next";
        this.nextText = ">";
        this.showLast = true;
        this.lastClass = "page_last";
        this.lastText = ">>";
        this.redirect = true;
        this.callbackPara = {};
        this.callback = function (page, obj) { };
    };
    var nourl = "javascript: void(0);";
    $.fn.pager = function (_options) {
        var options = new Defaults();
        options = $.extend(options, _options);
        if (options.totalPage <= 1 && !options.autoShow) return this;
        return this.each(function () {
            makePager($(this), options);
        });
    };
    $.Pager = function (selector, _options) {
        var options = new Defaults();
        options = $.extend(options, _options);
        selector = $(selector);
        if (options.totalPage <= 1 && !options.autoShow) return selector;
        return selector.each(function () {
            makePager($(this), options);
        });
    };
    $.fn.pager.prototype = $.Pager.prototype = {};  
    var isEmptyObject = function( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    };
    var makeText_fromNumber = function (n) {
        return "";
    };
    var makePageText = function (n, options) {
        if (options.pageText.indexOf("-y-") > -1)
            return options.pageText.replace(/-y-/g, n.toString());
        else if (options.pageText.indexOf("-Y-") > -1) {
            return options.pageText.replace(/-Y-/g, makeText_fromNumber(n));
        }
        else return options.pageText;
    };
    var makeJson = function (page, options) {
        return { pagenum: parseInt(page), pagesize: parseInt(options.pageSize), totalnum: parseInt(options.totalNumber), totalpage: parseInt(options.totalPage) };
    };
    var makeUrl = function (options, n) {
        if(options.url == nourl) return nourl;
        else return options.url.replace(/-y-/g, n.toString());
    };
    var makeSearch = function(options){
        var url = options.url;
        url += (url.indexOf("?") > 0 ? "&" : "?");
        if(typeof options.search == "object" && !isEmptyObject(options.search))
            for(var name in options.search) url += name + "=" + options.search[name] + "&";
        else if(typeof options.search == "string" && options.search != ""){
            if(options.search[0] == "?" || options.search[0] == "&") 
                url += options.search.substr(1) + "&";
        }
        return url.length > 0 ? url.substr(0, url.length - 1) : url;
    };
    var makeOnClick = function (i, selector, options) {
        if (i < 1 || i > options.totalPage || (i == options.pageNumber && !options.redirectCurrent)) {
            if (!options.redirect) { selector.on("click", function () { return false; }); }
        }
        else {
            if (!options.redirect) {
                selector.on("click", function (e) {
                    if (typeof (options.callback) == "function")
                        options.callback(makeJson($(this).attr("page"), options), options.callbackPara);
                    e.preventDefault();
                });
            }
            else {
                selector.on("click", function () {
                    if (typeof (options.callback) == "function")
                        options.callback(makeJson($(this).attr("page"), options), options.callbackPara);
                });
            }
        }
        return selector;
    };
    var makeSpace = function (options) {
        return $("<" + options.spaceTag + "></" + options.spaceTag + ">").addClass(options.spaceClass).text(options.spaceCharacter);
    };
    var makePager = function (selector, options) {
        var sign = "pager_" + options.sign;
        options.spaceClass = sign + "_" + options.spaceClass;
        options.firstClass = sign + "_" + options.firstClass;
        options.previousClass = sign + "_" + options.previousClass;
        options.pageClass = sign + "_" + options.pageClass;
        options.currentPageClass = sign + "_" + options.currentPageClass;
        options.totalClass = sign + "_" + options.totalClass;
        options.turntoClass = sign + "_" + options.turntoClass;
        options.turntoInputClass = sign + "_" + options.turntoInputClass;
        options.turntoButtonClass = sign + "_" + options.turntoButtonClass;
        options.nextClass = sign + "_" + options.nextClass;
        options.lastClass = sign + "_" + options.lastClass;
        options.url = makeSearch(options);
        selector.empty();
        var p, n;
        if (options.showFirst) {
            n = 1;
            p = $("<" + options.tag + "></" + options.tag + ">");
            p.text(options.firstText).attr("page", n).addClass(sign).addClass(options.firstClass);
            if (options.pageNumber > 1) p.attr("href", makeUrl(options, 1));
            else if (options.pageNumber == 1 && options.redirectCurrent) p.attr("href", makeUrl(options, 1));
            else p.attr("href", nourl);
            makeOnClick(n, p, options);
            selector.append(p);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showPrevious) {
            n = options.pageNumber - 1;
            p = $("<" + options.tag + "></" + options.tag + ">");
            p.text(options.previousText).attr("page", n).addClass(sign).addClass(options.previousClass);
            if (n > 0) p.attr("href", makeUrl(options, n));
            else p.attr("href", nourl);
            makeOnClick(n, p, options);
            selector.append(p);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showPage) {
            if (options.totalPage <= options.showPageNumber) {
                for (var i = 1; i <= options.totalPage; i++) {
                    n = i;
                    p = $("<" + options.tag + "></" + options.tag + ">");
                    p.text(makePageText(i, options)).attr("page", n).addClass(sign).addClass(options.pageClass);
                    if (n == options.pageNumber) {
                        p.addClass(options.currentPageClass);
                        if (options.redirectCurrent) p.attr("href", makeUrl(options, n));
                        else p.attr("href", nourl);
                    }
                    else p.attr("href", makeUrl(options, n));
                    makeOnClick(n, p, options);
                    selector.append(p);
                    if (options.showSpace) selector.append(makeSpace(options));
                }
            }
            else {
                if (options.pageNumber < Math.ceil(options.showPageNumber / 2) + 1) {
                    for (var i = 1; i <= options.showPageNumber; i++) {
                        n = i;
                        p = $("<" + options.tag + "></" + options.tag + ">");
                        p.text(makePageText(i, options)).attr("page", n).addClass(sign).addClass(options.pageClass);
                        if (n == options.pageNumber) {
                            p.addClass(options.currentPageClass);
                            if (options.redirectCurrent) p.attr("href", makeUrl(options, n));
                            else p.attr("href", nourl);
                        }
                        else p.attr("href", makeUrl(options, n));
                        makeOnClick(n, p, options);
                        selector.append(p);
                        if (options.showSpace) selector.append(makeSpace(options));
                    }
                }
                else if (options.pageNumber > options.totalPage - Math.ceil(options.showPageNumber / 2)) {
                    for (var i = 1; i <= options.showPageNumber; i++) {
                        n = options.totalPage - options.showPageNumber + i;
                        p = $("<" + options.tag + "></" + options.tag + ">");
                        p.text(makePageText(n, options)).attr("page", n).addClass(sign).addClass(options.pageClass);
                        if (n == options.pageNumber) {
                            p.addClass(options.currentPageClass);
                            if (options.redirectCurrent) p.attr("href", makeUrl(options, n));
                            else p.attr("href", nourl);
                        }
                        else p.attr("href", makeUrl(options, n));
                        makeOnClick(n, p, options);
                        selector.append(p);
                        if (options.showSpace) selector.append(makeSpace(options));
                    }
                }
                else {
                    for (var i = 1; i <= options.showPageNumber; i++) {
                        n = options.pageNumber - Math.ceil((options.showPageNumber - 1) / 2) + i - 1;
                        p = $("<" + options.tag + "></" + options.tag + ">");
                        p.text(makePageText(n, options)).attr("page", n).addClass(sign).addClass(options.pageClass);
                        if (n == options.pageNumber) {
                            p.addClass(options.currentPageClass);
                            if (options.redirectCurrent) p.attr("href", makeUrl(options, n));
                            else p.attr("href", nourl);
                        }
                        else p.attr("href", makeUrl(options, n));
                        makeOnClick(n, p, options);
                        selector.append(p);
                        if (options.showSpace) selector.append(makeSpace(options));
                    }
                }
            }
        }
        if (options.showNext) {
            n = options.pageNumber * 1 + 1;
            p = $("<" + options.tag + "></" + options.tag + ">");
            p.text(options.nextText).attr("page", n).addClass(sign).addClass(options.nextClass);
            if (n < options.totalPage * 1 + 1) p.attr("href", makeUrl(options, n));
            else if (n == options.totalPage * 1 + 1 && options.redirectCurrent) p.attr("href", makeUrl(options, n));
            else p.attr("href", nourl);
            makeOnClick(n, p, options);
            selector.append(p);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showLast) {
            n = options.totalPage * 1;
            p = $("<" + options.tag + "></" + options.tag + ">");
            p.text(options.lastText).attr("page", n).addClass(sign).addClass(options.lastClass);
            if (options.pageNumber < n) p.attr("href", makeUrl(options, n));
            else if (n == options.pageNumber && options.redirectCurrent) p.attr("href", makeUrl(options, n));
            else p.attr("href", nourl);
            makeOnClick(n, p, options);
            selector.append(p);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showTotal) {
            p = $("<span></span>");
            n = options.totalText.replace(/-y-/g, options.pageNumber).replace(/-Y-/g, options.totalPage);
            p.addClass(sign).addClass(options.totalClass);
            p.text(n);
            selector.append(p);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showTurnto) {
            p = $("<span></span>");
            p.addClass(sign).addClass(options.turntoClass).text(options.turntoText);
            selector.append(p);
            p = $("<input type=\"text\" />");
            p.addClass(sign).addClass(options.turntoInputClass);
            selector.append(p);
            n = $("<input type=\"button\" />");
            n.addClass(sign).addClass(options.turntoButtonClass).val(options.turntoButtonText);
            (function (p, options) {
                if (!options.redirect) {
                    n.on("click", function () {
                        var z = /^\d+$/g;
                        var m = $.trim(p.val());
                        m = z.exec(m) ? parseInt(m) : "";
                        if (m == "" || m < 1 || m > options.totalPage) return false;
                        if (typeof (options.callback) == "function")
                            options.callback({ pagenum: m, pagesize: options.pageSize, totalnum: options.totalNumber, totalpage: options.totalPage }, options.callbackPara);
                        return false;
                    });
                }
                else {
                    n.on("click", function () {
                        var z = /^\d+$/g;
                        var m = $.trim(p.val());
                        m = z.exec(m) ? parseInt(m) : "";
                        if (m == "" || m < 1 || m > options.totalPage) return false;
                        if (typeof (options.callback) == "function")
                            options.callback({ pagenum: m, pagesize: options.pageSize, totalnum: options.totalNumber, totalpage: options.totalPage }, options.callbackPara);
                        if (m == options.pageNumber && !options.redirectCurrent) return false;
                        else window.location = makeUrl(options, m);
                    });
                }
            })(p, options);
            selector.append(n);
            if (options.showSpace) selector.append(makeSpace(options));
        }
        if (options.showSpace) selector.children().last().remove();
    };
})(jQuery);