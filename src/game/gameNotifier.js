class EventMessage {
  constructor(from, value) {
    this.from = from;
    this.value = value;
  }
}

class GameEventNotifier {
constructor() {
    let port = 4000;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    this.socket.onmessage = async (msg) => {
      try {
        const message = JSON.parse(msg.data);
        const userName = message.from;
        const eventValue = message.value;
        setToast({
            message: `${userName} has just reached ${eventValue} pixels!`,
            type: 'info'
        });
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
