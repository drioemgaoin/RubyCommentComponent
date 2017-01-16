Polymer({
  is: "display-comment",
  properties: {
    genericAvatar: String,
    comments: {
      type: Array,
      notify: true
    }
  },
  add: function(comment) {
    this.push('comments', comment);
  }
});
