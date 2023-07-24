function makeRequest(url) {
  return new Promise(function(resolve, reject) {
    
    const xhr = new XMLHttpRequest();
  
    xhr.open("GET", url);

    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error('Errore durante la richiesta'))
      }
    }

    xhr.onerror = function() {
      reject(new Error('Errore di rete'))
    }

    xhr.send()
    
  })
}

// const url1 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem"
// const url2 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica"
// const url3 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"

// makeRequest(url1)
//     .then(function (response) {
//         const res1 = JSON.parse(response)
//         console.log("res1", res1);
//         return makeRequest(url2)
//     })
//     .then(function(response){
//         const res2 = JSON.parse(response)
//       //  console.log("res2", res2);
//         return makeRequest(url3)
//     })
//     .then(function(response){
//         const res3 = JSON.parse(response)
//       //  console.log("res3", res3);
        
//     })

//     .catch(function(error){
//         console.log("errore", error);
//     }) 


 //   const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem';

   // Funzione per ottenere i dati degli album tramite chiamata fetch
function fetchAlbumData(artist) {
    const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
    return fetch(albumUrl)
      .then(response => response.json())
      .then(data => data.data)
      .catch(error => {
        console.error('Errore durante la richiesta dei dati:', error);
        throw error; // Rilanciamo l'errore per gestirlo più avanti, se necessario
      });
  }
  
      // Funzione per costruire le card degli album per un artista
      function buildArtistCards(artist, albums) {
        const sectionId = `${artist.toLowerCase()}Section`;
        const artistSection = document.getElementById(sectionId);
  
        let albumCardsHTML = '';
        for (const album of albums) {
          const albumTitle = album.album.title;
          const albumCover = album.album.cover;
          const artistName = artist;
          const songTitle = album.title;
  
          // Costruiamo il contenuto della card utilizzando le classi di Bootstrap
          albumCardsHTML += `
            <div class="col">
              <div class="card">
                <img src="${albumCover}" class="card-img-top img-fluid" alt="Album Cover">
                <div class="card-body">
                  <h5 class="card-title">Album: ${albumTitle}</h5>
                  <p class="card-text card-artist">Artist: ${artistName}</p>
                  <p class="card-text card-song">Song: ${songTitle}</p>
                </div>
              </div>
            </div>
          `;
        }
  
        artistSection.innerHTML = albumCardsHTML;
      }
  
      // Funzione per raccogliere tutti i titoli degli album e visualizzarli nella modale
       function showAlbumList(artist, albums) {
        const albumListModalTitle = document.getElementById('exampleModalLabel');
        albumListModalTitle.textContent = `${artist} - Album Titles`;

        const albumList = document.getElementById('albumList');
        albumList.innerHTML = ''; // Reset della lista degli album
  
        for (const album of albums) {
          const albumTitle = album.album.title;
          const li = document.createElement('li');
          li.textContent = albumTitle;
          li.classList.add('list-group-item');
          albumList.appendChild(li);
        }
  
        // Mostrare la modale
        /* const albumListModalInstance = new bootstrap.Modal(document.getElementById('exampleModal'));
        albumListModalInstance.show(); */
      } 
  
      // Chiamare la funzione per ottenere e visualizzare gli album per Eminem
      fetchAlbumData('eminem')
        .then(albums => buildArtistCards('Eminem', albums))
        .catch(error => console.error('Errore durante il recupero dei dati di Eminem:', error));
  
      // Chiamare la funzione per ottenere e visualizzare gli album per Metallica
      fetchAlbumData('metallica')
        .then(albums => buildArtistCards('Metallica', albums))
        .catch(error => console.error('Errore durante il recupero dei dati di Metallica:', error));
  
      // Chiamare la funzione per ottenere e visualizzare gli album per Queen
      fetchAlbumData('queen')
        .then(albums => buildArtistCards('Queen', albums))
        .catch(error => console.error('Errore durante il recupero dei dati di Queen:', error));
  
   