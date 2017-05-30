/* ===========================================================
 * trumbowyg.upload.js v1.2
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Radiium@openmailbox.org
 */

(function ($) {
    'use strict';

    // Ajax default options
    var defaultOptions = {
        serverPath: '/api/uploadPage',
        headers: {},                    // Additional headers
        statusPropertyName: 'success',  // How to get status from the json response 
        success: undefined,             // Success callback: function (data, trumbowyg, $modal, values) {}
        error: undefined                // Error callback: function () {}
    };

    // Get background-image from editor
    function getBackround() {
        var bckStyle = '';

        // Get backround attributes
        var bckImg = $('#editor').css("background-image");
        var bckAtt = $('#editor').css("background-attachment");
        var bckPos = $('#editor').css("background-position");
        var bckRep = $('#editor').css("background-repeat");
        var bckSiz = $('#editor').css("background-size");

        // If background-image
        if (bckImg !== '') {
            bckStyle = '<style id=\'bckgrdImgStyle\'>#content {background-image: ' + bckImg + ' !important;'
           
            // If other attributes
            if (bckAtt !== '') { bckStyle += 'background-attachment: ' + bckAtt + ';'; }
            if (bckPos !== '') { bckStyle += 'background-position: ' + bckPos + ';'; }
            if (bckRep !== '') { bckStyle += 'background-repeat: ' + bckRep + ';'; }
            if (bckSiz !== '') { bckStyle += 'background-size: ' + bckSiz + ';'; }
            bckStyle += '}</style>'
        }
        return bckStyle;
    }

    addXhrProgressEvent();

    $.extend(true, $.trumbowyg, {

        langs: {
            // jshint camelcase:false
            en: {
                savePageTitle: 'Save page',
                name: 'Page name',
                uploadError: 'Error'
            },

            fr: {
                savePageTitle: 'Sauvegarder page',
                name: 'Nom de la page',
                uploadError: 'Erreur'
            }
        },

        // jshint camelcase:true
        plugins: {
            savePage: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.savePage = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.savePage || {});
                    var btnDef = {
                        title: trumbowyg.lang.savePageTitle,
                        ico: 'save',
                        fn: function() {

                            trumbowyg.saveRange();
                            var prefix = trumbowyg.o.prefix;

                            console.log('open save modal')
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.savePageTitle,

                                // Modal fields
                                {
                                    pageName: {
                                        label: 'Page name',
                                        required: true,
                                        type: 'text'
                                    },
                                },

                                // Callback
                                function (values) {

                                    console.log('=> Save page');

                                    if ($('.' + prefix + 'progress', $modal).length === 0) {
                                        $('.' + prefix + 'modal-title', $modal)
                                            .after(
                                                $('<div/>', {
                                                    'class': prefix + 'progress'
                                                }).append(
                                                    $('<div/>', {
                                                        'class': prefix + 'progress-bar'
                                                    })
                                                )
                                            );
                                    }
                                    
                                    // Get page name
                                    var pageName = '';
                                    if (values.pageName === "") {
                                        var date = new Date().getTime();
                                        pageName = 'page-' + date;
                                    } else {
                                        pageName = values.pageName;
                                    }

                                    // Get pages content
                                    var content = $('#editor').trumbowyg('html');
                                    var html    = '<div class=\'page-wrap\'>';
                                    // Get backround image if exist
                                    html       += getBackround();
                                    html       += content + '</div>';

                                    // Build and send uploadPage request                                    
                                    if (html.length > 0) {
                                        var datas = {};
                                        datas.content  = html;
                                        datas.pageName = pageName;

                                        // Send page to api
                                        $.ajax({
                                            url: trumbowyg.o.plugins.savePage.serverPath,
                                            headers: trumbowyg.o.plugins.savePage.headers,
                                            type: 'POST',
                                            data: datas,
                                            cache: false,
                                            dataType: 'json',

                                            progressUpload: function (e) {
                                                $('.' + prefix + 'progress-bar').stop().animate({
                                                    width: Math.round(e.loaded * 100 / e.total) + '%'
                                                }, 200);
                                            },

                                            success:  function (data) {

                                                if (data.success) {
                                                    console.log('UploadPage sucess');
                                                    console.log(data.message);

                                                    setTimeout(function () {
                                                        trumbowyg.closeModal();
                                                    }, 250);

                                                    window.location.href = '/logout';
                                                } else {
                                                    trumbowyg.addErrorOnModalField(
                                                        $('input[type=text]', $modal),
                                                        'Upload Error (from succes)'
                                                    );
                                                    trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg, data]);
                                                }
                                            },

                                            error: function () {
                                                console.log('Save page error')
                                                trumbowyg.addErrorOnModalField(
                                                    $('input[type=text]', $modal),
                                                    'Upload Error (from error)'
                                                );
                                            }
                                        });
                                    }
                                }
                            );
                        }
                    };

                    trumbowyg.addBtnDef('savePage', btnDef);
                }
            }
        }
    });

    // Progress event
    function addXhrProgressEvent() {
        // Avoid adding progress event multiple times
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {
            var originalXhr = $.ajaxSettings.xhr;
            $.ajaxSetup({
                xhr: function () {
                    var req = originalXhr(),
                        that = this;
                    if (req && typeof req.upload === 'object' && that.progressUpload !== undefined) {
                        req.upload.addEventListener('progress', function (e) {
                            that.progressUpload(e);
                        }, false);
                    }

                    return req;
                }
            });
            $.trumbowyg.addedXhrProgressEvent = true;
        }
    }
})(jQuery);
