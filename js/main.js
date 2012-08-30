
var screen_em = $("#screen");
var text_em = $("#screen pre");

// Helper function to add text to the screen.
function addtext(text) {
	text_em.text(text_em.text() + text);
}

// Main "loop".
function cursor() {
	// Should the cursor be blinking (idle)?
	if (blink > 0 || _.isEmpty(mytext)) {
		// Blink cursor.
		screen_em.toggleClass("hascursor");
		// Decrease waiting time.
		blink--;
		// Blink every second.
		setTimeout(cursor,1000);
	} else {
		screen_em.addClass("hascursor");

		// Explode the string into an array. (BTW, only IE actually needs this.)
		if (_.isString(mytext[0])) {
			var arr = [];
			for (var i = 0; i < mytext[0].length; i++) {
				arr.push(mytext[0][i]);
			}
			mytext[0] = arr;
		}

		// Get next char
		var char = _.first(mytext[0]);
		// Keep only the rest
		mytext[0] = _.rest(mytext[0]);
		// Add to screen
		addtext(char);

		// Print every second line, fast.
		if (_.isEmpty(mytext[0])) {
			mytext = _.rest(mytext);
			addtext("\n" + mytext[0] + "\n");
			mytext = _.rest(mytext);
			blink = 4;
		}

		// Simulate a bit of randomness in typing.
		setTimeout(cursor,200 + Math.random() * 200);
	}

};
// Kick it all into motion!
setTimeout(cursor,100);


