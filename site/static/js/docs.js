function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") > -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    }
    else {
        return uri + separator + key + "=" + value;
    }
}
function getParameterByName(name, queryString) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = '(?:\\?|&(?:amp;)?)(' + name + ')(?:=?([^&#]*))';
    var regex = new RegExp(regexS, 'g');
    var results;
    var resultsAsAList = [];
    queryString = queryString || window.location.search;
    while (results = regex.exec(queryString)) {
        resultsAsAList.push(decodeURIComponent(results[2].replace(/\+/g, " ")));
    }
    return resultsAsAList;
}
function updateNavigation(e) {
    var $this = $(this);
    var $active = $this.find('.active');
    if ($active.length != 1) {
        return;
    }
    var currentTopic = $active.first().find('a').first();
    window.location = currentTopic.attr('href');
    //window.history.replaceState({}, null, currentTopic.attr('href'));
    //console.log(currentTopic.attr('href'));
}
$(document).ready(function () {
   $("li").bind('activate', updateNavigation);
    function update_lang_head(text){
        var lang_head = $('#lang-dropdown-head');
        lang_head.html(text + " <b class='caret'></b>")
    }
    var default_lang = getParameterByName('language', window.location.href);
    default_lang = (default_lang.length > 0) ? default_lang[0] : 'bash';
    default_lang_dd = $("[data-lang='" + default_lang +"']");
    update_lang_head(default_lang_dd.text());
    default_lang_dd.parent().hide();
    $("[class^='highlight-']").hide();
    $(".highlight-" + default_lang).show();
    $('.highlight-javascript').show();
    $('.lang-change').click(function () {
        var lang = $(this).attr('data-lang');
        var langtext = $(this).text();
        update_lang_head(langtext);
        var parent = $(this).parent();
        parent.siblings().show();
        parent.hide();
        $("[class^='highlight-']").hide();
        $(".highlight-javascript").show();
        $(".highlight-" + lang).show();
        var uri = updateQueryStringParameter(window.location.pathname + window.location.search, 'language', lang);
        uri = uri + '' + window.location.hash;
        window.location = uri;
        //window.history.replaceState(null, null, uri);
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });
    });
});