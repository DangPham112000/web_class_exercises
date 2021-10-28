
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
    $('#log-username').focus(removeError);

    $('#log-password').blur(function() { 
        valiPassword($(this)); 
    });
    $('#log-password').focus(removeError);

    $('.login-form').submit(function(event) {
        event.preventDefault();
        
        valiUsername($('#log-username'));
        valiPassword($('#log-password'));
    });

    $('.login').mousedown(function() {
        
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

function removeError(element) {
    const ele = element || $(this);
    console.log(element || $(this));
    if (ele.next('.error')) {
        ele.next('.error').remove();
    }
}

function printError(element, text) {
    const errEle = document.createElement('span');

    errEle.classList.add('error');

    errEle.innerText = text;

    element.parent().append(errEle);
}
