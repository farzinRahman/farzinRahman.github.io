// PSEUDO CODE:
const ketchumApp = {};

// define an array for the options in the select dropdown
    // this could be done with an ajax request to the api, but since multiple ajax requests are already being sent, opted to hard-code this data in an array instead
ketchumApp.optionsArray = [
    {text: "water", value: "water"},
    {text: "flying", value: "flying"},
    {text: "grass", value: "grass"},
    {text: "fire", value: "fire"},
    {text: "fighting", value: "fighting"},
    {text: "ground", value: "ground"},
    {text: "rock", value: "rock"},
    {text: "psychic", value: "psychic"},
    {text: "fairy", value: "fairy"},
    {text: "normal", value: "normal"},
    {text: "bug", value: "bug"},
    {text: "dark", value: "dark"},
    {text: "ghost", value: "ghost"},
    {text: "ice", value: "ice"},
    {text: "electric", value: "electric"},
    {text: "dragon", value: "dragon"},
    {text: "steel", value: "steel"},
    {text: "poison", value: "poison"},
]

// define a method that adds the options in the select dropdown using the optionsArray
ketchumApp.appendOptionsArray = function(array) {
    array.forEach(function(optionsObject) {
        ketchumApp['$select'].append(`<option value="${optionsObject.value}">${optionsObject.text}</option>`)
    });
}

// define a method that generates a random number between 1 to 400 to be used in the ajax requests
ketchumApp.randomNumberGenerator = function() {
    return Math.floor(Math.random() * 450);
}

// define a method to append the pokemon sprites to the page
ketchumApp.appendSprites = function(spriteContainer, promiseObject) {
    $(spriteContainer).append(`<img src="${promiseObject.sprites.other.dream_world.front_default}" alt="${promiseObject.name}"></img>`);
}

ketchumApp.firstPokemonTypesArray = [];
ketchumApp.secondPokemonTypesArray = [];
ketchumApp.thirdPokemonTypesArray = [];

// define a method which will make the ajax requests to the poke API once the document is ready
ketchumApp.fetchFirstRandomPokemon = function(spriteContainer, randomNumber) {
    // set up the ajax request
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
        method: 'GET',
        dataType: 'json'
    }).then(function(pokemonApiData) {
        ketchumApp.appendSprites(spriteContainer, pokemonApiData);

        const finalTypeArray = pokemonApiData.types.map(function(value) {
            return value.type.name;
        })

        ketchumApp.firstPokemonTypesArray = finalTypeArray;
        // console.log(ketchumApp.firstPokemonTypesArray);
    })
}

ketchumApp.fetchSecondRandomPokemon = function(spriteContainer, randomNumber) {
    // set up the ajax request
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
        method: 'GET',
        dataType: 'json'
    }).then(function(pokemonApiData) {
        ketchumApp.appendSprites(spriteContainer, pokemonApiData);

        const finalTypeArray = pokemonApiData.types.map(function(value) {
            return value.type.name;
        })

        ketchumApp.secondPokemonTypesArray = finalTypeArray;
        // console.log(ketchumApp.secondPokemonTypesArray);
    })
}

ketchumApp.fetchThirdRandomPokemon = function(spriteContainer, randomNumber) {
    // set up the ajax request
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
        method: 'GET',
        dataType: 'json'
    }).then(function(pokemonApiData) {
        ketchumApp.appendSprites(spriteContainer, pokemonApiData);

        const finalTypeArray = pokemonApiData.types.map(function(value) {
            return value.type.name;
        })

        ketchumApp.thirdPokemonTypesArray = finalTypeArray;
        // console.log(ketchumApp.thirdPokemonTypesArray);
    })
}

