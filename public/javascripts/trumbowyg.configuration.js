// Editor instance and configuration
$('#editor').trumbowyg({

    // Custom plugins option
    plugins: {
        bckImage: {
            serverPath: '/api/uploadFile'
        },
        upload: {
            serverPath: '/api/uploadFile'
        },
    },

    // Custom buttons
    btnsDef: {

        // Custom dropdown menu
        image: {
            dropdown: ['insertImage', 'upload', 'base64', 'bckImage', 'noEmbed', 'insertAudio'],
            ico: 'insertImage'
        },

        // Clear editor content
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

        // Close editor
        closed: {
            ico: 'close',
            fn: function() {
                console.log('=> Close editor');
                if(confirm("Quit without saving \nand return to home page?")) {
                    $('#editor').trumbowyg('destroy');
                    logout();
                    //index();
                }
            } 
        },

        // Save page to server
        save: {
            ico: 'save',
            fn: function() {

                console.log('=> Save page');

                var pageName = prompt("Please enter your page name", "");
                if (pageName === "") {
                    var date = new Date().getTime();
                    pageName = 'page-' + date;
                }

                var content = $('#editor').trumbowyg('html');
                var html    = '<div class=\'page-wrap\'>';

                var bckImg = $('#editor').css("background-image");
                var bckAtt = $('#editor').css("background-attachment");
                var bckPos = $('#editor').css("background-position");
                var bckRep = $('#editor').css("background-repeat");
                var bckSiz = $('#editor').css("background-size");

                if (bckImg !== '') {
                    var bckStyle = 
                        '<style id=\'bckgrdImgStyle\'>body {' +
                        'background-image: ' + bckImg + ' !important;'

                    if (bckAtt !== '') {
                        bckStyle += 'background-attachment: ' + bckAtt + ';';
                    }
                    if (bckPos !== '') {
                        bckStyle += 'background-position: ' + bckPos + ';';
                    }
                    if (bckRep !== '') {
                        bckStyle += 'background-repeat: ' + bckRep + ';';
                    }
                    if (bckSiz !== '') {
                        bckStyle += 'background-size: ' + bckSiz + ';';
                    }
                    bckStyle += '}</style>'
                    html += bckStyle
                }

                html += content + '</div>';

                if (html.length > 0) {

                    var datas = {};

                    datas.content  = html;
                    datas.pageName = pageName;
                    $.ajax({
                        url: '/api/uploadPage',
                        type: 'POST',
                        data: datas,
                        cache: false,
                        dataType: 'json',

                        success:  function (data) {
                            if (data.html) {
                            
                            } else {
                                
                            }

                            logout();
                            //index();
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
        ['viewHTML'], ['formatting'], 'btnGrp-design', ['link'], ['image'], 'btnGrp-justify',
        'btnGrp-lists', ['foreColor', 'backColor'], ['preformatted'], ['horizontalRule'],
        ['clear', 'closed', 'save'], ['fullscreen']
    ],

    // Miscellanous
    btnsAdd: ['close'],
    closable: true,
    mobile: true,
    semantic: true,
    resetCss: true,
    fixedBtnPane: true,
    fixedFullWidth: true,
    autogrow: true,
    autoAjustHeight: true
});

$('#editor').trumbowyg().on('tbwclose', function() {
    //console.log('tbwclose!');
    
});