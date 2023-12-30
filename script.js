const johnSelectorBtn = document.querySelector('#john-selector');
const janeSelectorBtn = document.querySelector('#jane-selector');
const chatMessages = document.querySelector('.chat-message');
const chatHeader = document.querySelector('.chat-header');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

let messageSender = 'John';
let messageArr = [];


// message creator 
const createMessage = (message) => `

    <div class="message ${message.sender === 'John'? 'blue-bg': 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timeStamp}
        <i class="fa-solid fa-trash"></i>
        </div>
    </div>

`;


// Update the name values 
const updateMessageThings = (name) => {
    messageSender = name;
    chatHeader.innerHTML = `${name} chatting...`;
    chatInput.placeholder = `${name}, type here`;


    if(name === 'John'){
        johnSelectorBtn.classList.add('active-person');
        janeSelectorBtn.classList.remove('active-person');
    }

    if(name === 'Jane'){
        janeSelectorBtn.classList.add('active-person');
        johnSelectorBtn.classList.remove('active-person');
    }

    chatInput.focus();
}


// check the click button 
johnSelectorBtn.addEventListener('click', () => {updateMessageThings('John')});
janeSelectorBtn.addEventListener('click', () => {updateMessageThings('Jane')});

// message submit handle 
chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US',
    {hour: 'numeric', minute: 'numeric', hour12: true});

    let message =  {
        sender : messageSender,
        text : chatInput.value,
        timeStamp: timestamp
    };

    chatMessages.innerHTML += createMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInputForm.reset();

    messageArr.push(message);
    saveMessage();
});


// clear the messages on click the clear button 
clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    localStorage.clear();
});

// single message deletion 
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-trash')){
        const parent = e.target.parentElement.parentElement;

        const ElementArr = Array.from(chatMessages.children);
        let index = ElementArr.findIndex(e => e === parent);
        if(index !== -1){
            messageArr.splice(index, 1);
        }
        saveMessage();
        parent.remove();
    }
});

// save the messages to the localStorage 
const saveMessage = () => {
    localStorage.setItem('message', JSON.stringify(messageArr));
}

// get the messages from the localStorage 
const showMessage = () => {
    let storedMessage = localStorage.getItem('message');
    if(storedMessage) {
        messageArr = JSON.parse(storedMessage);
        for(let i of messageArr){
            chatMessages.innerHTML += createMessage(i);
        }
    }
}

// load the showMessage on reset the window
window.addEventListener('load', () => {
    showMessage();
});