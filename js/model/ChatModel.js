var ChatModel = function () {
	this.messages = [];
	this.typing = [];
	this.users = {
		self: {
			name: 'self',
			isTyping: false,
			typingDate: null
		},
		bot: {
			name: 'bot',
			isTyping: false,
			typingDate: null,
			typingRate: 500,
			readingRate: 300
		}
	}
	this.emojis = {
		':)': 'emoji_u1f60a.svg',
		';)': 'emoji_u1f60b.svg',
		':(': 'emoji_u1f61e.svg',
		':o': 'emoji_u1f62e.svg',
		'B)': 'emoji_u1f60e.svg',
		':smug:': 'emoji_u1f60f.svg',
		':*': 'emoji_u1f61a.svg',
		':P': 'emoji_u1f61b.svg',
		':\'(': 'emoji_u1f62d.svg'
	};

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

	setUserTyping: function (user, isTyping, date) {
		if (isTyping !== this.users[user].isTyping) {
			this.users[user].typingDate = new Date;
		}
		this.users[user].isTyping = isTyping;
		this.changeTypingEvent.notify();
	},

	getBotTypingRate: function () {
		return this.users.bot.typingRate;
	},

	getBotReadingRate: function () {
		return this.users.bot.readingRate;
	},

	getLatestEntry: function () {
		var messages = this.getMessages();
		return messages[messages.length - 1];
	},

	getEmojis: function () {
		return this.emojis;
	}

};
