// $('.search-button').on('click', function () {
//     $.ajax ({
//         url : 'http://www.omdbapi.com/?apikey=5dcd7a99&s=' + $('.input-keyword').val(),
//         success : result => {
//             const movies = result.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showMovieDetail(m);
//             })
//             $('.movie-container').html(cards);
//             $('.modal-detail-button').on('click', function() {
//                 $.ajax ({
//                     url : 'http://www.omdbapi.com/?apikey=5dcd7a99&i=' + $(this).data('imdbid'),
//                     success : result => {
//                         const movieDetails = detailMovie(result);
//                     $('.modal-body').html(movieDetails);
//                     },
//                     error : (eror) => {
//                         console.log(eror.responseText);
//                     }
//                 })
//             })
//         },
//         error : (eror) => {
//             console.log(eror.responseText);
//         }
//     })
// })

// fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=5dcd7a99&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movie = response.Search;
//             let cards = '';
//             movie.forEach(m => {
//                 cards += showMovieDetail(m);
//             })
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;
//             // Ketika tombol detail diklik
//             const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//             modalDetailButton.forEach( btn => {
//                 btn.addEventListener('click', function() {
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=5dcd7a99&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(result => {
//                             const movieDetail = detailMovie(result);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         })
//                 })
//             })
//         })
// })


const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
    try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
    } catch(err) {
        // console.log(err);
        alert(err);
    }
})

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=5dcd7a99&s=' + keyword)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(response => {
        if (response.Response === "False") {
            throw new Error(response.Error);
        }
        return response.Search;
    })
}

function updateUI(movie) {
        let cards = '';
        movie.forEach(m => {
            cards += showMovieDetail(m);
        })
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = cards;
}


// Event BInding
document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
})

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=5dcd7a99&i=' + imdbid)
        .then(response => response.json())
        .then(response => response)
}

function updateUIDetail(result) {
    const movieDetail = detailMovie(result);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}


function showMovieDetail(m) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><strong>Years :</strong>${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button"  data-bs-toggle="modal" data-bs-target="#movieDetailModals" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}


function detailMovie (result) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${result.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4> ${result.Title} (${result.Year})</h4></li>
                            <li class="list-group-item"><strong>Genre :</strong>${result.Genre}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${result.Actors} </li>
                            <li class="list-group-item"><strong>Director :</strong> ${result.Director}</li>
                            <li class="list-group-item"><strong>Writer :</strong> ${result.Writer}</li>
                            <li class="list-group-item"><strong>Duration :</strong> ${result.Runtime}</li>
                            <li class="list-group-item"><strong>Langguages :</strong> ${result.Language}</li>
                            <li class="list-group-item"><strong>Countries :</strong> ${result.Country}</li>
                            <li class="list-group-item"><strong>Plot :</strong> <br> ${result.Plot}</li>
                            </ul>
                    </div>
                </div>
            </div>`
}


























