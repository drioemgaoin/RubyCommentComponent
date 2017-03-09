import styleable from 'react-styleable'

import css from "./display-comment"

@styleable(css)
export default class DisplayComment extends React.Component {
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
      console.log(this.props);
      return (
        <div key={item.id} className={css.root}>
          <div className={css.avatar}><img src={this.getImage(item.avatar)} /></div>
          <div className={css.infos}>
            <span>{item.username}</span>
            <span>{this.format(item.created_at)}</span>
          </div>
          <label className={css.body}>{item.content}</label>
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

DisplayComment.propTypes = {
  url: React.PropTypes.string,
  defaultAvatar: React.PropTypes.string
};

window.DisplayComment = DisplayComment
