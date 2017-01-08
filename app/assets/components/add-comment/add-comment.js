Polymer({
  is: "add-comment",
  properties: {
    apiUrl: String
  },
  ready: function() {
    this.$.form.action = this.apiUrl + "/comments";
  }
});
