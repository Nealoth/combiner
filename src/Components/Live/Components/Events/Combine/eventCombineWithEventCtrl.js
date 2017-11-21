module.exports = function (filters, itemsToCombine, eventsResource) {
	'use strict';
	var e       = eventsResource;
	var _this   = this;
	this.events = null;
	
	console.log(itemsToCombine[0]);
	
	e.system.get(
		null,
		null,
		filters.sportId,
		filters.beginDate,
		filters.endDate
	).then(function (events) {
		_this.events = events;
	});
	
	this.searchBySystemEvent = Object.create(null);
	
	this.findLongestWord = function (str) {
		'use strict';
		var words = str.replace(/\(.*\)/ig, "").replace(/[,./]/g, " ");
		var longestWord = '';
		var wordsArray  = words.split(' ');
		if (wordsArray.length > 1) {
			wordsArray.forEach(function (item) {
				if (item.length > longestWord.length) {
					longestWord = item;
				}
			});
		} else {
			longestWord = wordsArray[ 0 ];
		}
		return longestWord;
	};
	
	setTimeout(function () {
		_this.searchBySystemEvent.TeamHomeName = _this.findLongestWord(itemsToCombine[0].TeamHomeName);
	});
	setTimeout(function () {
		_this.searchBySystemEvent.TeamGuestName = _this.findLongestWord(itemsToCombine[0].TeamGuestName);
	});
	
};