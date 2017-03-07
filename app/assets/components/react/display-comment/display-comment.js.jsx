var DisplayComment = React.createClass({
  getInitialState: function() {
    return {
      url: this.props.url,
      defaultAvatar: this.props.defaultAvatar,
      items: []
    }
  },

  componentDidMount: function() {
    $.getJSON(this.state.url + '/comments', (response) => { this.setState({ items: response }) });
  },

  format: function(date) {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  },

  getImage: function(avatar) {
    return avatar !== null ? avatar.thumb : this.state.defaultAvatar;
  },

  render: function() {
    var items = this.state.items.map((item) => {
      return (
        <div key={item.id} class="comment">
          <div class="comment-avatar"><img src={this.getImage(item.avatar)} /></div>
          <div class="comment-infos">
            <span class="username">{item.username}</span>
            <span class="created-at">{this.format(item.created_at)}</span>
          </div>
          <textarea defaultValue={item.content}></textarea>
        </div>
      )
    });

    return(
        <div>
            {items}
        </div>
    )
  }
});
