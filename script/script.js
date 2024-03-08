const cardsContainer = document.querySelector("#cardsContainer")
const paginationButtons = document.querySelector("#paginationButtons")
const searchParams = new URLSearchParams(window.location.search);
let currentPage = searchParams.get('page')
let currentPageInteger = parseInt(currentPage)
const charactersData = `https://rickandmortyapi.com/api/character?page=${currentPage}`

function displayCharacter(characters) {
    console.log(characters);
    for (let character of characters) {
        let html = `
        <div class="card m-4 col-12 col-md-3">
        <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h2 class="card-title">${character.name}</h2>
                <p class="card-text">text</p>
                <a href="#" class="btn btn-primary">En savoir plus</a>
            </div>
        </div>
        `
        cardsContainer.innerHTML += html
    }

}

function pagination(records) {
    lastPage = records.pages
    console.log(lastPage);
    let html = `
    <button class="page-link" name="page" value="1">Première page (1)</button>
    <button class="page-link" name="page" value="${currentPageInteger - 1}" ${records.previous === null ? 'disabled' : ''}>Previous</button>
    <button class="page-link" name="page" value="${currentPage}">${currentPage}</button>
    <button class="page-link" name="page" value="${currentPageInteger + 1}" ${records.next === null ? 'disabled' : ''}>Next</button>
    <button class="page-link" name="page" value="${lastPage}">Dernière page (${lastPage})</button>
        `
    paginationButtons.innerHTML += html
}

fetch(charactersData)
    .then(res => res.json())
    .then(o => {
        displayCharacter(o.results)
        pagination(o.info)
    })
    .catch(console.error)




// fetch("https://rickandmortyapi.com/api/character?page=" + page)
//     .then(res => res.json())
//     .then(o => {
//         display(o.results)
//         pagination(o.info)
//     })
//     .catch(console.error)