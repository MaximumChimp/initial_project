$(document).ready(function () {
    //Icon Animation 
    var emaillabel = $('#emailLabel').css('visibility','hidden');

    var passwordlabel = $('#passwordLabel').css('visibility','hidden');
   
 
    $('#emailLogin').focus(function () {
            $(this).removeAttr('placeholder');
            
            $(emaillabel).css('visibility','visible');
            $('#envelope').attr('animation','tada');

            $(this).focusout(function() {
                
                $('#envelope').attr('animation','none');
                $(this).attr('placeholder','Email Address');
                $(emaillabel).css('visibility','hidden');
            
            });
    });

    $('#passLogin').focus(function () {
        
        $(this).removeAttr('placeholder');

        $(passwordlabel).css('visibility','visible');
        $('#lock').attr('animation','tada');
        
        $(this).focusout(function() {
            
            $('#lock').attr('animation','none');
            $(this).attr('placeholder','Password');
            $(passwordlabel).css('visibility','hidden');
        
        });
    })

    //Slider
    $('.slider-cont').hover(function(){
        $('.prev,.next').css({'background-color':'#bbb'})
        },function(){
            $('.prev,.next').css({'background-color':'transparent'})
    });
    
    //clone room
    $('#new-room').click(function(){
        $('.room:first').clone().appendTo('.container')
    });

   //signup modal
   $('#create').click(function(){
        $('.newAccount').css({
            'visibility':'visible',
            'top':'50%',
           
            
        }).show();
 
   });
  
   $('#cancel').click(function(){
  
    $('.newAccount').hide()

});

})

