//http-server -p 8000 -c-1 --cors

window.addEventListener('DOMContentLoaded', loadDropdown);

let instagramHandle = document.getElementById("instagram");
let tiktokHandle = document.getElementById("tiktok");
let partnerNames;
const error = document.getElementById("error");


async function loadDropdown() {

    const partnerSelect = document.getElementById("name-drop");

    try {
    const response = await fetch('http://localhost:8000/socials.json');
    partnerNames = await response.json();
    console.log(partnerNames); 

    partnerNames.forEach(function(partner) {
        const option = document.createElement('option');
        option.value = partner.number;
        option.textContent = partner.name;
        partnerSelect.appendChild(option);
    });
    } catch (error) {
        console.log('Error:', error);
    }

}


document.querySelector("#submit").addEventListener('click', returnSocialHandles);
document.querySelector("#name-input").addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        returnSocialHandles();
    }
});


function returnSocialHandles () {

    error.hidden = true;

    const inputValue = document.getElementById("name-input").value.toLowerCase().trim();
    const partnerMatch = partnerNames.find(p => p.name.trim().toLowerCase().includes(inputValue));

    if (inputValue) {

        if (partnerMatch) {
            instagramHandle.textContent = partnerMatch.instagram;
            tiktokHandle.textContent = partnerMatch.tiktok;
        } else {
            inputError();
        }
    }

    const selectedValue = document.getElementById("name-drop").value;
    const partner = partnerNames.find(p => p.number == selectedValue);

    if (selectedValue && !inputValue) {

        if (partner) {
            instagramHandle.textContent = partner.instagram;
            tiktokHandle.textContent = partner.tiktok;
        } else {
            inputError();
        }
    }


};

function inputError() {

    error.hidden = false;
    error.textContent = "Partner not found, check spelling or select from dropdown";
    document.getElementById("name-input").value = '';
    console.error('Partner not found');

}


