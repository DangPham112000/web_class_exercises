$('document').ready(function() {
    $('.fade').on('click', function() {
        $('.register-title').toggleClass('selected');
        $('.login-title').toggleClass('selected');
        $('.register-form').toggleClass('selected');
        $('.login-form').toggleClass('selected'); 
    });
    
});