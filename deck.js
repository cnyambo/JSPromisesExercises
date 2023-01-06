let randVal = Math.floor(Math.random() * (6 - 1 + 1) + 1);
let cards =[]
let decks =[]

$(document).on('click', '#btnClick', function() { 
            let val = randVal
            axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${val}`)
            .then(p1 => {
                return axios.get(`https://deckofcardsapi.com/api/deck/${p1.data.deck_id}/draw/?count=2`);
        })
        .then(p2 => {
            let res = "";
            for (let i = 0; i < p2.data.cards.length; i++) {
                res = res + `"${p2.data.cards[i].value} of ${p2.data.cards[i].suit}"`;
                if (i != p2.data.cards.length-1 )
                    res = res+',';
                else
                    res = res +'.';   
            }
            decks.push(res);

    })
    if (decks.length==2) {
        console.log(decks)
        decks=[]
     }
    
});


$(document).on('click', '#btnGetAllClick', function() { 
    let val = randVal;
    axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${val}`)
    .then(p1 => {
        return axios.get(`https://deckofcardsapi.com/api/deck/${p1.data.deck_id}/draw/?count=1`);
    })
    .then(p2 => {
        let remaining = p2.data.remaining
    
        if (cards.indexOf(p2.data.cards[0].code) ==-1 ) {
            cards.push(p2.data.cards[0].code)
            $('.Images').prepend(`<img  src="${p2.data.cards[0].image}" />`)
            if(cards.length == remaining) {
                $("#btnGetAllClick").prop("disabled",true);
            }
        }else{
            console.log(`card ${p2.data.cards[0].code} already displayed`)
        }
    })
});
 
 
 