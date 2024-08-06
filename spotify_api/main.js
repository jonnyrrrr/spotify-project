//  Declorabtions for song variables
let song;
let playSong;

//Spotify client song creds
const clientId ="a3304308e4a04855a0544fcf3cd815cd";
const clientSecret ="b1b24bddaafc440cbe0fa202c519e4c3";

//The steps taken to receive and hide authentication for users

const _getToken = async () => {
    const result =  await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token
}

//Function to play song when image is clicked
/** 
* @param img_index
* @param item_index
*/

async function clickedEvent(img_index, item_index) {
    //get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;

    //get token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ])

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    })

    let result = await fetch(request);

    let response = await result.json();

    console.log(response);

    let song = response.tracks.items[item_index].preview_url
    
    //check if song is playinh then stop it
    if (playSong) {
        stopSnippet()
    }
    songSnippet(song)
}

/** 
 * @param event 
 * @param id
 */

function getSong(id, event) {
    switch(id){
        case 'fig1' : { //me
            event.stopPropagation();
            clickedEvent(0,0)
            break;
        }
       case 'fig2' : {
        event.stopPropagation();
        clickedEvent(1,0)
        break;
       }
       case 'fig3' : {
        event.stopPropagation();
        clickedEvent(2,0)
        break;
       }
       case 'fig4' : {
        event.stopPropagation();
        clickedEvent(3,0)
        break;
       }
       case 'fig5' : {
        event.stopPropagation();
        clickedEvent(4,0)
        break;
       }
       case 'fig6' : {
        event.stopPropagation();
        clickedEvent(5,0)
        break;
       }
       
    }
}

/** 
 * @param url
 * function will return audio clip given by the preview url
*/

function songSnippet(url) {
    playSong = new Audio(url)
    return playSong.play()
}

//Function returns event to stop song snippet

function stopSnippet(){
    return playSong.pause()
}