Polymer({
  is: "display-comment",
  properties: {
    apiUrl: String,
    items: {
      comments: Array
    }
  },
  ready: function() {
    this.$.requestComments.url = this.apiUrl + "/comments";
    this.$.requestComments.generateRequest();
  },
  handleResponse: function (data) {
      this.comments = data.detail.response;
  }
});
