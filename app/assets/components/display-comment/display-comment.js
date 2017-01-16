Polymer({
  is: "display-comment",
  properties: {
    url: String
  },
  ready: function() {
    this.$.requestComments.url = this.url + "/comments";
    this.$.requestComments.generateRequest();
  },
  handleResponse: function (data) {
    this.comments = data.detail.response;
  },
  add: function(comment) {
    this.push('comments', comment);
  },
  _format: function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  },
  _getImage: function() {
    return this.resolveUrl('generic-avatar.png');
  }
});
