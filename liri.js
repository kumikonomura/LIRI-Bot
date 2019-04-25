// activates .env file
require("dotenv").config()

const fs = require('fs')
const axios = require('axios')

// activates keys stored in keys.js file
let keys = require("./keys.js");

let [, , name, movie] = process.argv
console.log(name)

// OMDB Function
let movieThis = _ => {
axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
.then(({data}) => console.log(data))
.catch(e => console.log(e))
}
if (name === 'movieThis') {
    movieThis()
}

// spotify npm
let Spotify = require('node-spotify-api')

let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
})

let spotifyThisSong = _ => {
spotify
    .search({type: 'track', query: 'All the Small Things'})
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err)
    })
}

// Show following info about song in terminal
    // Artist
    // Song Name
    // Preview Link of song from Spotify
    // Album that song is from





