class EventMessage {
  constructor(from, value) {
    this.from = from;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('Pixelhoarder', 'system', { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('Pixelhoarder', 'system', { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, value) {
    const event = new EventMessage(from, value);
    this.socket.send(JSON.stringify(event));
  }
}

const GameNotifier = new GameEventNotifier();
export { GameNotifier };
