// Listen for Keystroke
window.addEventListener('keydown', trigger);

// Also listen for button clicks
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('click', trigger));

// Trigger audio and class activity
function trigger(event) {
    // if the event is from a keyboard input
    if (event.keyCode) {
        var audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        var button = document.querySelector(`button[data-key="${event.keyCode}"]`);
    } 
    // if the event is from a click on a valid button
    else if (this.dataset.key) {
        var audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
        var button = this;
    }
    
    if (!audio) return;

    button.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

// Cleanup after trigger
// This is used in lieu of a timeout in the trigger function. Timeout requires hardcoding a time, which could result in getting out of sync with CSS tranformation timing

keys.forEach(key => key.addEventListener('transitionend', cleanup));

function cleanup(event) {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
}

