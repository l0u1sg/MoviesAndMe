const config = require('../private.json')

const API_TOKEN = config.API_TOKEN

export function getFilmsFromApiWithSearchedText(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error))
}