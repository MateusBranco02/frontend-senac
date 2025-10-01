document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.querySelector('.messages');
    const input = document.querySelector('input[type="text"]');
    const sendButton = document.querySelector('.send-button');

    const API_URL = 'http://127.0.0.1:8000/api/pergunta';

    function ScrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    ScrollToBottom();

    function AddMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        ScrollToBottom();
    }

    async function SendMessage() {
        const userText = input.value.trim();

        if (userText === '') {
            return;
        }

        AddMessage(userText, 'user');
        input.value = '';

        AddMessage('Digitando...', 'assistant-typing');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    pergunta: userText
                })
            });

            const typingIndicator = document.querySelector('.assistant-typing');

            if (typingIndicator) {
                typingIndicator.remove();
            }

            if (!response.ok) {
                throw new Error('Não foi possível obter uma resposta do servidor.');
            }

            const botResponseText = await response.json();

            AddMessage(botResponseText, 'assistant');
        } catch (error) {
            console.error('Erro na comunicação com a API:', error);

            const typingIndicator = document.querySelector('.assistant-typing');

            if (typingIndicator) {
                typingIndicator.remove();
            }

            AddMessage('Desculpe, ocorreu um erro de comunicação. Tente novamente.', 'assistant');
        }
    }

    sendButton.addEventListener('click', SendMessage);

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            SendMessage();
        }
    })
});
