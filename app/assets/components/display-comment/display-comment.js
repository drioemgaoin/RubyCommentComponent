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
    this.push('comments', data.detail.comment);
  },
  _response: function (data) {
    this.comments = data.detail.response;
  },
  _format: function(date) {
    return moment(date).format(this.formatDate);
  },
  _getImage: function() {
    return this.defaultAvatar;
  },
  _getAction: function(url) {
    return url + "/comments";
  }
});
