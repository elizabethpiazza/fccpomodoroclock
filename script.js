var switchOnOff = 'off';

// Get necessary DOM elements
var timer = document.getElementById('timer');
var workTime = function() {
	return parseInt(document.getElementById('value-work').childNodes[3].innerHTML);
}
var breakTime = function() {
	return parseInt(document.getElementById('value-break').childNodes[3].innerHTML);
}

// Functions to set, start, and stop timer
var alarmSound = new Audio('http://www.freespecialeffects.co.uk/soundfx/sirens/schoolbe.wav');

var seconds;

var setTimer = function(minutes) {
	seconds = minutes * 60;
	timer.innerHTML = ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + (seconds % 60)).slice(-2);
	//tartTimer(); 
}

var timerInterval;

var startTimer = function(){
	timerInterval = setInterval(function(){
		seconds--;
		timer.innerHTML = ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + (seconds % 60)).slice(-2);
		// Handle end time
		if (seconds <= 0){
			alarmSound.play();
			if(current == 'work'){
				current = 'break';
				setTimer(breakTime());
			} else {
				current = 'work';
				setTimer(workTime());
			}
		}
	}, 1000);
};

var stopTimer = function(){
	clearInterval(timerInterval);
}

timer.onclick = function(){
	if (switchOnOff == 'off'){
		startTimer();
		switchOnOff = 'on';
	} else {
		stopTimer();
		switchOnOff = 'off';
	}
};

// Make the break and work time adjustable
var buttons = document.getElementsByClassName("btn");

[].forEach.call(buttons, function (btn) {
	btn.onclick = function(){
		if(switchOnOff == 'off') {
			// Get current value by transversing DOM nodes
			var currentValue = parseInt(btn.parentNode.childNodes[3].innerHTML);
			// Add or subtract
			if (btn.classList.contains('value-add')) {
				btn.parentNode.childNodes[3].innerHTML = currentValue + 1;
				var workTime = parseInt(document.getElementById('value-work').childNodes[3].innerHTML);
				var breakTime = parseInt(document.getElementById('value-break').childNodes[3].innerHTML);
				setTimer(workTime);
			} else if (btn.classList.contains('value-minus')) {
				btn.parentNode.childNodes[3].innerHTML = currentValue - 1;
				var workTime = parseInt(document.getElementById('value-work').childNodes[3].innerHTML);
				var breakTime = parseInt(document.getElementById('value-break').childNodes[3].innerHTML);
				setTimer(workTime);
			}
		}
	}
});

// Set the timer

var current = 'work';

setTimer(workTime());