// define a setupEventListeners method
ketchumApp.setupEventListenerOne = function() {
    let count = 0;
    ketchumApp['$counter'].text(count);
    ketchumApp['$form'].on('submit', function(event) {
        event.preventDefault();
        // save the player's choices in the variables
        ketchumApp.firstTypeChoice = $('#first-pokemon-type').val();
        ketchumApp.secondTypeChoice = $('#second-pokemon-type').val();
        ketchumApp.thirdTypeChoice = $('#third-pokemon-type').val();

        if (ketchumApp.firstTypeChoice == null || ketchumApp.secondTypeChoice == null || ketchumApp.thirdTypeChoice == null) {
            alert("Select an option for all 3 Pokemon before submitting!")
        } else {
            const userFirstTypeChoice = ketchumApp.firstTypeChoice;
            const userSecondTypeChoice = ketchumApp.secondTypeChoice;
            const userThirdTypeChoice = ketchumApp.thirdTypeChoice;
            // console.log(userFirstTypeChoice, userSecondTypeChoice, userThirdTypeChoice);

            if (userFirstTypeChoice == ketchumApp.firstPokemonTypesArray[0] || userFirstTypeChoice == ketchumApp.firstPokemonTypesArray[1]) {
                // console.log("First one is right!");
                ketchumApp['$spriteContainerOne'].empty();
                ketchumApp['$spriteContainerOne'].append(`<i class="fa-solid fa-check"></i>`);
                ketchumApp['$counter'].text(count+=1);
            } else {
                // console.log("WRONG");
                ketchumApp['$spriteContainerOne'].empty();
                ketchumApp['$spriteContainerOne'].append(`<i class="fa-solid fa-xmark"></i>`);
            }

            if (userSecondTypeChoice == ketchumApp.secondPokemonTypesArray[0] || userSecondTypeChoice == ketchumApp.secondPokemonTypesArray[1]) {
                // console.log("Second one is right!");
                ketchumApp['$spriteContainerTwo'].empty();
                ketchumApp['$spriteContainerTwo'].append(`<i class="fa-solid fa-check"></i>`);
                ketchumApp['$counter'].text(count+=1);
            } else {
                // console.log("WRONG");
                ketchumApp['$spriteContainerTwo'].empty();
                ketchumApp['$spriteContainerTwo'].append(`<i class="fa-solid fa-xmark"></i>`);
            }

            if (userThirdTypeChoice == ketchumApp.thirdPokemonTypesArray[0] || userThirdTypeChoice == ketchumApp.thirdPokemonTypesArray[1]) {
                // console.log("Third one is right!");
                ketchumApp['$spriteContainerThree'].empty();
                ketchumApp['$spriteContainerThree'].append(`<i class="fa-solid fa-check"></i>`);
                ketchumApp['$counter'].text(count+=1);
            } else {
                // console.log("WRONG");
                ketchumApp['$spriteContainerThree'].empty();
                ketchumApp['$spriteContainerThree'].append(`<i class="fa-solid fa-xmark"></i>`);
            }
            // show the button that can be used to generate more random pokemon, i.e., make more ajax requests
            ketchumApp['$playAgain'].toggleClass('hide');
            // set the option to the default one
            ketchumApp['$select'].val('no-value');
            // hide the form so the player can't resubmit their answer until generating more pokemon
            ketchumApp['$form'].toggleClass('hide');
        }
    })  
}

ketchumApp.setupEventListenerTwo = function() {
    ketchumApp['$playAgain'].on('click', function() {
        // alert('Are you sure you want to play again?');
        // empty the sprite containers
        $('.poke-container').empty();
        ketchumApp.fetchFirstRandomPokemon('.sprite-container-one', ketchumApp.randomNumberGenerator());
        ketchumApp.fetchSecondRandomPokemon('.sprite-container-two', ketchumApp.randomNumberGenerator());
        ketchumApp.fetchThirdRandomPokemon('.sprite-container-three', ketchumApp.randomNumberGenerator());
        // hide the play again button, so the player has to play first before the button comes back again
        ketchumApp['$playAgain'].toggleClass('hide');
        ketchumApp['$form'].toggleClass('hide');
    })
}

// define an initialization method, init()
ketchumApp.init = function() {
    // console.log("The app has been initialized")
    // cache jQuery selectors:
    ketchumApp['$select'] = $('select');
    ketchumApp['$playAgain'] = $('.play-again');
    ketchumApp['$form'] = $('form');
    ketchumApp['$spriteContainerOne'] = $('.sprite-container-one');
    ketchumApp['$spriteContainerTwo'] = $('.sprite-container-two');
    ketchumApp['$spriteContainerThree'] = $('.sprite-container-three');
    ketchumApp['$counter'] = $('.counter');

    ketchumApp.appendOptionsArray(ketchumApp.optionsArray);
    ketchumApp.fetchFirstRandomPokemon('.sprite-container-one', ketchumApp.randomNumberGenerator());
    ketchumApp.fetchSecondRandomPokemon('.sprite-container-two', ketchumApp.randomNumberGenerator());
    ketchumApp.fetchThirdRandomPokemon('.sprite-container-three', ketchumApp.randomNumberGenerator());
    
    // // call the event listener methods on initialization
    ketchumApp.setupEventListenerOne();
    ketchumApp.setupEventListenerTwo();
}


// document ready
$(function() {
    // call the init method within the document ready function
    ketchumApp.init();
})