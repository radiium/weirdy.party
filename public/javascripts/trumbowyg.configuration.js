












// Editor instance and configuration
$('#editor').trumbowyg({

    // Custom buttons
    btnsDef: {
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
                    //document.location.href = 'http://localhost:7331';
                    console.log(window.location.href);
                    console.log(window.location.origin);
                    window.location = window.location.origin;             
                }
            } 
        },

//         // Add background image
//         bckImg: {
//             title: 'Add background image',
//             ico: 'insert-image',
//             fn: function addBckGrdImage() {
//                 // Open a modal box
//                 var $modal = $("#editor").trumbowyg("openModalInsert", {
//                     title: "A title for modal box",
//                     content: "<p>Content in HTML which you want include in created modal box</p>",
//                     function() {
//                         return;
//                     }
// 
//                 });
// 
//                 // Listen clicks on modal box buttons
//                 $modal.on('trumbowyg-confirm', function(e){
//                     // Save datas
//                     console.log(e)
//                     $("#editor").trumbowyg("closeModal");
//                 });
//                 $modal.on('trumbowyg-cancel', function(e){
//                     $("#editor").trumbowyg("closeModal");
//                 });
//             }
//         },

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
                var html    = '<div class=\'page-wrap\' ';

                var bckImg = $('#editor').css("background-image");
                var bckAtt = $('#editor').css("background-attachment");
                var bckPos = $('#editor').css("background-position");
                var bckRep = $('#editor').css("background-repeat");
                var bckSiz = $('#editor').css("background-size");

                if (bckImg !== '') {
                    html += 'style=\'';
                    html += 'background-image: ' + bckImg + '; ';

                    if (bckAtt !== '') {
                        html += 'background-attachment: ' + bckAtt + '; ';
                    }
                    if (bckPos !== '') {
                        html += 'background-position: ' + bckPos + '; ';
                    }
                    if (bckRep !== '') {
                        html += 'background-repeat: ' + bckRep + '; ';
                    }
                    if (bckSiz !== '') {
                        html += 'background-size: ' + bckSiz + '; ';
                    }

                    html += '\'';
                }
                html += '>' + content + '</div>';

                if (html.length > 0) {

                    var datas = {};

                    datas.content  = html;
                    datas.pageName = pageName;
                    $.ajax({
                        url: '/uploadPage',
                        type: 'POST',
                        data: datas,
                        cache: false,
                        dataType: 'json',

                        success:  function (data) {
                            if (data.html) {
                            
                            } else {
                                
                            }
                            index();
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