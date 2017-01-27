var ChatController = function (model, view) {
	this.model = model;
	this.view = view;

	this.botDoneReadingEvent = new Event(this);
	this.botDoneTypingEvent = new Event(this);

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
		this.makeBotReadHandler = this.makeBotRead.bind(this);
		this.makeBotTypeHandler = this.makeBotType.bind(this);
		this.makeBotAnswerHandler = this.addMessage.bind(this);
		return this;
	},

	enable: function () {
		this.view.addMessageEvent.attach(this.addMessageHandler);
		this.view.changeTypingEvent.attach(this.changeTypingHandler);
		this.model.addMessageEvent.attach(this.makeBotReadHandler);
		this.botDoneReadingEvent.attach(this.makeBotTypeHandler);
		this.botDoneTypingEvent.attach(this.makeBotAnswerHandler);
		return this;
	},

	addMessage: function (sender, args) {
		this.model.addMessage(args.message, args.author);
	},

	changeTyping: function (sender, args) {
		this.model.setUserTyping(args.author, args.isTyping)
	},

	makeBotType: function() {
		var that = this;
		var user = 'bot';
		var message = that.model.getBotSentence();
		that.model.setUserTyping(user, true);
		setTimeout(function() {
			that.botDoneTypingEvent.notify({
				message: message,
				author: user
			});
			that.model.setUserTyping(user, false);
		}, message.split(' ').length * that.model.getBotTypingRate());
	},

	makeBotRead: function() {
		var that = this;
		var latestEntry = this.model.getLatestEntry();
		var messageToRead = latestEntry.messageName;
		var readingTime = messageToRead.split(' ').length * that.model.getBotReadingRate();
		if (latestEntry.messageAuthor === 'self') {
			setTimeout(function() {
				that.botDoneReadingEvent.notify();
			}, readingTime);
		}
	}

};
