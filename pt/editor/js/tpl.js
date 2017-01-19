/**
 * Created by samli on 2017/1/18.
 */
define(function (require,exports,module) {
    var tpl = {
        themeItem :function (json) {
            console.log(json);
            var name = json.name;
            var themeid = json.themeid;
            var themeImg = json.themeImg;
            return '<li class="list-group-item" data-id="'+themeid+'"><a href="'+themeImg+'" target="_blank">'+name+'</a></li>';
        }
    }
    return tpl;
})