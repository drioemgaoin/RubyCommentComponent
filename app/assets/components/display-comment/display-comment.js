function initializeRealtime(polymer) {
  if (polymer.realtime === 'actioncable') {
    initializeActionCable(polymer, "CommentChannel");
  }
};

function initializeActionCable(polymer, channelName) {
  App.comment = App.cable.subscriptions.create(channelName, {
    connected: function() {
      console.log("Connected to the channel CommentChannel");
    },
    disconnected: function() {
      console.log("Disconnected to the channel CommentChannel");
    },
    received: function(data) {
      polymer.push('comments', data.comment);
    }
  });
};

Polymer({
  is: "display-comment",
  properties: {
    url: String,
    realtime: String
  },
  ready: function() {
    initializeRealtime(this);

    this.$.requestComments.url = this.url + "/comments";
    this.$.requestComments.generateRequest();
  },
  handleResponse: function (data) {
    this.comments = data.detail.response;
  },
  _format: function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  },
  _getImage: function() {
    return this.resolveUrl('generic-avatar.png');
  }
});
