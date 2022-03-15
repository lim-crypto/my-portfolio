const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');

function hideSidebar(){
    menu.classList.toggle("change");
    nav.classList.toggle("change");
}
function headercolor() {

    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        nav.style.backgroundColor="rgba(0, 0, 0, 0.9)";
      } else {
        nav.style.backgroundColor="rgba(0,0, 0, 0.309)";
      }
}

menu.addEventListener('click',  hideSidebar);
window.addEventListener('scroll',
    function() {
        headercolor();
        menu.classList.remove('change');
        nav.classList.remove('change');
    });


var links = document.getElementsByClassName('nav-link');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        hideSidebar();
    });
}




//

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        //get current index of word
        const current = this.wordIndex % this.words.length;
        // get full text of current word
        const fullTxt = this.words[current];
        // check if deleting
        if (this.isDeleting) {
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);

        } else {
            // add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        //  insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //initial type speed
        let typeSpeed =300;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        // if word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // make pause
            typeSpeed = this.wait;
            //  set delete to true
            this.isDeleting = true;

        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // move to next word
            this.wordIndex++;
            //pause before start typing
            typeSpeed = 100;
        }
        //
        setTimeout(() => this.type(), typeSpeed);
    }
}

// init on dom load
document.addEventListener('DOMContentLoaded', init);
// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // init typewriter
    new TypeWriter(txtElement, words, wait);
}
