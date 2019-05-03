// activates .env file
require("dotenv").config()
// this allows us to use the node js module
const fs = require('fs')

const axios = require('axios')

// activates keys stored in keys.js file
const keys = require("./keys.js");

const Spotify = require('node-spotify-api')

let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
})

const moment = require('moment')

let [, , action, title] = process.argv
console.log(action)

// OMDB Function
let movieThis = _ => {
    if (title === undefined) {
        title = "Mr. Nobody"
    }
    axios.get(`http://www.omdbapi.com/?t=${title}&apikey=trilogy`)
        .then(d => {
            // console.log(d)
            console.log(`
            Title: ${d.data.Title}
            Year: ${d.data.Year}
            IMDB Rating: ${d.data.imdbRating}
            Country: ${d.data.Country}
            Language: ${d.data.Language}
            Actors: ${d.data.Actors}
            Plot: ${d.data.Plot}
            `)
        })
        .catch(e => console.log(e))
} 

if (action === 'movieThis') {
    movieThis()
}

// Spotify Function
let spotifyThisSong = _ => {
    if (title === undefined) {
        title = "The Sign Ace of Base"
        // return "The Sign by Ace of base"
    }
    console.log(title)
    spotify.search({type: 'track', query: `${title}`, limit: 1})
        .then(r => {
            // console.log(r.tracks.items[0].type)
            // console.log(r.tracks.items[0].artists[0].name)
            // console.log(r.tracks.items[0].name)
            // console.log(r.tracks.items[0].external_urls.spotify)
            // console.log(r.tracks.items[0].album.name)
            console.log(`
            Artist: ${r.tracks.items[0].artists[0].name}
            Song: ${r.tracks.items[0].name}
            Preview Link: ${r.tracks.items[0].external_urls.spotify}
            Album: ${r.tracks.items[0].album.name}
            `)
        })
        .catch(e => console.log(e))
}

if (action === 'spotifyThisSong') {
    spotifyThisSong()
}

// Band is Town Function
let concertThis = _ => {
    axios.get(`https://rest.bandsintown.com/artists/${title}/events?app_id=codingbootcamp`)
    .then(r => {
        // console.log(r.data[0].venue.name)
        // console.log(r.data[0].venue.city, r.data[0].venue.country)
        // console.log(r.data[0].datetime)
        console.log(`
        Venue: ${r.data[0].venue.name}
        Location: ${r.data[0].venue.city, r.data[0].venue.country}
        Event Date: ${moment(`${r.data[0].datetime}`).format('MMMM DD, YYYY')}
        `)
    })
    .catch(e => console.log(e))
} 

if (action === 'concertThis') {
    concertThis()
}
// Do What It Says Function
let doWhatItSays = _ => {
    fs.readFile('./random.txt', 'utf8', (e, data) => {
        if(e) throw e
        console.log(data.toString())
    if(action === 'spotifyThisSong') {
        spotifyThisSong()
    }
    })
}



