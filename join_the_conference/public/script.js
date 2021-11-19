// $(document).ready(() => {
//     $('#form-regis').on('submit', function(e) {
//         e.preventDefault();
        
//         let fullname = $('#fullname').val();
//         let email = $('#email').val();
//         let phone = $('#phone').val();

//         $.ajax({
//             url: "/saveinfor",
//             method: "POST",
//             contentType: "application/json",
//             data: JSON.stringify({ fullname, email, phone })
//         }).done(function(res) {
//             $('#result').attr("href", `/feedback?fullname=${res.fullname}&email=${res.email}&phone=${res.phone}`);
//             $('#result')[0].click();
//         })
//     })

// });
