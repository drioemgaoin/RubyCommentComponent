Polymer({
  is: "display-comment",
  properties: {
    genericAvatar: String,
    comments: {
      type: Array,
      notify: true
    }
  },
  ready: function() {
    var self = this;
  },
  add: function(comment) {
    this.push('comments', comment);
  },
  _format: function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a')
  }
});
