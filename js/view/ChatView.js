var ChatView = function (model) {
	this.model = model;
	this.addMessageEvent = new Event(this);

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
		this.$messagesContainer = this.$container.find('.js-chat__inner');

		this.$messageTemplate = $('#chat__message').clone();
		this.$messageTemplateMessage = this.$messageTemplate.find('.js-chat__message');
		this.$messageTemplateBubble = this.$messageTemplate.find('.js-chat__bubble');
		this.$messageTemplateAvatar = this.$messageTemplate.find('.js-chat__avatar');
		this.$messageSelfClass = 'chat__message--right';

		return this;
	},

	setupHandlers: function () {
		this.addMessageButtonHandler = this.addMessageButton.bind(this);
		this.clearMessageInputHandler = this.clearMessageInput.bind(this);
		this.addMessageHandler = this.addMessage.bind(this);

		return this;
	},

	enable: function () {
		this.$addMessageButton.click(this.addMessageButtonHandler);
		this.model.addMessageEvent.attach(this.addMessageHandler);
		this.model.addMessageEvent.attach(this.clearMessageInputHandler);

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
		var html = '';
		var authorClass = '';
		var authorAvatar = 'avatars.jpg';

		this.$messagesContainer.html('');

		for (var message in messages) {
			if (messages[message].messageAuthor === 'self') {
				authorClass = this.$messageSelfClass;
				authorAvatar = 'avatar2.jpg';
			}
			this.$messageTemplateMessage.addClass(authorClass);
			this.$messageTemplateAvatar.find('img').attr('src', 'img/' + authorAvatar);
			this.$messageTemplateBubble.text(messages[message].messageName);
			html += this.$messageTemplate.html();
		}

		this.$messagesContainer.append(html);
	},

	clearMessageInput: function () {
		this.$messageInput.val('');
	},

	addMessage: function () {
		this.show();
	}

};
