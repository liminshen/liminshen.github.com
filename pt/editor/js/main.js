define(function (require, exports, module) {
    'use strict';
    var S_editor = require('./s_editor');
    var eidtor = new S_editor('#cccc', '.resultWin');
    var server = require('./server.js?t=123');
    var tpl = require('./tpl');

    var app = {
        init: function () {
            this.options();
            this.getThemeList();
            this.events();
        },
        options : function () {
            this._themelist = $('.themelist');
        },
        events : function () {
            var self = this;
            $('.chooseThemeBtn').click(function () {
                self._themelist.show();
            });
            this._themelist.on('click','li',function () {
                self._themelist.hide();
            });
        },
        getThemeList: function () {
            var self = this;
            server.themelist({}, function (response) {
                var json = $.parseJSON($.trim(response));
                var html = '';
                $.each(json.list, function (index, item) {
                    html += tpl.themeItem(item);
                });
                self._themelist.html(html);
            });
            //
            this.getSourceList(0);
        },
        getSourceList: function (tid) {
            server.sourceList({
                themeId: tid
            }, function (response) {
                // console.log(response);
            });
            this.createArticleId();
        },
        createArticleId: function () {
            server.createAritcleId({}, function (response) {
                console.log(response);
            });
        },
        articleSave: function () {
            server.article_save({
                id: 0,
                index: 0,
                data: JSON.stringify({'theme1_tpl1_value1': '我不明白，为什么呢'}),
                divLink: 'string',
                model: 'string',
                view: 'string',
                props: ['string', 'string'].join('/')
            }, function (response) {
                // console.log(response);
            });
        },
        articleGet: function (tid) {
            server.article_get({
                articleId: tid
            }, function (response) {
                // console.log(response);
            });
        },
    }
    app.init();
    app.articleSave();
    app.articleGet(0);


    var $divlist = $('.divlist');
    // $divlist.on('click','.add_div_btn',function(){
    //     var $this = $(this);
    //     var iframe = $this.siblings()[0];
    //     var url = iframe.src;
    //     var html = iframe2body(iframe);
    //     eidtor.setTheme('./css/theme1.css');
    //     eidtor.addTpl(html,url);
    // });
    // outputBtn.onclick = function(){
    //     eidtor.save();
    // };
    $('.preview').click(function () {
        eidtor.preview();
        $('.result_dialog').show();
    });


    function iframe2body(iframe) {
        var win = iframe.contentWindow;
        var html = win.document.body.innerHTML;
        return html;
    }

});