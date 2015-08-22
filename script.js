var switchOnOff = 'off';

// Get necessary DOM elements
var timer = document.getElementById('timer');
var workTime = parseInt(document.getElementById('value-work').childNodes[3].innerHTML);
var breakTime = parseInt(document.getElementById('value-break').childNodes[3].innerHTML);

var seconds = workTime * 60;

// Functions to set, start, and stop timer

var setTimer = function(minutes) {
	seconds = minutes * 60;
	timer.innerHTML = ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + (seconds % 60)).slice(-2); 
}

setTimer(breakTime);

var startTimer = function(){
	setInterval(function(){
		seconds--;
		timer.innerHTML = ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + (seconds % 60)).slice(-2);
	}, 1000);
};

//startTimer();

// Make the break and work time adjustable
// Add an event listener to each button
var buttons = document.getElementsByClassName("btn");

[].forEach.call(buttons, function (btn) {
	btn.onclick = function(){
		if(switchOnOff == 'off') {
			// Get current value by transversing DOM nodes
			var currentValue = parseInt(btn.parentNode.childNodes[3].innerHTML);
			// Add or subtract
			if (btn.classList.contains('value-add')) {
				btn.parentNode.childNodes[3].innerHTML = currentValue + 1;
			} else if (btn.classList.contains('value-minus')) {
				btn.parentNode.childNodes[3].innerHTML = currentValue - 1;
			}
		}
	}
});
