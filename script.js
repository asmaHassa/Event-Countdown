document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.content-box').classList.add('active');
});


document.getElementById('start-button').addEventListener('click', function() {
    var inputDate = document.getElementById('date-to').value;
    var inputTime = document.getElementById('time-to').value;
    var eventDescription = document.getElementById('event').value;

    var currentDate = new Date();
    var currentDateString = currentDate.toISOString().slice(0, 10);

    // checking if input date is empty
    if (inputDate === "") {
        alert("Please enter a valid date.");
        return; 
    }

    // checking input date and time
    var inputDateTime = new Date(inputDate + 'T' + inputTime + ':00');
    if (inputDateTime <= currentDate) {
        alert("Please enter a future date and time.");
        return; 
    }

    // if user doesn't enter in event description, we ask to make sure
    if (eventDescription === "") {
        var confirmMessage = "No event description entered. Do you wish to continue?";
        if (!confirm(confirmMessage)) {
            return; 
        }
    }

    // making sure word count is less than 10
    var wordCount = eventDescription.trim().split(/\s+/).length;
    if (wordCount > 10) {
        alert("Event description must be 10 words or less.");
        return; 
    }

    // hide input container and display countdown container
    document.querySelector('.main-container').style.display = 'none'; // Hide the main container
    var reminderHTML = '<div class="event-description">Until: ' + eventDescription + '</div>';
    document.querySelector('.countdown-content').insertAdjacentHTML('beforebegin', reminderHTML); // Insert before the countdown content
    document.querySelector('.countdown-content').style.display = 'block';

    var eventDateTime = new Date(inputDate + 'T' + inputTime + ':00');
    calcTime(eventDateTime);
});

function calcTime(eventDateTime) { //calculating time/countdown
    var startTimer = setInterval(function() {
        var now = new Date().getTime();
        var distance = eventDateTime.getTime() - now;

        if (distance < 0) {
            clearInterval(startTimer);
            document.getElementById('days').innerHTML = '0';
            document.getElementById('hours').innerHTML = '0';
            document.getElementById('minutes').innerHTML = '0';
            document.getElementById('seconds').innerHTML = '0';
            triggerFireworks();
            showFlippingStickman();  
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerHTML = days;
            document.getElementById('hours').innerHTML = hours;
            document.getElementById('minutes').innerHTML = minutes;
            document.getElementById('seconds').innerHTML = seconds;
        }
    }, 1000);
}


function triggerFireworks() {
    var duration = 8 * 1000; 
    var end = Date.now() + duration;
    var colors = ['#FF69B4', '#00FFFF']; // colors are pink and cyan

    (function frame() {
        confetti({
            particleCount: 100, 
            spread: 360, // full circle
            startVelocity: 20, 
            origin: { x: Math.random(), y: Math.random() }, // randomizing
            gravity: 1, // adjusting gravity to control how fast particles fall
            ticks: 200, // how long each particle stays visible
            colors: colors,
            scalar: 1 
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();

}

    function showFlippingStickman() { //function for stickman
        const stickmanContainer = document.getElementById('stickman-container');
        stickmanContainer.style.display = 'block';
        stickmanContainer.style.animation = 'flip 5s ease-in-out forwards';
        setTimeout(() => {
            stickmanContainer.style.display = 'none';
        }, 5000); // after 5 seconds, stick figure is gone
    }