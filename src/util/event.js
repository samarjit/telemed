class Event {
  constructor() {
    this.subscriptions = {};
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
  }
  trigger(event, payload) {
     for(const subs of this.subscriptions[event]) {
       subs(payload);
     }
  }
  on(event,fn) {
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = [];
    }
    this.subscriptions[event].push(fn);
  }
  off(event){
    delete this.subscriptions[event];
  }
  off(event, fn){
    this.subscriptions[event] = this.subscriptions[event].filter(i=>i === fn);
    if (!this.subscriptions[event]) {
      // delete in case all events handlers are removed
      delete this.subscriptions[event];
    }
  }
}
export default new Event();
