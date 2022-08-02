/// selecionar a classe//
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;


//puxar os dados da api//

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if(APIResponse.status == 200) {
        const data = await APIResponse.json();

        return(data);
    }


}

//acessar os dados e renderizar na tela//

const renderPokemon = async (pokemon) => {
    // carregamento//
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    // não achar os dados//
    if(data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;
    //esvaziar o input//
    input.value = '';
    }
    else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found ☠️'
        pokemonNumber.innerHTML = ''
    }
}

    

// enviar o formulario//
//captar os dados do input search//


form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
})

//next e prev//
buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
    
    
})
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
        
    })

renderPokemon(searchPokemon)