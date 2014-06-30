// Hotsheet Handlebars magic
(function(){
    $.getJSON("data/hotsheet.json").done(function(data){
        var source = $('#hotsheet-template').html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $('#hotsheet').html(html);
    });

})();