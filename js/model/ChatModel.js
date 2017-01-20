var ChatModel = function () {
	this.messages = [];
	this.addMessageEvent = new Event(this);
};

ChatModel.prototype = {

	addMessage: function (message, author) {
		this.messages.push({
			messageName: message,
			messageAuthor: author
		});
		this.addMessageEvent.notify();
	},

	getMessages: function () {
		return this.messages;
	}

};
