
const appendMessage = (message: string) => {
  const oldMsg = document.querySelector<HTMLDivElement>('#app')!.innerHTML;

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `${message}<br>${oldMsg}`;
};

window.addEventListener('load', () => {
  const ws = new WebSocket(`ws://${location.host}/ws?role=receiver`);

  ws.addEventListener('message', (e) => {
    let json: any | null = null;

    try {
      json = JSON.parse(e.data);
    } catch (_) {
      json = null;
    }
    if (!json) return;

    console.log(json);

    if (json.type === 'on_message') {
      appendMessage(json.data.message);
    }
  });

  ws.addEventListener('open', () => {
    appendMessage('WebSocket connected!');
  });
});
