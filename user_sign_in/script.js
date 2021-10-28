const usernameRegex = /^[a-zA-Z0-9]+$/;

$('document').ready(function () {

    $('.fade').on('click', function () {
        $('.register-title').toggleClass('selected');
        $('.login-title').toggleClass('selected');
        $('.register-form').toggleClass('selected');
        $('.login-form').toggleClass('selected');


    });

    if ($('.login-form').hasClass('selected')) {
        validationLogin();
    } else {
        validationRegistered();
    }
});

function validationLogin() {
    $('#log-username').blur(function() { 
        valiUsername($(this)); 
    });
    $('#log-username').focus(removeElementError);

    $('#log-password').blur(function() { 
        valiPassword($(this)); 
    });
    $('#log-password').focus(removeElementError);

    $('.login-form').submit(function(event) {
        event.preventDefault();
        
        valiUsername($('#log-username'));
        valiPassword($('#log-password'));
    });

    $('.login').submit((event) => { event.preventDefault(); })
    $('.login').mousedown(function() {
        removeAllError();
    });
}

function valiUsername(element) {
    const name = element.val();
    if (!usernameRegex.test(name)) {
        printError(element, 'Username invalid');
    } else if (name.length < 6 || name.length > 32) {
        printError(element, 'Username length is betwen from 6 to 32');
    }
}

function valiPassword(element) {
    const pass = element.val();
    if (pass.length < 6 || pass.length > 32) {
        printError(element, 'Password length is betwen from 6 to 32');
    }
}

function removeElementError() {
    if ($(this).next('.error')) {
        $(this).next('.error').remove();
    }
}

function removeAllError() {
    $('.error').remove();
}

function printError(element, text) {
    const errEle = document.createElement('span');

    errEle.classList.add('error');

    errEle.innerText = text;

    element.parent().append(errEle);
}
