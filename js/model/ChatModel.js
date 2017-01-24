var ChatModel = function () {
	this.messages = [];
	this.typing = [];
	this.users = {
		self: {
			name: 'self',
			isTyping: false
		},
		bot: {
			name: 'bot',
			isTyping: false
		}
	}
	this.addMessageEvent = new Event(this);
	this.changeTypingEvent = new Event(this);
};

ChatModel.prototype = {

	addMessage: function (message, author) {
		this.messages.push({
			messageName: message,
			messageAuthor: author
		});
		this.addMessageEvent.notify();
	},

	getTyping: function () {
		return this.typing;
	},

	getMessages: function () {
		return this.messages;
	},

	getUsers: function () {
		return this.users;
	},

	setUserTyping: function (user, isTyping) {
		this.users[user].isTyping = isTyping;
		this.changeTypingEvent.notify();
	}

};
