var ChatView = function (model) {
	this.model = model;
	this.addMessageEvent = new Event(this);
	this.addTypingEvent = new Event(this);
	this.removeTypingEvent = new Event(this);

	this.init();
};

ChatView.prototype = {
	
	init: function () {
		this.createChildren()
			.setupHandlers()
			.enable();
	},

	createChildren: function () {
		this.$container = $('.js-chat');
		this.$addMessageButton = this.$container.find('.js-chat__submit');
		this.$messageInput = this.$container.find('.js-chat__input');
		this.$messagesContainer = this.$container.find('.js-chat__messenger');
		this.$typerContainer = this.$container.find('.js-chat__typer');

		this.$message = $('.js-chat__message');

		this.$messageTemplate = $('#chat__message').clone();
		this.$messageTemplateMessage = this.$messageTemplate.find('.js-chat__message');
		this.$messageTemplateBubble = this.$messageTemplate.find('.js-chat__bubble');
		this.$messageTemplateAvatar = this.$messageTemplate.find('.js-chat__avatar');
		this.$messageSelfClass = 'chat__message--right';

		this.$typingTemplate = $('#chat__typing').clone();
		this.$typingTemplateMessage = this.$typingTemplate.find('.js-chat__message');
		this.$typingTemplateBubble = this.$typingTemplate.find('.js-chat__bubble');
		this.$typingTemplateAvatar = this.$typingTemplate.find('.js-chat__avatar');

		return this;
	},

	setupHandlers: function () {
		this.addMessageButtonHandler = this.addMessageButton.bind(this);
		this.handleKeyupsHandler = this.handleKeyups.bind(this);
		this.clearMessageInputHandler = this.clearMessageInput.bind(this);
		this.botAnswerHandler = this.botAnswer.bind(this);
		this.addMessageHandler = this.show.bind(this);
		this.showTypingHandler = this.show.bind(this);
		this.hideTypingHandler = this.show.bind(this);

		return this;
	},

	enable: function () {
		this.$addMessageButton.click(this.addMessageButtonHandler);
		this.$messageInput.keyup(this.handleKeyupsHandler);
		this.model.addMessageEvent.attach(this.addMessageHandler);
		this.model.addMessageEvent.attach(this.botAnswerHandler);
		this.model.addTypingEvent.attach(this.showTypingHandler);
		this.model.removeTypingEvent.attach(this.hideTypingHandler);

		return this;
	},

	addMessageButton: function () {
		this.addMessageEvent.notify({
			message: this.$messageInput.val(),
			author: 'self'
		});
	},

	show: function () {
		this.buildList();
	},

	buildList: function () {
		var messages = this.model.getMessages();
		var typing = this.model.getTyping();
		var html = '';
		var html2 = '';
		var authorClass = this.$messageSelfClass;
		var authorAvatar = '';
		var authors = ['bot', 'self'];

		this.$messagesContainer.html('');
		this.$typerContainer.append('');

		for (var message in messages) {
			if (messages[message].messageAuthor === 'self') {
				this.$messageTemplateMessage.addClass(authorClass);
				authorAvatar = 'avatar2.jpg';
			}
			else {
				this.$messageTemplateMessage.removeClass(authorClass);
				authorAvatar = 'avatar.jpg';
			}
			this.$messageTemplateAvatar.find('img').attr('src', 'img/' + authorAvatar);
			this.$messageTemplateBubble.text(messages[message].messageName);
			html += this.$messageTemplate.html();
		}

		this.$messagesContainer.append(html);

		for (var author in typing) {
			if (typing[author] === 'self') {
				this.$typingTemplateMessage.addClass(authorClass);
				authorAvatar = 'avatar2.jpg';
			}
			else {
				this.$typingTemplateMessage.removeClass(authorClass);
				authorAvatar = 'avatar.jpg';
			}

			this.$typingTemplateMessage.attr('data-author', typing[author]);
			this.$typingTemplateAvatar.find('img').attr('src', 'img/' + authorAvatar);
			html2 += this.$typingTemplate.html();
		}

		this.$typerContainer.html(html2);

		for (var author in authors) {
			if ($.inArray(authors[author], typing) === -1) {
				this.$message.filter('[data-author="' + authors[author] + '"]').remove();
			}
		}

	},

	clearMessageInput: function () {
		this.$messageInput.val('');
	},

	/* [start] This shouldn't go in the view... */

	botAnswer: function () {
		var that = this;
		var messages = this.model.getMessages();
		var latestChatter = messages[messages.length - 1].messageAuthor;
		if (latestChatter === 'self') {
			this.addTyping('bot');
			setTimeout(function() {
				that.addMessageEvent.notify({
					message: 'Yes!',
					author: 'bot'
				});
				that.removeTyping('bot');
			}, 10000);
		}
	},

	/* [end] This shouldn't go in the view... */

	handleKeyups: function (event) {
		if (event.keyCode === 13) {
			this.addMessageButton();
			this.clearMessageInput();
		}
		if (this.$messageInput.val() === '') {
			return this.removeTyping('self');
		}
		this.addTyping('self');
	},

	addTyping: function (author) {
		this.addTypingEvent.notify({
			author: author
		});
	},

	removeTyping: function (author) {
		this.removeTypingEvent.notify({
			author: author
		});
	}

};
