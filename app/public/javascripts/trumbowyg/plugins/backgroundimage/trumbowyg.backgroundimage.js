/* ===========================================================
 * trumbowyg.upload.js v1.2
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 * Mod by : Aleksandr-ru
 *          Twitter : @Aleksandr_ru
 *          Website : aleksandr.ru
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        serverPath: './src/plugins/upload/trumbowyg.upload.php',
        fileFieldName: 'fileToUpload',
        data: [],                       // Additional data for ajax [{name: 'key', value: 'value'}]
        headers: {},                    // Additional headers
        xhrFields: {},                  // Additional fields
        urlPropertyName: 'file',        // How to get url from the json response (for instance 'url' for {url: ....})
        statusPropertyName: 'success',  // How to get status from the json response 
        success: undefined,             // Success callback: function (data, trumbowyg, $modal, values) {}
        error: undefined                // Error callback: function () {}
    };

    function getDeep(object, propertyParts) {
        var mainProperty = propertyParts.shift(),
            otherProperties = propertyParts;

        if (object !== null) {
            if (otherProperties.length === 0) {
                return object[mainProperty];
            }

            if (typeof object === 'object') {
                return getDeep(object[mainProperty], otherProperties);
            }
        }
        return object;
    }

    addXhrProgressEvent();

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                bckTitle: 'Add background image',
                file: 'File',
                uploadError: 'Error'
            },
            sk: {
                bckTitle: 'Nahrať',
                file: 'Súbor',
                uploadError: 'Chyba'
            },
            fr: {
                bckTitle: 'Ajouter image de fond',
                file: 'Fichier',
                uploadError: 'Erreur'
            },
            cs: {
                bckTitle: 'Nahrát obrázek',
                file: 'Soubor',
                uploadError: 'Chyba'
            },
            zh_cn: {
                bckTitle: '上传',
                file: '文件',
                uploadError: '错误'
            },
            ru: {
                bckTitle: 'Загрузка',
                file: 'Файл',
                uploadError: 'Ошибка'
            }
        },
        // jshint camelcase:true

        plugins: {
            bckImage: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.bckImage = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.bckImage || {});
                    var btnDef = {
                        title: trumbowyg.lang.bckTitle,
                        ico: 'insert-image',
                        fn: function () {
                            trumbowyg.saveRange();

                            var file,
                                prefix = trumbowyg.o.prefix;

                            console.log('test:');
                            console.log(trumbowyg.lang.bckTitle);

                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.bckTitle,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*'
                                        }
                                    },
                                    size: {
                                        label: 'Size 100%',
                                        required: false,
                                        type: 'checkbox'
                                    },
                                    repeat: {
                                        label: 'Repeat',
                                        required: false,
                                        type: 'checkbox'
                                    },
                                    scroll: {
                                        label: 'Scroll',
                                        required: false,
                                        type: 'checkbox'
                                    }
                                },

                                // Callback
                                function (values) {

                                    console.log(values);

                                    var data = new FormData();
                                    data.append(trumbowyg.o.plugins.bckImage.fileFieldName, file);

                                    trumbowyg.o.plugins.bckImage.data.map(function (cur) {
                                        data.append(cur.name, cur.value);
                                    });

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

                                    var size = '';
                                    if (values.size) {
                                        size ='100%';
                                    } else {
                                        size ='auto';
                                    }

                                    var repeat = '';
                                    if (values.repeat) {
                                        repeat = 'repeat';
                                    } else {
                                        repeat = 'no-repeat';
                                    }

                                    var attach = '';
                                    if (values.scroll) {
                                        attach = 'scroll';
                                    } else {
                                        attach = 'fixed';
                                    }

                                    $.ajax({
                                        url: trumbowyg.o.plugins.bckImage.serverPath,
                                        headers: trumbowyg.o.plugins.bckImage.headers,
                                        xhrFields: trumbowyg.o.plugins.bckImage.xhrFields,
                                        type: 'POST',
                                        data: data,
                                        cache: false,
                                        dataType: 'json',
                                        processData: false,
                                        contentType: false,

                                        progressUpload: function (e) {
                                            $('.' + prefix + 'progress-bar').stop().animate({
                                                width: Math.round(e.loaded * 100 / e.total) + '%'
                                            }, 200);
                                        },

                                        success: function (data) {
                                            if (trumbowyg.o.plugins.bckImage.success) {
                                                trumbowyg.o.plugins.bckImage.success(data, trumbowyg, $modal, values);
                                            } else {
                                                if (!!getDeep(data, trumbowyg.o.plugins.bckImage.statusPropertyName.split('.'))) {
                                                    
                                                    var url = getDeep(data, trumbowyg.o.plugins.bckImage.urlPropertyName.split('.'));

                                                    //var attachment = 'fixed';
                                                    var position   = 'center';
                                                    //var repeat     = 'repeat';
                                                    //var size       = 'auto';

                                                    $('#editor').attr('style',
                                                    'background-image: url(\'' + data.file + '\') !important;' +
                                                    'background-attachment: ' + attach + '  !important;' +
                                                    'background-position:   ' + position + '  !important;' +
                                                    'background-repeat:     ' + repeat + '  !important;' +
                                                    'background-size:       ' + size +  '  !important;'
                                                    );
                                                    
                                                    setTimeout(function () {
                                                        trumbowyg.closeModal();
                                                    }, 250);
                                                    trumbowyg.$c.trigger('tbwuploadsuccess', [trumbowyg, data, url]);
                                                } else {
                                                    trumbowyg.addErrorOnModalField(
                                                        $('input[type=file]', $modal),
                                                        trumbowyg.lang[data.message]
                                                    );
                                                    trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg, data]);
                                                }
                                            }
                                        },

                                        error: trumbowyg.o.plugins.bckImage.error || function () {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                trumbowyg.lang.uploadError
                                            );
                                            trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg]);
                                        }
                                    });
                                }
                            );

                            $('input[type=file]').on('change', function (e) {
                                try {
                                    // If multiple files allowed, we just get the first.
                                    file = e.target.files[0];
                                } catch (err) {
                                    // In IE8, multiple files not allowed
                                    file = e.target.value;
                                }
                            });
                        }
                    };

                    trumbowyg.addBtnDef('bckImage', btnDef);
                }
            }
        }
    });


    function addXhrProgressEvent() {
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
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
