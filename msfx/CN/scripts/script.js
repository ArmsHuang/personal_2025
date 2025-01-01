'use strict';

var ShowBox = new Vue({
  el: '.container',
  data: {
    headerShow: false,
    navNodesShow: false
  }
});
//# sourceMappingURL=script.js.map

	//block F12 and right Click
	$(document).keydown(function (event) {
		if (event.keyCode == 123) { // Prevent F12
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
			return false;
		}
	});

	$(document).on("contextmenu", function (e) {        
		e.preventDefault();
	});
