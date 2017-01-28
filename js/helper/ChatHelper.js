var ChatHelper = function () {

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var escapeRegExp = function(string) {
		return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	var trimNonBreakableSpaces = function(string) {
		return string.replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, '');
	};

	return {
		getRandomInt: function(min, max) {
			return getRandomInt(min, max);
		},
		escapeRegExp: function(string) {
			return escapeRegExp(string);
		},
		trimNonBreakableSpaces: function(string) {
			return trimNonBreakableSpaces(string);
		}
	}

}()
