let num =5;


//Part 1: Number Facts
//=====================

// 1 . get a fact about your favorite number
$.getJSON('http://numbersapi.com/random/year?json', function(data) {
    console.log("Text: " + data.text);
    console.log("Number: " +data.number);
    console.log("Type: " +data.type);
});

// 2. get data on multiple numbers in a single request

$.getJSON('http://numbersapi.com/1..'+num+'/math', function(data) {
    for (let i = 1; i <= num; i++) {
        console.log(data[i]);
    }
    
});

// 3. get 4 facts on your favorite number.

let favoriteNumbers = [20,5,25,30];

for (let i = 0; i < favoriteNumbers.length; i++){
    $.getJSON('http://numbersapi.com/'+favoriteNumbers[i]+'/math?json', function(data) {
        const listVal =  '<li>' + data.text + '</li>';
        $('.List').append(listVal);
        console.log(data);
    } );   
}


