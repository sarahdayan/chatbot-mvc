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
		return this;
	},

	enable: function () {
		this.view.addMessageEvent.attach(this.addMessageHandler);
		return this;
	},

	addMessage: function (sender, args) {
		this.model.addMessage(args.message, args.author);
	}

};
