class EventHub {
  constructor() {
    this.hub = Object.create(null);
  }
  emit(event, data) {
    (this.hub[event] || []).forEach(({ handler }) => handler(data));
  }
  on(event, handler) {
    if (!this.hub[event]) {
      this.hub[event] = [];
    }
    this.hub[event].push({ handler, key: Date.now() });
  }
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(
      item => item.handler === handler
    );
    if (i > -1) this.hub[event].splice(i, 1);
  }
  watch(event, handler, key) {
    if (!key) {
      throw new Error(`param "KEY" Not Found!`);
    }
    if (!this.hub[event]) {
      this.hub[event] = [];
    }
    const i = this.hub[event].findIndex(item => item.key === key);
    if (i >= 0) {
      this.hub[event][i] = { handler, key };
    } else {
      this.hub[event].push({ handler, key });
    }
  }
}