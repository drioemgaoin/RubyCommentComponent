function create(file) {
  var script = document.createElement("script");
  script.src = file;
  document.head.appendChild(script);
}

Polymer({
  is: "display-comment",
  properties: {
    url: String,
    defaultAvatar: String,
    realtime: {
      type: String,
      value: "actioncable"
    },
    formatDate: String,
    action: {
      type: String,
      computed: '_getAction(url)'
    },
    momentjsVersion: {
      type: String,
      value: "2.17.1"
    }
  },
  listeners: {
    'received': '_received',
    'response': '_response'
  },
  attached: function() {
    if (typeof window.moment === "undefined") {
      create("https://cdnjs.cloudflare.com/ajax/libs/moment.js/" + this.momentjsVersion + "/moment.min.js");
    }
  },
  _received: function(data) {
    if (data.detail.action === 'add') {
      this.push('comments', data.detail.comment);
    } else if (data.detail.action === 'update') {
      var comment = this.comments.find(function(comment) { return comment.id === data.detail.comment.id; });
      this.splice('comments', this.comments.indexOf(comment), 1, data.detail.comment);
    } else if (data.detail.action === 'delete') {
      var comment = this.comments.find(function(comment) { return comment.id === data.detail.comment.id; });
      this.splice('comments', this.comments.indexOf(comment), 1);
    }
  },
  _orderByAscDate: function(comment1, comment2) {
    return new Date(comment1.created_at) - new Date(comment2.created_at);
  },
  _response: function (data) {
    this.comments = data.detail.response.sort(this._orderByAscDate);
  },
  _format: function(date) {
    return moment(date).format(this.formatDate);
  },
  _getImage: function(data) {
    return data.avatar !== null ? data.avatar.thumb : this.defaultAvatar;
  },
  _getAction: function(url) {
    return url + "/comments";
  }
});
