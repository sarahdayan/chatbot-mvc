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
			sentences: [
				'But when you start programming, you simply write you code line after line, in a more or less logical and chronological order.',
				'I click on this, that happens. It\'s simple, it\'s logic, and you probably don\'t get what\'s wrong with it. And that\'s alright. This is exactly where you\'re supposed to start.',
				'You\'re sitting on the couch, in front of your TV set. You have the remote in your hand, which allows you to control the DVD player.',
				'The model is kinda dumb and lazy, but he\'s polite. It knows many things, but it\'s not capable of understanding interactions.',
				'Let\'s forget our TV and take a much simpler example: a lamp. Switch it on, lights turn on. Switch it off, lights turn off. You can\'t go simpler.',
				'The model doesn\'t directly speak to the view. Never. It shouldn\'t. What if the view is removed? That would throw an error. No, instead, the model sends an event, a signal, and the view listens to it.',
				'In real life, you can\'t justify spending two days instead of one hour on a lamp app that will never scale. In real life, architectures like that require time, more developers, so they cost more money. It\'s all about finding the right balance to achieve great work done with care and professionalism, in a reasonable timeframe that makes sense with the project\'s context and goals.'
			],
			typingRate: 500,
			readingRate: 300
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

	setUserTyping: function (user, isTyping, date) {
		if (isTyping !== this.users[user].isTyping) {
			this.users[user].typingDate = new Date;
		}
		this.users[user].isTyping = isTyping;
		this.changeTypingEvent.notify();
	},

	getBotSentence: function () {
		return this.users.bot.sentences[ChatHelper.getRandomInt(0, this.users.bot.sentences.length - 1)];
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
	}

};
