import styleable from 'react-styleable'
import Textarea from 'react-textarea-autosize';
import css from "./display-comment"

@styleable(css)
export default class DisplayComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    $.getJSON(this.props.url + '/comments', (response) => { this.setState({ items: response }) });
  }

  format(date) {
    return moment(date).format(this.props.dateFormat);
  }

  getImage(avatar) {
    return avatar !== null ? avatar.thumb : this.props.defaultAvatar;
  }

  render() {
    var items = this.state.items.map((item) => {
      return (
        <div key={item.id} className={css.root}>
          <div className={css.avatar}><img src={this.getImage(item.avatar)} /></div>
          <div className={css.infos}>
            <span>{item.username}</span>
            <span>{this.format(item.created_at)}</span>
          </div>
          <Textarea className={css.content} defaultValue={item.content}></Textarea>
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
