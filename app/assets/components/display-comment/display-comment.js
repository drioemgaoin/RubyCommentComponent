Polymer({
  is: "display-comment",
  properties: {
    url: String,
    realtime: {
      type: String,
      value: "actioncable"
    },
    formatDate: String,
    action: {
      type: String,
      computed: '_getAction(url)'
    }
  },
  listeners: {
    'received': '_received',
    'response': '_response'
  },
  _received: function(data) {
    this.push('comments', data.detail.comment);
  },
  _response: function (data) {
    this.comments = data.detail.response;
  },
  _format: function(date) {
    return moment(date).format(this.formatDate);
  },
  _getImage: function() {
    return this.resolveUrl('generic-avatar.png');
  },
  _getAction: function(url) {
    return url + "/comments";
  }
});
