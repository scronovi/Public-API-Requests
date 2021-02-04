const gallery = document.getElementById('gallery');
const apiURL = 'https://randomuser.me/api/';
let fetchResult = []

for (i = 0; i < 12; i += 1){
    fetch(apiURL)
        .then(response => response.json())
        // .then(data => generateCard(data.results[0]));
        .then(data => {
            generateCard(data.results[0]);
            modalData(data.results[0]);
        })
};

// Generate modal AND hide it
function modalData(data) {
    const generateModalHTML = 
    `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    gallery.insertAdjacentHTML('beforeend', generateModalHTML);
    
    const modalContainers = gallery.querySelectorAll('.modal-container');
    modalContainers.forEach((modalContainer) => {
        modalContainer.style.display = 'none';
    });
    
    // Insert eventlistener for toggling modal 


};

function generateCard(data){

    // Generate card
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
    gallery.insertAdjacentHTML('beforeend', htmlString);

    // add event listener for showing modal window
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            console.log(e.target);
            const modalContainers = gallery.querySelectorAll('.modal-container');
            modalContainers.style.display = '';
        });
    });
};

