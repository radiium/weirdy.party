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
        savePage: {
            serverPath: '/api/uploadPage'
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
                    window.location.href = '/logout';
                }
            } 
        },
    },

    // Toolbar buttons
    btns: [
        ['viewHTML'], ['formatting'], 'btnGrp-design', ['link'], ['image'], 'btnGrp-justify',
        'btnGrp-lists', ['foreColor', 'backColor'], ['preformatted'], ['horizontalRule'],
        ['clear', 'closed', 'savePage'], ['fullscreen']
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