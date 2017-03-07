class DisplayComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      defaultAvatar: this.props.defaultAvatar,
      items: []
    };
  }

  componentDidMount() {
    $.getJSON(this.state.url + '/comments', (response) => { this.setState({ items: response }) });
  }

  format(date) {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  }

  getImage(avatar) {
    return avatar !== null ? avatar.thumb : this.state.defaultAvatar;
  }

  render() {
    var items = this.state.items.map((item) => {
      return (
        <div key={item.id} className="comment">
          <div className="comment-avatar"><img src={this.getImage(item.avatar)} /></div>
          <div className="comment-infos">
            <span className="username">{item.username}</span>
            <span className="created-at">{this.format(item.created_at)}</span>
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
}
