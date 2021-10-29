$('document').ready(function () {

    $('.fade').on('click', function () {
        $('.register-title').toggleClass('selected');
        $('.login-title').toggleClass('selected');
        $('.register-form').toggleClass('selected');
        $('.login-form').toggleClass('selected');
    });
    validationLogin();
    validationRegister();
    
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
        removeAllError();
        
        valiUsername($('#log-username'));
        valiPassword($('#log-password'));
    });

    $('#login').submit((event) => { event.preventDefault(); })
    $('#login').mouseup(function() {
        removeAllError();
    });
}

function validationRegister() {
    $('#reg-fullname').blur(function() { 
        valiFullname($(this)); 
    });
    $('#reg-fullname').focus(removeElementError);

    $('#reg-username').blur(function() { 
        valiUsername($(this)); 
    });
    $('#reg-username').focus(removeElementError);

    $('#reg-password').blur(function() { 
        valiPassword($(this)); 
    });
    $('#reg-password').focus(removeElementError);

    $('#reg-email').blur(function() { 
        valiEmail($(this)); 
    });
    $('#reg-email').focus(removeElementError);

    $('#reg-phone').blur(function() { 
        valiPhone($(this)); 
    });
    $('#reg-phone').focus(removeElementError);

    $('#reg-date').blur(function() { 
        valiDate($(this)); 
    });
    $('#reg-date').focus(removeElementError);

    $('.register-form').submit(function(event) {
        event.preventDefault();
        removeAllError();
        
        valiFullname($('#reg-fullname'));
        valiUsername($('#reg-username'));
        valiPassword($('#reg-password'));
        valiEmail($('#reg-email'));
        valiPhone($('#reg-phone'));
        valiDate($('#reg-date'));
    });

    $('#register').submit((event) => { event.preventDefault(); })
    $('#register').mouseup(function() {
        removeAllError();
    });

}

function valiUsername(element) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    const name = element.val();
    if (name.length < 6 || name.length > 32) {
        printError(element, 'Username length is betwen from 6 to 32');
    } else if (!usernameRegex.test(name)) {
        printError(element, 'Username invalid');
    }
}

function valiPassword(element) {
    const pass = element.val();
    if (pass.length < 6 || pass.length > 32) {
        printError(element, 'Password length is betwen from 6 to 32');
    }
}

function valiFullname(element) {
    const fullnameRegex = /^([A-Z]{1}[a-z]+ )+([A-Z]{1}[a-z]+)$/;

    const fullname = element.val();
    if (!fullnameRegex.test(fullname)) {
        printError(element, 'Your name is invalid');
    }
}

function valiPhone(element) {
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

    const phone = element.val();
    if (!phoneRegex.test(phone)) {
        printError(element, 'Your phone is invalid');
    }
}

function valiEmail(element) {
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

    const email = element.val();
    if (!emailRegex.test(email)) {
        printError(element, 'Your email is invalid');
    }
}

function valiDate(element) {
    const currentTime = new Date();
    const userDate = new Date(element.val());

    if (currentTime > userDate) {
        const age = Math.floor((currentTime - userDate) / (1000*60*60*24*365)) ;
        
        if (age < 15 || age > 55) {
            printError(element, 'Your date of birth must between 15 and 55');
        }
    } else {
        printError(element, 'Your date of birth is invalid');
    }
}

function removeElementError() {
    $(this).nextAll('.error').remove();
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
