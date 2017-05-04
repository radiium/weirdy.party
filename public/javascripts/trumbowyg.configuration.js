$('#editor').trumbowyg({

    // Custom buttons
    btnsDef: {
        image: {
            dropdown: ['insertImage', 'upload', 'base64', 'noEmbed', 'insertAudio'],
            ico: 'insertImage'
        },
        clear: {
            ico: 'remove',
            fn: function() {
                console.log('=> Clear content');
                if($('#editor').trumbowyg('html').length > 0) {
                    if(confirm('Clear all?')) {
                        $('#editor').trumbowyg('empty');
                    }
                }
            }
        },
        closed: {
            ico: 'close',
            fn: function() {
                console.log('=> Close editor');
                if(confirm("Quit without saving \nand return to home page?")) {
                    //$('#editor').trumbowyg('destroy');
                    //document.location.href = 'http://localhost:7331';
                    console.log(window.location.href);
                    console.log(window.location.origin);
                    window.location = window.location.origin;             
                }
            }
        },
        save: {
            ico: 'save',
            fn: function() {
                console.log('=> Save page');
                console.log($('#editor').trumbowyg('html'));
                var html = $('#editor').trumbowyg('html');

                if (html.length > 0) {

                    var datas = {};

                    datas.content = html;
                    datas.pageName = 'page test';
                    $.ajax({
                        url: '/uploadPage',
                        type: 'POST',
                        data: datas,
                        cache: false,
                        dataType: 'json',

                        success:  function (data) {
                            console.log(data);
                            if (data.html) {
                            
                            } else {
                                
                            }
                        },
                        error: function () {
                            trumbowyg.addErrorOnModalField(
                                $('input[type=text]', $modal),
                                trumbowyg.lang.noembedError
                            );
                            }
                        });
                }
            }
        },
    },

    // Toolbar buttons
    btns: [
        ['viewHTML'],
        ['formatting'],
        'btnGrp-design',
        ['link'],
        ['image'],
        'btnGrp-justify',
        'btnGrp-lists',
        ['foreColor', 'backColor'],
        ['preformatted'],
        ['horizontalRule'],
        ['clear', 'closed', 'save'],
        ['fullscreen']
    ],
    btnsAdd: ['close'],

    mobile: true,
    semantic: true,
    resetCss: true,
    fixedBtnPane: true,
    fixedFullWidth: true,
    autogrow: true,
    autoAjustHeight: true,

    closable: true

});

$('#editor').trumbowyg().on('tbwclose', function() {
    console.log('tbwclose!');
    
});