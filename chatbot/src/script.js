document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.querySelector('.messages');
    const input = document.querySelector('input[type="text"]');
    const sendButton = document.querySelector('.send-button');

    // Função para rolar para o final das mensagens
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Rola para o final quando a página carrega
    scrollToBottom();

    // Função para adicionar uma nova mensagem (exemplo para integração futura)
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Manipulador de envio de mensagem (exemplo para integração futura)
    function handleSend() {
        const text = input.value.trim();
        if (text) {
            addMessage(text, true);
            input.value = '';
            // Aqui você pode adicionar a chamada para seu backend
        }
    }

    // Event listeners
    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
