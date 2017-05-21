
function logout() {
     $.ajax({
        url: '/logout', type: 'GET',
        success:  function (data) { console.log(data); },
        error: function (err) { console.log(err); }
    });
}

// Togle toolbar button
$( "#toggle" ).click(function() {
    // close
    if ($('#toolbar').css('width') === '185px') {
        $('#toggle').css('border-radius', '0');
        $('#toggle').toggleClass('rotation');
        $('#toolbar').css('width', '0');
        $('.toolbar-btn').css('width', '0');
        if ($(window).width() < 425) {
            $('#navbar').css('margin-left', '0');
        }
    // Open
    } else {
        $('#toggle').css('border-radius', '25px');
        $('#toggle').toggleClass('rotation');
        $('#toolbar').css('width', '185px');
        $('.toolbar-btn').css('width', '50px');
        if ($(window).width() < 425) {
            $('#navbar').css('margin-left', '55px');
        }
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
