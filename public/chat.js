const socket = io();
const userInput = document.getElementById('user');
const msgInput = document.getElementById('msg');
const btn = document.getElementById('send');

btn.addEventListener('click', () => {
  const user = userInput.value.trim();
  const msg = msgInput.value.trim();
  if (!msg) return;
  socket.emit('chatOut', { user, msg });
  msgInput.value = '';
});
