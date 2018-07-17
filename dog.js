let btn = document.querySelector('#dogbtn')
let img = document.querySelector("#pic")

//send api request for inputted breed to disp on page
btn.addEventListener('click', e => {
    const search = document.querySelector("input")
    const breed = search.value
    if (breed == "") {
        img.innerHTML = `<p>no doggo of this type :( have random puppo:</p>`
        sendApiRequestRandom()
    }
    else {
        sendApiRequest(breed)
    }
})

//adds image to page or adds random dog to pic div
function getImageURLfrom(json) {
    if (json.status === "error") {
        img.innerHTML = `<p>no doggo of this type :( have random puppo:</p>`
        sendApiRequestRandom()
    }
    else {
        let random = Math.floor(Math.random() * json.message.length)
        let url = json.message[random]
        img.innerHTML = `<img src="${url}" alt="random dog pic"/>`
    }
}

//sends api request to get dog images for breed
function sendApiRequest(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(function(data) {
            return data.json()
        })
        .then(function(json) {
            getImageURLfrom(json)
        })
}

//adds a random dog photo to pic div
function addRandom(json) {
    let url = json.message
    img.innerHTML = img.innerHTML + `<img src="${url}" alt="random dog pic"/>`
}

//gets json w random dog pic 
function sendApiRequestRandom() {
    fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(function(data) {
            return data.json()
        })
        .then(function(json) {
            addRandom(json)
        })
}
