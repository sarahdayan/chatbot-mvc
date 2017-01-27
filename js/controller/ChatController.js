var ChatController = function (model, view) {
	this.model = model;
	this.view = view;

	this.init();
};

ChatController.prototype = {

	init: function () {
		this.setupHandlers()
			.enable();
	},

	setupHandlers: function () {
		this.addMessageHandler = this.addMessage.bind(this);
		this.changeTypingHandler = this.changeTyping.bind(this);
		this.makeBotAnswerHandler = this.makeBotAnswer.bind(this);
		return this;
	},

	enable: function () {
		this.view.addMessageEvent.attach(this.addMessageHandler);
		this.view.changeTypingEvent.attach(this.changeTypingHandler);
		this.model.addMessageEvent.attach(this.makeBotAnswerHandler);
		return this;
	},

	addMessage: function (sender, args) {
		this.model.addMessage(args.message, args.author);
	},

	changeTyping: function (sender, args) {
		this.model.setUserTyping(args.author, args.isTyping)
	},

	// Needs big time refactoring
	makeBotAnswer: function () {
		var that = this;
		var user = 'bot';
		var latestEntry = this.model.getLatestEntry();
		if (latestEntry.messageAuthor === 'self') {
			var message = that.model.getBotSentence();
			setTimeout(function() {
				that.model.setUserTyping(user, true);
				var botTyping = setTimeout(function() {
					that.model.addMessage(message, user);
					that.model.setUserTyping(user, false);
				}, message.split(' ').length * that.model.getBotTypingRate());
			}, latestEntry.messageName.split(' ').length * that.model.getBotReadingRate());
		}
	}

};
