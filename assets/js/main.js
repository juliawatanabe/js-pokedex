const pokemonList = document.getElementById('pokemonList')
const loadButton = document.getElementById('loadMore')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokeDetailToLi(pokemon) { //in the parameter i need to select the object 'pokemon' created
    return `
        <li class="pokemon ${pokemon.type}" onclick="openPokeProfile()">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `//this will return a html manipulation
}

function loadPokemonsItems(offset, limit) { 
    pokeApi.getPokemonsApi(offset, limit)
        .then((pokemons = []) => { 
            const pokeHtml = pokemons.map(convertPokeDetailToLi).join('')
            pokemonList.innerHTML += pokeHtml
    })
} //function that will load the html manipulation inside our html

loadPokemonsItems(offset, limit) 
//i have to call the function so the html shows
//we need to define offset and limit as const/let so the code knows their value

// https://webdesign.tutsplus.com/how-to-build-flexible-modal-dialogs-with-html-css-and-javascript--cms-33500t


loadButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItems(offset, newLimit)

        loadButton.parentElement.removeChild(loadButton)
    } else {
        loadPokemonsItems(offset, limit)
    }
})
