var ChatModel = function () {
	this.messages = [];
	this.typing = [];
	this.addMessageEvent = new Event(this);
	this.addTypingEvent = new Event(this);
	this.removeTypingEvent = new Event(this);
};

ChatModel.prototype = {

	addMessage: function (message, author) {
		this.messages.push({
			messageName: message,
			messageAuthor: author
		});
		this.addMessageEvent.notify();
	},

	addTyping: function (author) {
		if ($.inArray(author, this.typing) === -1) {
			this.typing.push(author);
			this.addTypingEvent.notify();
		}
	},

	removeTyping: function (author) {
		var index = this.typing.indexOf(author);
		if (index > -1) {
			this.typing.splice(index, 1);
		}
		this.removeTypingEvent.notify();
	},

	getTyping: function () {
		return this.typing;
	},

	getMessages: function () {
		return this.messages;
	}

};
