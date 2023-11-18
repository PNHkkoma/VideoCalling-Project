var msg = document.getElementById("msg");
var log = document.getElementById("log");

var slideOpen = false;

function slideToggle() {
    var chat = document.getElementById('chat-content');
    if (slideOpen) {
        chat.style.display = 'none';
        slideOpen = false;
    } else {
        chat.style.display = 'block'
        document.getElementById('chat-alert').style.display = 'none';
        document.getElementById('msg').focus();
        slideOpen = true
    }
}

function appendLog(item) {
    var doScoll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
    log.appendChild(item);
    if (doScoll) {
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }
}

function currentTime() {
    var date = new Date;
    hour = date.getHours();
    minute = date.getMinutes();
    if (hour < 10) {
        hour = "0" + hour
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    return hour + ":" + minute
}

document.getElementById("form").onsubmit = function () {
    if (!chatWs) {
        return false;
    }
    if (!msg.value) {
        return false;
    }
    chatWs.send(msg.value);
    msg.value = "";
    return false;
};

function connectChat() {
    chatWs = new WebSocket(chatwebsocketAddr)

    chatWs.onclose = function (evt) {
        console.log("websocket has closed")
        document.getElementById('chat-botton').disabled = true
        setTimeout(function () {
            connectChat();
        }, 1000);
    }

    chatWs.onmessage = function (evt) {
        var mesaage = evt.data.split('\n');
        if (slideOpen == false) {
            document.getElementById('chat-alert').style.display = 'block'
        }
        for (var i = 0; i < mesaage.lenth; i++) {
            var item = document.createElement("div");

            item.innerText = currentTime() + " - " + mesaage[i];
            appendLog(item);
        }
    }

    chatWs.onerror = function (evt) {
        console.log("error: " + evt.data)
    }

    setTimeout(function () {
        if (chatWs.readyState === WebSocket.OPEN) {
            document.getElementById('chat-botton').disabled = false
        }
    }, 1000);
}

connectChat();