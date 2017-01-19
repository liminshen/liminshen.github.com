/**
 * Created by samli on 2017/1/17.
 */
define(function(require,exports,module) {
    'use strict';
    function S_editor(el,result_el) {
        this.cssLink = '';
        this.theme = '';
        this.dataList = [];//{data:{},tpl:html,divLink};

        this.articleid = '';
        this.count_tpl = 0;
        this.doType = 0;//0 加，1改
        this.tpid = 0;//模板id
        this.tid = 1314;//唯一的id
        this._container = $(el);
        this.result_container = $(result_el);
        this.init();

    }
    S_editor.prototype.init = function(){

    }
    S_editor.prototype.setTheme = function(cssLink){
        var _link = document.createElement('link');
        _link.rel="stylesheet";
        _link.href = cssLink;
        $('head').append(_link);
        this.cssLink = cssLink;
    }
    //增
    S_editor.prototype.save = function(){
        console.log(this.cssLink);
        console.log(this.theme);
        console.log(this.dataList);
    }
    //加模板以及空间
    S_editor.prototype.addTpl = function (html,url) {
        var _data = {
            data : html2Data(html),
            // tpl : html,
            divLink : url,
            view : model2view(html),
            model : html,
            props : html2props(html)
        }
        this.renderTpl(_data);
    }
    //renderTpl
    S_editor.prototype.renderTpl = function(_data){
        var _c = $('<div id="tpl'+this.tid+'" data-tindex="'+(this.count_tpl++)+'"></div>');
        _c.append(_data.model);
        this._container.append(_c);
        var _v = new Vue({
            el : '#tpl'+this.tid,
            data : _data.data
        });
        this.dataList.push(_data);
        this.tid++;
    }
    //预览，需要设置预览容器
    S_editor.prototype.preview = function () {
        var self = this;
        self.result_container.html('');
        $.each(this.dataList,function (index,tplJson) {
            var showDiv = document.createElement('div');
            showDiv.id = 'showid'+index;
            showDiv.innerHTML = tplJson.view;
            self.result_container.append(showDiv).show();
            var _v = new Vue({
                el : '#showid'+index,
                data:tplJson.data
            });
            console.log(_v);
        });
    }







    function html2Data(html) {
        var dataJson = {};

        var $html = $(html);
        var tplkey = $html.attr('data-keys');
        var tplkey_arr = eval(tplkey);
        $.each(tplkey_arr,function(index,el){
            if(/src/g.test(el)){
                dataJson[el] = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3006712134,2070120477&fm=80&w=179&h=119&img.JPEG';
            }else if(/href/g.test(el)){
                dataJson[el] = '#'
            }else{
                dataJson[el] = '默认数据';
            }

        });
        return dataJson;
    }
    function model2view(html) {
        var result = '';
        var $html = $(html);
        var textareas = $html.find('textarea');

        $.each(textareas,function (index, el) {
            var _el = $(el);
            var div = document.createElement('div');
            div.className = el.className;
            div.innerHTML = '{{' + _el.attr('v-model') + '}}';
            _el.after(div);
            _el.remove();
        });
        return $html[0].outerHTML;
    }
    function html2props(html) {
        var $html = $(html);
        var tplkey = $html.attr('data-keys');
        var tplkey_arr = eval(tplkey);
        return tplkey_arr;
    }
    function dealTpl(tpl,props) {
        $.each(props,function(index,el){
            tpl.setAttribute(':'+el,el);
        });
        console.log(tpl);
        return tpl;
    }
    return S_editor;
});