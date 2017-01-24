var ChatHelper = function () {

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return {
		getRandomInt: function(min, max) {
			getRandomInt(min, max);
		}
	}

}()
