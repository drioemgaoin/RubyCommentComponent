Polymer({
  is: "action-cable",
  properties: {
    channelName: String,
    debug: {
      type: Boolean,
      value: true
    }
  },
  ready: function() {
    var self = this;

    App.cable.subscriptions.create(this.channelName, {
      connected: function() {
        if (self.debug) {
          console.log("Connected to the channel " + self.channelName);
        }

        self.fire('connected');
      },
      disconnected: function() {
        if (self.debug) {
          console.log("Disconnected to the channel " + self.channelName);
        }

        self.fire('disconnected');
      },
      received: function(data) {
        if (self.debug) {
          console.log("Data received on the channel " + self.channelName + ": " + data);
        }

        self.fire('received', data);
      }
    });
  }
});
