Polymer({
  is: "display-comment",
  properties: {
    url: String,
    realtime: {
      type: String,
      value: "actioncable"
    },
    formatDate: String
  },
  listeners: {
    'received': '_received'
  },
  ready: function() {
    this.$.requestComments.url = this.url + "/comments";
    this.$.requestComments.generateRequest();
  },
  _received: function(data) {
    this.push('comments', data.detail.comment);
  },
  handleResponse: function (data) {
    this.comments = data.detail.response;
  },
  _format: function(date) {
    return moment(date).format(this.formatDate);
  },
  _getImage: function() {
    return this.resolveUrl('generic-avatar.png');
  }
});
