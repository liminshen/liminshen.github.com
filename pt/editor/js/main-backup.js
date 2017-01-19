define( function(require,exports,module) {
    'use strict';
    var api = require('./api/index');
    var demo3 = require('./lib/text!./text/demo3.html');
    var container = document.querySelector('#cccc');
    var result_html = '';
    window._data = {
    }
    var tid = 1314;
    function html2Component(html){
        var _child_data = {
            data : {},
            tpl : html
        };
        var $html = $(html);
        result_html += html;
        var tplname = $html.attr('data-tpl');
        var tplkey = $html.attr('data-key');
        var tplkey_arr = eval(tplkey);
        var vue_tpl = document.createElement(tplname);
        var _c = document.createElement('div');
        _c.id = 'tpl'+tid;
        _c.innerHTML = html;
        container.appendChild(_c);
        Vue.component(tplname, {
            props: tplkey_arr,
            template: html
        });
        $.each(tplkey_arr,function(index,el){
            vue_tpl.setAttribute(':'+el,el);
            if(/src/g.test(el)){
                _child_data.data[el] = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3006712134,2070120477&fm=80&w=179&h=119&img.JPEG';
            }else{
                _child_data.data[el] = '默认数据';
            }

        });
        var _v = new Vue({
            el : '#tpl'+tid,
            data : _child_data.data
        });
        _data['#tpl'+tid] = _child_data;
        tid++;
    }
    html2Component(demo3);


    // window.app7 = new Vue({
    //     el: '#cccc',
    //     data: _data
    // });
    var outputBtn = document.querySelector('.output');
    outputBtn.onclick = function(){
        $('#result').html(result_html);
        new Vue({
            el : '#result',
            data : _data
        })
    };
    
    
});