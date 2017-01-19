/**
 * Created by sam 2017/1/18.
 */
define(function (require, exports, module) {
    'use strict';
    var host = 'http://localhost:8080/';
    var THEME_LISE_URL = 'mock/themelist.txt';
    var SOURCE_LISE_URL = 'mock/sourceList.txt';
    var ARTICLE_CREATE_URL = 'mock/article_create.txt';
    var ARTICLE_SAVE_URL = 'mock/article_save.txt';
    var ARTICLE_GET_URL = 'mock/article_get.txt';
    var ARTICLE_LIST_GET_URL = 'mock/articleList_get.txt';
    var server = {
        //获取主题的list
        themelist: function (data, okFn, erFn) {
            serverPost(host + THEME_LISE_URL, data, okFn, erFn);
        },
        //获取thmeme下面的资源
        sourceList: function (data, okFn, erFn) {
            serverPost(host + SOURCE_LISE_URL, data, okFn, erFn);
        },
        //创建文章的id
        createAritcleId: function (data, okFn, erFn) {
            serverPost(host + ARTICLE_CREATE_URL, data, okFn, erFn);
        },
        /**
         * save接口
         {
             id : 文章id，
             index : 0,
             data : string,
             divLink : string,
             model : string,
             view : string,
             props : Array
         }
         */
        //保存编辑好的文章
        article_save: function (data, okFn, erFn) {
            serverPost(host + ARTICLE_SAVE_URL, data, okFn, erFn);
        },
        //获取编辑好的文章
        article_get: function (data, okFn, erFn) {
            serverPost(host + ARTICLE_GET_URL, data, okFn, erFn);
        },
        //获取编辑好的文章列表
        articleList_get: function (data, okFn, erFn) {
            serverPost(host + ARTICLE_LIST_GET_URL, data, okFn, erFn);
        }
    }

    function serverPost(url, data, okFn, erFn) {
        var loginXHR = $.ajax({
            url: url,
            type: 'GET',
            data: data,
            success: okFn,
            fail: erFn,
            // xhrFields : {withCredentials: true}
        });
    }

    return server;
});