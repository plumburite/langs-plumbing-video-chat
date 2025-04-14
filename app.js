document.getElementById('videoChatBtn').addEventListener('click', async () => {
  const response = await fetch('/token');
  const data = await response.json();

  const room = await Twilio.Video.connect(data.token, { name: 'langs-room' });

  room.on('participantConnected', participant => {
    console.log(`Participant connected: ${participant.identity}`);
  });

  console.log(`Connected to Room: ${room.name}`);
});
