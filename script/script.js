const cardsContainer = document.querySelector("#cardsContainer")
const paginationButtons = document.querySelector("#paginationButtons")
const searchParams = new URLSearchParams(window.location.search);
let currentPage = searchParams.get('page')
let currentPageInteger = parseInt(currentPage)
const charactersData = `https://rickandmortyapi.com/api/character?page=${currentPageInteger}`

function displayCharacter(characters) {
    console.log(characters);
    for (let character of characters) {
        let html = `
        <div class="card m-4 col-12 col-md-3">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h2 class="card-title">${character.name}</h2>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#character${character.id}">En savoir plus</button>
            </div>
        </div>

        <div class="modal fade" id="character${character.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLabel">Fiche du personnage</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${character.name}</p>
              <p>${character.gender}</p>
              <p>${character.species}</p>
              <p>${character.status}</p>
              <p>Apparait ${character.episode.length} fois
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
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
    <button class="page-link" name="page" value="${currentPageInteger}">${currentPageInteger}</button>
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
