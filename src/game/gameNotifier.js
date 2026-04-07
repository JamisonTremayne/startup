class EventMessage {
  constructor(from, value) {
    this.from = from;
    this.value = value;
  }
}

let setToast = null;

export function setToastHandler(handler) {
    setToast = handler;
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
        const text = await msg.data.text();
        console.log(`Received message: ${text}`);
        const message = JSON.parse(text);
        const userName = message.from;
        const eventValue = message.value;
        if (setToast) {
            setToast({
                message: `${userName} has just reached ${eventValue} pixels!`,
                type: 'info'
            });
        }
      } catch {}
    };
  }

  broadcastEvent(from, value) {
    console.log(`Broadcasting event: ${from} reached ${value} pixels`);
    const event = new EventMessage(from, value);
    this.socket.send(JSON.stringify(event));
  }
}

const GameNotifier = new GameEventNotifier();
export { GameNotifier };
