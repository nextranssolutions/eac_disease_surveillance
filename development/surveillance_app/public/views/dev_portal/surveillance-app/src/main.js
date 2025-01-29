
(function ($) {
    "use strict";
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

   
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false}, 'google_translate_element'); //remove the layout
  }

    function triggerHtmlEvent(element, eventName) {
var event;
if(document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
} else {
    event = document.createEventObject();
    event.eventType = eventName;
    element.fireEvent('on' + event.eventType, event);
}
}
        $('.translation-links a').click(function(e) {
  e.preventDefault();
  var lang = $(this).data('lang');
  $('#google_translate_element select option').each(function(){
    if($(this).text().indexOf(lang) > -1) {
        $(this).parent().val($(this).val());
        var container = document.getElementById('google_translate_element');
        var select = container.getElementsByTagName('select')[0];
        triggerHtmlEvent(select, 'change');
    }
});
});

var delay = 2000;
setTimeout(function() 
    {  
        //$( "#overlay" ).fadeOut( "slow" );
        // $('#container').fadeIn();

         $(".loader").fadeOut("slow");
         $(".loader_gif").fadeOut("slow");
         $('#container').fadeIn();
    },
    delay
) ;

})(jQuery);

