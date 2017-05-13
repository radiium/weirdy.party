
function index() {
    window.location.href = window.location.origin;
}
function openEditor() {
    window.location.href = '/editor';
}
function preview() {
    window.location.href = '/previews';
}
function logout() {
     window.location.href = '/logout';
}

function prev() {
    window.location.href = '/pages/' + '<%= data.prevPage %>';
}
function next() {
    window.location.href = '/pages/' + '<%= data.nextPage %>';
}

// Togle toolbar button
$( "#toggle" ).click(function() {
    if ($('#toolbar').css('width') === '185px') {
        $('#toggle').css('border-radius', '0');
        $('#toggle').toggleClass('rotation');
        $('#toolbar').css('width', '0');
        $('.toolbar-btn').css('width', '0');
    } else {
        $('#toggle').css('border-radius', '25px');
        $('#toggle').toggleClass('rotation');
        $('#toolbar').css('width', '185px');
        $('.toolbar-btn').css('width', '50px');
    }
});
// Open close button from toolbar 
$( "#infos-open" ).click(function() {
    if ($('#infos').css('top') === '-300px') {
        $('#infos').css('top', '50px');
    } else {
        $('#infos').css('top', '-300px');
    }
});
// Close button on infos popup
$( "#infos-close" ).click(function() {
    if ($('#infos').css('top') === '-300px') {
        $('#infos').css('top', '50px');
    } else {
        $('#infos').css('top', '-300px');
    }
});

