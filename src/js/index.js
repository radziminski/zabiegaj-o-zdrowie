// JS imports
import {elements} from './base'

// Other imports
import "../sass/main.scss";
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';

// Web init
let additionalPeopleCounter = 0;

// FIREBASE config
var firebaseConfig = {
    apiKey: "AIzaSyBFTpmOR71Bej2p0iq6N8-2gFPj94Duo80",
    authDomain: "zabiegaj-o-zdrowie.firebaseapp.com",
    databaseURL: "https://zabiegaj-o-zdrowie.firebaseio.com",
    projectId: "zabiegaj-o-zdrowie",
    storageBucket: "zabiegaj-o-zdrowie.appspot.com",
    messagingSenderId: "956401714204",
    appId: "1:956401714204:web:5f1040f60269a532760bd9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messagesRef = firebase.database().ref('messages');
const firebaseAuth = firebase.auth();

// Form send listener
elements.contactForm.addEventListener('submit', event => formSubmit(event));

const formSubmit = (event) => {
    event.preventDefault();
    console.log('Form sent!');
    // Getting values:
    const firstName = getFormVal('first-name');
    const lastName = getFormVal('last-name');
    const email = getFormVal('email');
    const message = getFormVal('message');
    let additionalPeople = { };

    for (let addPeople = 0; addPeople < additionalPeopleCounter; addPeople++) {
        const addFirstName = getFormVal(`first-name-${addPeople}`);
        const addLastName = getFormVal(`last-name-${addPeople}`);
        additionalPeople[addPeople] = {
            firstName: addFirstName,
            lastName: addLastName,
        }
    };
    elements.modal.classList.remove('modal--hide');
    elements.formSend.classList.remove('u-hide');
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
        additionalPeople: additionalPeople
    })
    .then(() => {
        elements.sendMsg.classList.remove('u-hide-o');
        elements.formLoader.classList.add('u-hide');
    })
    .catch(err => {
        alert(`Nie udało się wysłać twojego zgłoszenia. Sprawdź swoje połącznie internetowe i spróbuj jeszcze raz.
        W razie kolejnych niepowodzeń skontaktuj się z nami. Błąd: ${err}`);
    })
    elements.contactForm.reset();
    
}

const getFormVal = (inputId) => {
    return document.getElementById(inputId).value;
}

elements.btnModalClose.addEventListener('click', () => {
    closeMobileNav();
}); 

elements.checkAll.addEventListener('change', () => {
    
    let flag = false;
    if (elements.checkAll.checked) {
        console.log('check')
        flag = true;
    }

    elements.allChecks.forEach(element => {
        element.checked = flag;
    })
})

// Admin - getting participants list
elements.adminDash.addEventListener('click', () => {
    const pass = window.prompt('Strona przeznaczona tylko dla administratorów. Wprowadź hasło: ');
    let peopleList = null;

    firebaseAuth.signInWithEmailAndPassword('radziminski.j@gmail.com', pass)
    .then(() => {
        messagesRef.on('value', (data) => {
            peopleList = data.val();
            let fileContent = "Imie,Nazwisko,Email,Wiadomosc\n";
            for (let person in peopleList) {
                fileContent += personToString(peopleList[person]);
            }
            fileDownload('lista_uczestnikow.txt', fileContent);
            messagesRef.off();
        }, error => {
            window.alert("There was an error downloading the list." + error);
            return;
        });
    })
    .catch( err => {
        window.alert("There was an error loggin in" + err);
        return;
    });
});

function personToString(person) {
    let retString = "";
    retString += person.firstName;
    retString += ',';
    retString += person.lastName;
    retString += ',';
    retString += person.email;
    retString += ',';
    retString += person.message;
    retString += '\n';
    if (person.additionalPeople) {
        for (let addPerson in person.additionalPeople) {
            retString += person.additionalPeople[addPerson].firstName;
            retString += ',';
            retString += person.additionalPeople[addPerson].lastName;
            retString += ',\n';
        }
    }
    return retString;
}

elements.mapOpen.addEventListener('click', () => {
    elements.map.classList.remove('u-hide');
    elements.map.style.opacity = 1;
    elements.modal.classList.remove('modal--hide');
});

