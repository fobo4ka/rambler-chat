(function () {
    function ChatService() {

        // initial data
        if(window.sessionStorage.length == 0) {
            var message = 'Donec sit amet ligula enim. Duis vel condimentum massa. Donec sit amet ligula enim. Duis vel condimentum massa.' +
                'Donec sit amet ligula enim. Duis vel condimentum massa. Donec sit amet ligula enim. Duis vel condimentum massa.';

            var items = [{user: 'user1', msg: message, name: 'Alex Deo', date: 'Jul 5, 5:00 pm'},
                {user: 'user9', msg: message, name: 'Jxon Rexa', date: 'Jul 5, 5:00 pm'},
                {user: 'user9', msg: message, name: 'Jxon Rexa', date: 'Jul 5, 5:00 pm'}];

            window.sessionStorage.setItem('user1', JSON.stringify(items));

            var usersInfo = [{user_id: 'user1', pic: 'image/ava1.jpg', name: 'Alex Deo', active_time: 'Active From 3 hours'},
                {user_id: 'user2', pic: 'image/ava2.jpg', name: 'Alex Deoo', active_time: 'Active From 3 hours'},
                {user_id: 'user3', pic: 'image/ava2.jpg', name: 'Alex Deoo', active_time: 'Active From 3 hours'},
                {user_id: 'user4', pic: 'image/ava1.jpg', name: 'Alex Deo', active_time: 'Active From 3 hours'},
                {user_id: 'user5', pic: 'image/ava2.jpg', name: 'Alex Deoo', active_time: 'Active From 3 hours'},
                {user_id: 'user6', pic: 'image/ava1.jpg', name: 'Alex Deo', active_time: 'Active From 3 hours'},
                {user_id: 'user7', pic: 'image/ava2.jpg', name: 'Alex Deoo', active_time: 'Active From 3 hours'},
                {user_id: 'user8', pic: 'image/ava1.jpg', name: 'Alex Deo', active_time: 'Active From 3 hours'},
                {user_id: 'user9', pic: 'image/ava3.jpg', name: 'Jxon Rexa', active_time: 'Active From 3 hours'}];

            window.sessionStorage.setItem('usersInfo', JSON.stringify(usersInfo));
        }

        this.getMessages = function (userId) {
            var data = window.sessionStorage.getItem(userId);
            return data != null ? JSON.parse(data) : [];
        };

        this.sendMessage = function (userId, message) {
            var messages = this.getMessages(userId);
            messages.push(message);
            window.sessionStorage.setItem(userId, JSON.stringify(messages));
        };

        this.getUsersInfo = function () {
            return JSON.parse(window.sessionStorage.getItem('usersInfo'));
        };
    }

    function getTemplate(id) {
        var messageTmpHtml = document.getElementById(id).innerHTML.trim();
        var tmp = document.createElement('div');
        tmp.innerHTML = messageTmpHtml;
        return tmp.firstChild;
    }

    function addUserInfo(userInfo) {
        var userTmp = getTemplate('user');

        userTmp.setAttribute('id', userInfo.user_id);
        userTmp.setAttribute('data-name', userInfo.name);
        userTmp.querySelectorAll('.user__avatar')[0].style.backgroundImage = "url(" + userInfo.pic + ")";
        userTmp.querySelectorAll('.info__name')[0].innerHTML = userInfo.name;
        userTmp.querySelectorAll('.info__active-time')[0].innerHTML = userInfo.active_time;

        document.getElementById('user-list').appendChild(userTmp);

        userTmp.onclick = function () {
            viewUser(this);
        }
    }

    function viewUser(userActive) {
        var oldUserActive = document.querySelectorAll('.user.active');

        for(var i = 0; i < oldUserActive.length; i++) {
            oldUserActive[i].classList.remove('active');
        }

        userActive.classList.add('active');

        viewWindowChat(userActive);
    }

    function viewWindowChat(activeUser) {
        document.querySelectorAll('.chat-window__head__title')[0].innerHTML = activeUser.getAttribute('data-name');

        var messages = service.getMessages(activeUser.id);

        if (messages.length > 0) {
            document.getElementById('chat-window__messages').innerHTML = '';
            for (var i = 0; i < messages.length; i++) {
                viewMessage(messages[i]);
            }
        } else {
            document.querySelectorAll('.chat-window__messages')[0].innerHTML = '<p class="message message-error">Not messages</p>';
        }
    }

    function viewMessage(messageItem) {
        var messageTmp = getTemplate('message');

        for(var i = 0; i < usersInfo.length; i++) {
            if (usersInfo[i].user_id == messageItem.user) {
                messageTmp.querySelectorAll('.avatar__img')[0].style.backgroundImage = "url(" + usersInfo[i].pic + ")";
                messageTmp.querySelectorAll('.info__user-name')[0].innerHTML = usersInfo[i].name;
            }
        }

        messageTmp.querySelectorAll('.message__text')[0].innerHTML = messageItem.msg;
        messageTmp.querySelectorAll('.info__date')[0].innerHTML = messageItem.date;

        document.getElementById('chat-window__messages').appendChild(messageTmp);
    }

    function sendMessage() {
        var messageText = document.getElementById('message-input').value;

        if (messageText != '') {
            var user = document.querySelectorAll('.user.active')[0].id;
            var messageInfo = {user: selfUserId, msg: messageText, date: 'Jul 5, 5:00 pm'};

            if(document.querySelectorAll('.message.message-error')[0]) {
                document.getElementById('chat-window__messages').innerHTML = '';
            }
            service.sendMessage(user, messageInfo);

            document.getElementById('message-input').value = '';
            viewMessage(messageInfo);
        }
    }

    var selfUserId = 'user9';
    var service = new ChatService();

    var usersInfo = service.getUsersInfo();
    for(var i = 0; i < usersInfo.length; i++) {
        var userInfo = usersInfo[i];
        if (userInfo.user_id != selfUserId) {
            addUserInfo(userInfo);
        }
    }

    var users = document.querySelectorAll('.user');
    viewUser(users[0]);

    document.getElementById('btn-send').onclick = sendMessage;
})();