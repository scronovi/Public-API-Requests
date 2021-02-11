const gallery = document.getElementById('gallery');
const apiURL = 'https://randomuser.me/api/?results=12&nat=NA';

fetch(apiURL)
    .then(response => response.json())
    // .then(data => generateCard(data.results[0]));
    .then(data => {
        for(i = 0; i < 12; i += 1){
            generateCard(data.results[i]);
            modalData(data.results[i]);
        };
});

// Generate modal
function modalData(data) {
    
    // Format cell number
    let number = data.cell;
    const cleanedNumber = ('' + data.phone).replace(/\D/g, '')
    const numberRegex = /^(\d{3})(\d{3})(\d{4})$/;
    const numberMatch = cleanedNumber.match(numberRegex)
    if (numberMatch) {
        number = '(' + numberMatch[1] + ') ' + numberMatch[2] + '-' + numberMatch[3];
    }
    // Format Address
    
    const streetName = data.location.street.name;
    const streetNumber = data.location.street.number;
    const city = data.location.city;
    const postCode = data.location.postcode;
    
    address = `${streetName} ` + `${streetNumber} ` + ',' + ` ${city} ` + `${postCode}`;

    // Format birthday
    let birthday = data.dob.date;
    const birthdayChop = ('' + birthday).replace(/\D{10}/g, '')
    const bdayYear = birthdayChop.slice(0,4); 
    const bdayMonth = birthdayChop.slice(5,7); 
    const bdayDay = birthdayChop.slice(8,10); 

    let sortedBirthday = `${bdayMonth}-` + `${bdayDay}-` + `${bdayYear}`;

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
                <p class="modal-text">${number}</p>
                <p class="modal-text">${address}</p>
                <p class="modal-text">Birthday: ${sortedBirthday}</p>
            </div>
        </div>
    </div>
    `;
    gallery.insertAdjacentHTML('beforeend', generateModalHTML);
    
    // Insert eventlistener for toggling modal 
    const modalBtn = document.querySelectorAll('#modal-close-btn');
    
    modalBtn.forEach((btn) => {
        btn.addEventListener('click', (evt) => {
            // Set the style.display of modal to 'none'
            evt.currentTarget.parentNode.parentNode.style.display = 'none';
        });
    });

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
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            // Find the targeted card
            e.currentTarget.nextSibling.nextSibling.style.display = 'block';     
        });
    });
};

