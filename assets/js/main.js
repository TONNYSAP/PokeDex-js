const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">
                <a class="details" onclick="myMoveFunction(${pokemon.number})">${pokemon.name}</a>
            </span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml          
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function myMoveFunction(pokID) {
    
    console.log(pokID)

    url1 = `https://pokeapi.co/api/v2/pokemon/${pokID}/`
    fetch(url1)
    .then((res) => res.json())
    .then((jsonName) => {
        console.log(jsonName.name)
        document.getElementById('numberpokemon').innerHTML = pokID
        document.getElementById('namepokemon').innerHTML = jsonName.name        
    })
    
    urlimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokID}.png`
    const imgPoke = document.getElementById('imgpokemon').setAttribute("src", urlimg);
      
    url = `https://pokeapi.co/api/v2/ability/${pokID}/`
        fetch(url)
        .then((res) => res.json() )
        .then((jsonAbil) => {
            console.log(jsonAbil)
            console.log(jsonAbil.effect_entries[0])

            // console.log(jsonAbil.name)
            // //console.log(jsonAbil.pokemon[0].pokemon.name)
            // console.log(jsonAbil.effect_entries[0].effect)
            // console.log(jsonAbil.flavor_text_entries[0].flavor_text)
            // console.log(jsonAbil.flavor_text_entries[pokID].version_group.name)
            
            document.getElementById('namepoke').innerHTML = jsonAbil.name
            document.getElementById('effectpoke').innerHTML = jsonAbil.effect_entries[0].effect
            document.getElementById('flavorpoke').innerHTML = jsonAbil.flavor_text_entries[0].flavor_text
            document.getElementById('version_grouppoke').innerHTML = jsonAbil.flavor_text_entries[pokID].version_group.name

            var elemento = document.getElementById('hidden');
            elemento.style.display = "block";
            window.scrollTo(0, 0);
        })       
}