elements.map.addEventListener('click', () => {
    closeMobileNav();
    elements.map.style.opacity = 0;
});

elements.addPersonBtn.addEventListener('click', () => {
    elements.morePeople.style.display = 'block';

    elements.morePeople.insertAdjacentHTML('beforeend', `
        <div class="contact-form__additional-person" id="person-${additionalPeopleCounter}">
        <h2 class="contact-form__section-title">&rarr; Dodatkowa osoba (${additionalPeopleCounter})</h2>
        <div class="contact-form__input-field">
            <label for="first-name" class="contact-form__label">Imię:</label>
            <div class="contact-form__icon-wrapper">
                <i class="contact-form__icon"><ion-icon name="person"></ion-icon></i>
            </div>
            <input type="text" class="contact-form__input-text" placeholder="Imię" id="first-name-${additionalPeopleCounter}" required>
        </div>

        <div class="contact-form__input-field">
            <label for="last-name" class="contact-form__label">Nazwisko:</label>
            <div class="contact-form__icon-wrapper">
                <i class="contact-form__icon"><ion-icon name="person"></ion-icon></i>
            </div>
            <input type="text" class="contact-form__input-text" placeholder="Nazwisko" id="last-name-${additionalPeopleCounter++}" required>
        </div>
        </div>
    `);
    elements.removePersonBtn.style.display = 'inline-block';
})

elements.removePersonBtn.addEventListener('click', () => {
    const personElement = document.getElementById(`person-${--additionalPeopleCounter}`);
    personElement.parentElement.removeChild(personElement);

    if(!additionalPeopleCounter) {
        elements.removePersonBtn.style.display = 'none';
        elements.morePeople.style.display = 'none';
    }
})

// Mobile Nav
const closeMobileNav = () => {
    elements.mobileNav.classList.add('mobile-nav--hide');
    elements.modal.classList.add('modal--hide');
    elements.formSend.classList.add('u-hide');
    elements.map.classList.add('u-hide');
    hideMenuCloseIcon();
}

const showMenuCloseIcon = () => {
    elements.menuIcon.classList.add('icon-hide');
    elements.menuIconClose.classList.remove('icon-hide');
}

const hideMenuCloseIcon = () => {
    elements.menuIcon.classList.remove('icon-hide');
    elements.menuIconClose.classList.add('icon-hide');
}

elements.menuIconClose.addEventListener('click', closeMobileNav);
elements.menuIconCloseSmall.addEventListener('click', closeMobileNav);

elements.menuIcon.addEventListener('click', () => {
    elements.mobileNav.classList.remove('mobile-nav--hidden');
    elements.mobileNav.classList.remove('mobile-nav--hide');
    elements.modal.classList.remove('modal--hide');
    showMenuCloseIcon();
});

elements.modal.addEventListener('click', closeMobileNav);

elements.mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
})

// Toolbar updates
const updateToolbar = () => {
    const scrollAmount = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    if (scrollAmount < 100) {
        elements.toolbar.classList.add('toolbar--top');
    } else {
        elements.toolbar.classList.remove('toolbar--top');
    };
}

// Load
window.addEventListener('load', () => {
    updateToolbar();
});


// Logo scroll
window.addEventListener('scroll', updateToolbar);


$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    const scrollOffset = (($(window).height() - $('.toolbar').outerHeight() - $($.attr(this, 'href')).outerHeight()) / 2);
    let target = $($.attr(this, 'href')).offset().top - scrollOffset - $('.toolbar').outerHeight();
    if (scrollOffset <= 0) target = $($.attr(this, 'href')).offset().top - $('.toolbar').outerHeight();
    $('html, body').animate({
        scrollTop: target,
    }, 500);
});

elements.logo.addEventListener('click', () => {
    if (document.documentElement.scrollTop !== 0) {
        $('html, body').animate({
            scrollTop: 0,
        }, 500);
    }
})

// Loader hide/show
document.onreadystatechange = function() { 
    if (document.readyState === "complete") {
        elements.loader.style.display = 'none';
        elements.hideWrapper.style.visibility = 'visible';
        elements.hideWrapper.style.opacity = '1';
    }
}

// Downloading list
function fileDownload(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }