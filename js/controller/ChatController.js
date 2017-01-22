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
		this.addTypingHandler = this.addTyping.bind(this);
		this.removeTypingHandler = this.removeTyping.bind(this);
		return this;
	},

	enable: function () {
		this.view.addMessageEvent.attach(this.addMessageHandler);
		this.view.addTypingEvent.attach(this.addTypingHandler);
		this.view.removeTypingEvent.attach(this.removeTypingHandler);
		return this;
	},

	addMessage: function (sender, args) {
		this.model.addMessage(args.message, args.author);
	},

	addTyping: function (sender, args) {
		this.model.addTyping(args.author);
	},

	removeTyping: function (sender, args) {
		this.model.removeTyping(args.author);
	}

};
