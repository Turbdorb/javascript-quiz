// get the scores(if the exist) from local storage and loop through them and display them on the screen
var initials = localStorage.getItem("initials");
var highScoreEl = document.getElementById('high-score');

highScoreEl.textContent = initials;