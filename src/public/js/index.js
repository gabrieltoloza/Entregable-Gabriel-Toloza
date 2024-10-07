


const socketClient = io();



const btnChat = document.querySelector('#btn-chat') // <-- Boton que dispara el evento del chat, envia el mensaje.
const containerInput = document.querySelector('#container-input');
const inputChat = document.querySelector('#input-chat');
const sectionApp = document.querySelector('#section-app')
// console.log(inputChat,containerInput)



btnChat.addEventListener("click", event => {
    event.preventDefault();

    socketClient.emit('init_message', inputChat.value)
    inputChat.value = '';
})


socketClient.on('new_message', (data) => {
    console.log("Nuevo mensaje recibido: ", data)

    renderBubble(data, data.id === socketClient.id)
})




function renderBubble(data, isOwnMessage) {
    const newBubble = document.createElement('div');
    newBubble.classList.add('chat', isOwnMessage ? 'chat-end' : 'chat-start');
    newBubble.innerHTML = isOwnMessage 
        ? `     <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div class="chat-header">
                    Anakin
                    <time class="text-xs opacity-50">12:46</time>
                </div>
                    <div class="chat-bubble">${data.message}</div>
                    <div class="chat-footer opacity-50">Seen at 12:46
                </div>
          `
        : `<div class="chat-image avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div class="chat-header">
                        Obi-Wan Kenobi
                        <time class="text-xs opacity-50">12:45</time>
                    </div>
                    <div class="chat-bubble">${data.message}</div>
                    <div class="chat-footer opacity-50">Delivered
            </div>
        `;
    sectionApp.insertBefore(newBubble, containerInput);

}
