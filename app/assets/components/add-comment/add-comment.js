Polymer({
  is: "add-comment",
  properties: {
    url: String,
    action: {
      type: String,
      computed: '_getAction(url)'
    }
  },
  _getAction(url) {
    return url + "/comments";
  }
});
