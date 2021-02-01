const gallery = document.getElementById('gallery');
const apiURL = 'https://randomuser.me/api/?results=NA';
let fetchResult = []


function fetchData(apiURL){
    return fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            generateCard(data[0].results);
        })
}


function generateCard(data){
    
    const htmlString = 
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src='${data.picture.thumbnail}' alt="profile picture">
    </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>`;

    // Generate HTML
    gallery.insertAdjacentHTML('beforeend', htmlString);

    // Insert eventlistener


};

console.log(fetchData());

/* function generateModal(data){

    // Generate HTML
    const buildModal = () => {
        const generateModalHTML = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${profilePicture}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${address}</p>
                <p class="modal-text">Birthday: ${birthday}</p>
            </div>
        </div>   
        `
        gallery.insertAdjacentHTML('afterend', generateModalHTML);
        document.querySelector('.modal-container').style.display = 'none';    
    }
} */

