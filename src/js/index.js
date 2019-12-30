// JS imports
import {elements} from './base'

// Other imports
import "../sass/main.scss";
import $ from 'jquery';



// Mobile Nav
const closeMobileNav = () => {
    elements.mobileNav.classList.add('mobile-nav--hide');
    elements.modal.classList.add('modal--hide');
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


// Logo scroll
window.addEventListener('scroll', () => {
    const scrollAmount = document.documentElement.scrollTop;
    if (scrollAmount < 60) {
        elements.toolbar.classList.add('toolbar--top');
    } else {
        elements.toolbar.classList.remove('toolbar--top');
    };
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    const target = $($.attr(this, 'href')).offset().top - 100;
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

document.onreadystatechange = function() { 
    if (document.readyState === "complete") {
        elements.loader.style.display = 'none';
        elements.hideWrapper.style.visibility = 'visible';
        elements.hideWrapper.style.opacity = '1';
    }
}


// // Code displaying loader until the bacground image is loaded:
// const src = $('header').css('background-image');
// // Getting only url, (whole bg has also linear gradient)
// let urlSrc = src.slice(56, src.length);
// const url = urlSrc.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

// const img = new Image();
// let DOMLoadFlag = false;
// img.src = url;

// // If both image and site is ready to show:
// img.onload = function() {
//     console.log('Loaded')

//     elements.loader.style.display = 'none';
//     elements.hideWrapper.style.visibility = 'visible';
    
// }


// window.addEventListener('DOMContentLoaded', (event) => {
//     DOMLoadFlag = true;
// });

// if (img.complete && DOMLoadFlag) {
//     console.log('loaded')
//     img.onload();
// }

// Useful code elements:

// // Code displaying loader until the bacground image is loaded:
// const src = $('header').css('background-image');
// // Getting only url, (whole bg has also linear gradient)
// let urlSrc = src.slice(56, src.length);
// const url = urlSrc.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

// const img = new Image();
// const startTime = new Date();
// let DOMLoadFlag = false;
// let imageLoadFlag = false;
// img.src = url;

// // If both image and site is ready to show:
// img.onload = function() {
//     console.log('Loaded')
//     const endTime = new Date();
//     const loadTime = endTime - startTime;
//     if (loadTime < 600) {
//         elements.hidden.css('transition', 'none');
//         elements.loader.css('transition', 'none');
//     }

//     elements.headingPrimaryMain.addClass('animateLeft');
//     elements.headingPrimaryMain.css('opacity', 1);
//     elements.headingPrimarySub.addClass('animateRight');
//     elements.headingPrimarySub.css('opacity', 1);
//     elements.btnAnimation.addClass('animateBottom');
//     elements.btnAnimation.css('opacity', 1);
//     elements.hidden.css('opacity', 1);
//     elements.loader.css('opacity', 0);
    
// }

// window.addEventListener('DOMContentLoaded', (event) => {
//     DOMLoadFlag = true;
// });

// if (img.complete && DOMLoadFlag) {
//     console.log('loaded')
//     img.onload();
//     setTimeout(() => {
//         $('.loader-box').css('display', 'none');
//     }, 50);
// }


// // Function allowing 'Smooth scrolling' when link is clicked
// $(document).on('click', 'a[href^="#"]', function (event) {
//     event.preventDefault();
//     const target = $($.attr(this, 'href')).offset().top - 100;
//     $('html, body').animate({
//         scrollTop: target,
//     }, 500);
// });
