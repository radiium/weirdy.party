
function logout() {
     $.ajax({
        url: '/logout', type: 'GET',
        success:  function (data) { console.log(data); },
        error: function (err) { console.log(err); }
    });
}

// Togle toolbar button
$( "#toggleBtn" ).click(function() {
    if ($("#menu").css("display") === "none") {
        $('#toggleBtn').addClass('rotation');
        $('.textBtn').show();
    } else {
        $('#toggleBtn').removeClass('rotation');
        $('.textBtn').hide();
    }
    $('.menuBtn').slideToggle("0.2s", "linear");
    $('#menu').slideToggle("0.2s", "linear");
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
