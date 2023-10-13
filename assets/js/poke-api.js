const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){ //pokeDetails is only a name i gave to the object we are working
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id 
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitiesName) => abilitiesName.ability.name)
    const [ability] = abilities
    // i need to map the abilities to select only the name from each ability 
    //and the ability is interpreted like an item from the array 'abilities'

    pokemon.abilities = abilities
    pokemon.ability = ability

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon //returns pokemon with selected details

}

function openPokeProfile() { //function to open the profile with selected informations from poke-api
    window.location.href('profile.html')
} 

pokeApi.getPokemonDetailsApi = (pokemon) => { //this function will only work putting it inside the function that takes the pokemons from the api (the parameter i put here is the name i chose for the object we are using)
    return fetch(pokemon.url) //because it will fetch the data from the url inside each item in the list of pokemons`
        .then((response) => response.json())//select the json part inside each 'url' element in the pokemon list, but i need to select specific details from the pokemons
        .then(convertPokeApiDetailToPokemon) //calling this function will then select the specific details i want inside each pokemon url
} //it needs to return so when we call this function it will return the promise (only works like that)

pokeApi.getPokemonsApi = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((Response) => Response.json())
        .then((jsonBody) => jsonBody.results) //select the 'results' part in the json we took from the api
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetailsApi)) //'pokemons' would be a new name i gave to the 'results', the map() method will map our pokemons(results) based on the parameters i put inside it, in this case i will ask it to map(look for) the url inside each item
        //this will transform it into a new promise list 
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => pokemonDetails)
} //it needs to return so when we call this function it will return the promise (only works like that)
