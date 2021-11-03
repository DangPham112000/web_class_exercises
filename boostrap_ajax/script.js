var API = `https://reqres.in/api/users?per_page=2&page=1`;

async function callAPI(page) {
    const resJSON = await fetch(`https://reqres.in/api/users?per_page=2&page=${page}`);
    const res = await resJSON.json();

    loadPage(res);
}

$().ready(() => {
    callAPI(1);
});

function loadPage(res) {
    const users = res.data;
    const numPage = res.total / res.per_page;

    $('tbody').html(users.map(user =>
        `        
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td><img src="${user.avatar}" class="img-thumbnail" alt="${user.first_name} avatar"></td>
            </tr>
        `
    ).join(''));

    let pageNumHtml = '';

    for (let i=0; i<numPage; i++) {
        pageNumHtml += (res.page === (i+1)) 
            ? `<li class="page-item active" aria-current="page"><a class="page-link num">${i+1}</a></li>`
            : `<li class="page-item"><a class="page-link num">${i+1}</a></li>`;
    }

    $('.pagination').html(`
            <li class="page-item cursor-pointer">
                <a class="page-link" aria-label="Previous" id="prev">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${pageNumHtml}
            <li class="page-item cursor-pointer">
                <a class="page-link" aria-label="Next" id="next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
    `);

    $('.num').click(function() {
        callAPI($(this).text());
    });

    $('#prev').click(function() {
        if (res.page > 0) {
            callAPI(res.page - 1);
        }
    });

    $('#next').click(function() {
        if (res.page < numPage) {
            callAPI(res.page + 1);
        }
    });
}
