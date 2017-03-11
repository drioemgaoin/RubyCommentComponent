import styleable from 'react-styleable'
import Textarea from 'react-textarea-autosize'
import css from "./comment"

@styleable(css)
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  format(date) {
    return moment(date).format(this.props.dateFormat);
  }

  image(avatar) {
    return avatar !== null ? avatar.thumb : this.props.defaultAvatar
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.avatar}><img src={this.image(this.props.comment.avatar)} /></div>
        <div className={css.infos}>
          <span>{this.props.comment.username}</span>
          <span>{this.format(this.props.comment.created_at)}</span>
        </div>
        <Textarea className={css.content} value={this.props.comment.content}></Textarea>
      </div>
    )
  }
}
