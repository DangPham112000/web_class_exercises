const APIKEY = 'k_z3klc684';
function getData(ajaxurl) { 
    return $.ajax({
        url: ajaxurl,
        type: 'GET',
    });
};

async function loadAPI(API) {
    try {
        const res = await getData(API);
        
        // console.log(res);
        if (res.items) 
            renderMovies(res.items, 1);
        else if (res.results)
            renderMovies(res.results, 1);
        else if (res) {
            renderMovie(res);
        }
        
    } catch(err) {
        console.log(err);
    }
}

$().ready(() => {
    const defaultAPI = `https://imdb-api.com/en/API/InTheaters/${APIKEY}`;
    loadAPI(defaultAPI)
});

function renderMovies(movies, page) {
    const html = movies.map((movie, index) => {
        if (index < (page * 3) && index >= ((page - 1) * 3)) {
            if (index % 3 === 0 || index === 0) {
                return `  
                <div class="row mt-4">           
                    <div class="col-4">
                        <div class="card h-100 movie-card" id="${movie.id}">
                            <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                            <div class="card-body">
                                <h5 class="card-title">${movie.fullTitle || movie.title}</h5>
                                <p class="card-text">${movie.plot || movie.description}</p>
                                <a href="#" class="btn btn-primary">Watch</a>
                            </div>
                        </div>
                    </div>
                `;
            } else if ((index + 1) % 3 === 0) {
                return `  
                    <div class="col-4">
                        <div class="card h-100 movie-card" id="${movie.id}">
                            <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                            <div class="card-body">
                                <h5 class="card-title">${movie.fullTitle || movie.title}</h5>
                                <p class="card-text">${movie.plot || movie.description}</p>
                                <a href="#" class="btn btn-primary">Watch</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            } else {
                return `  
                    <div class="col-4">
                        <div class="card h-100 movie-card" id="${movie.id}">
                            <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                            <div class="card-body">
                                <h5 class="card-title">${movie.fullTitle || movie.title}</h5>
                                <p class="card-text">${movie.plot || movie.description}</p>
                                <a href="#" class="btn btn-primary">Watch</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }).join('');

    $("#body-container").html(html);

    let pageNumHtml = '';
    const numPage = movies.length/3;

    for (let i=0; i<numPage; i++) {
        pageNumHtml += (page === (i+1)) 
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
        renderMovies(movies, $(this).text());
    });

    $('#prev').click(function() {
        if (page > 0) {
            renderMovies(page - 1);
        }
    });

    $('#next').click(function() {
        if (page < numPage) {
            renderMovies(page + 1);
        }
    });

    
    $(".movie-card").click(function() {
        loadMovie($(this).attr("id"));
    })
}

//  Search movie by name
$("#search-btn").click(function() {
    const searchAPI = `https://imdb-api.com/en/API/SearchTitle/${APIKEY}/`;
    const textSearch = $("#search-text").val();
    loadAPI(searchAPI + textSearch);
})

//  Search movie by actor name
$("#search-btn-actor").click(function() {
    const searchAPI = `https://imdb-api.com/en/API/SearchName/${APIKEY}/`;
    const textSearch = $("#search-text-actor").val();
    loadAPI(searchAPI + textSearch);
})

function loadMovie(movieID) {
    const API = `https://imdb-api.com/en/API/Title/${APIKEY}/${movieID}/FullActor,Images,Ratings,`;
    loadAPI(API);
}

function renderMovie(movie) {    
    const startListHtml = movie.starList.map(actor => `
        <li id="${actor.id}">${actor.name}</li>
    `).join('');
    const html = `
        <div class="card movie-info px-4 py-4">
            <div class="row">
                <div class="col">
                    <h2 class="card-title">${movie.fullTitle}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <img src="${movie.image}" class="img-fluid" alt="${movie.fullTitle}"/>
                </div>
                <div class="col-8">
                    <div class="row">
                        <div class="col">
                            <h3 class="card-title">Plot</h3>
                            <p class="card-text">
                                ${movie.plot}
                            </p>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <h3 class="card-title">Stars</h3>
                            <ul>
                                ${startListHtml}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    $("#body-container").html(html);
    $('.pagination').html('');
}