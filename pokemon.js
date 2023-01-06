//1. Further Study Q1 and Q2

axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
.then(res => {
    response = []
    for (let i = 0; i< res.data.count; i++) {
        const pokemon = {'name': res.data.results[i].name, 'url': res.data.results[i].url};
        response.push(pokemon)
    } 
    for (let i = 0; i < 3; i++) {
        let randVal = Math.floor(Math.random() * (res.data.count) );
        axios.get(response[randVal].url)
        .then(p2 => {
            console.log(p2.data)
        });
        
    }
 
})


//Father Study Q3 and Q4

$(document).on('click', '#btnGetPokemonClick', function() { 
    const container = document.getElementById('pokemon');
    container.textContent = '';
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then(res => {
        response = []
        threePokemonPromises = []

        for (let i = 0; i< res.data.count; i++) {
            const pokemon = {'name': res.data.results[i].name, 'url': res.data.results[i].url};
            response.push(pokemon)
        } 
        
        for (let i = 1; i <= 3; i++) {
            
            let randVal = Math.floor(Math.random() * (res.data.count))
            let name = response[randVal].name
            threePokemonPromises.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            ); 
        }

        Promise.all(threePokemonPromises)
        .then(pokemonArr => (
            pokemonArr.forEach(function(p) {
               
                    const res = p.data.flavor_text_entries.find(element => {
                        return element.language.name  == 'en';
                      });
                                     
                    $(`.row`).prepend(`<div class="col-sm md-12 border border-secondary">
                    <h2>${p.data.name}</h2>
                    <p>${res.flavor_text}</p>
                    </div>`) ;   
            })
        ))
        .catch(err => console.log(err));

    })
});