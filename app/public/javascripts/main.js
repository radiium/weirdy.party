
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

// Infos popup

function closePopup() {
    if ($('#infos').css('top') === '-400px') {
        $('#infos').css('top', '50px');
        $( "#content" ).addClass( "blur" );
        isOpen = true;
    } else {
        $('#infos').css('top', '-400px');
        $( "#content" ).removeClass( "blur" );
         isOpen = false;
   }
}

// Open close button from toolbar 
var isOpen;
$( "#infos-open" ).click(function() {
    closePopup();
});

// Close button on infos popup
$( "#infos-close" ).click(function() {
    closePopup();
});

// Close on click outside popup
$( "html" ).click(function() {
    if (isOpen) { closePopup(); }
});

// Prevent click on popup
$( "#infos" ).click(function(event) {
    event.stopPropagation();
})
