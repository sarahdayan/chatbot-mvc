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
		var messages = this.model.getMessages();
		var latestChatter = messages[messages.length - 1].messageAuthor;
		if (latestChatter === 'self') {
			that.model.setUserTyping(user, true);
			var message = '';
			$.getJSON('https://api.chucknorris.io/jokes/search?query=' + messages[messages.length - 1].messageName)
				.done(function(data) {
					if (data.total <= 0) {
						$.getJSON('https://api.chucknorris.io/jokes/random')
							.done(function(data) {
								message = data.value;
							});
					}
					else {
						var randomInt = ChatHelper.getRandomInt(0, data.total);
						message = data.result[randomInt].value;
					}
					setTimeout(function() {
						that.model.addMessage(message, user);
						that.model.setUserTyping(user, false);
					}, 5000);
				});
		}
	}

};
