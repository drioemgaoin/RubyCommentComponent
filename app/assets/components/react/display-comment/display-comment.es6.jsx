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
    this.setupSubscription();

    $.getJSON(this.props.url + '/comments', (response) => { this.setState({ items: response }) });
  }

  format(date) {
    return moment(date).format(this.props.dateFormat);
  }

  getImage(avatar) {
    return avatar !== null ? avatar.thumb : this.props.defaultAvatar;
  }

  orderByAscDate(comment1, comment2) {
    return new Date(comment1.created_at) - new Date(comment2.created_at);
  }

  updateCommentList(data) {
    if (data.action === 'add') {
      this.setState({items: this.state.items.concat([data.comment])})
    } else if (data.action === 'update') {
      const comments = this.state.items.map(item => item.id === data.comment.id
        ? data.comment : item)
      this.setState({ items: comments })
    } else if (data.action === 'delete') {
      const comments = this.state.items.filter(item => item.id !== data.comment.id)
      this.setState({ items: comments })
    }
  }

  setupSubscription(){
    const self = this;

    App.comments = App.cable.subscriptions.create(self.props.channelName, {
      connected: function () {
        console.log("Connected to the channel " + self.props.channelName);
      },

      disconnected: function() {
        console.log("Disconnected to the channel " + self.props.channelName);
      },

      received: function (data) {
        console.log("Data received on the channel " + self.props.channelName + ": " + JSON.stringify(data));
        self.updateCommentList(data);
      },

      updateCommentList: this.updateCommentList

    });
  }

  render() {
    var items = this.state.items.sort(this.orderByAscDate).map((item) => {
      return (
        <div key={item.id} className={css.root}>
          <div className={css.avatar}><img src={this.getImage(item.avatar)} /></div>
          <div className={css.infos}>
            <span>{item.username}</span>
            <span>{this.format(item.created_at)}</span>
          </div>
          <Textarea className={css.content} value={item.content}></Textarea>
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
  defaultAvatar: React.PropTypes.string,
  dateFormat: React.PropTypes.string,
  channelName: React.PropTypes.string
};

window.DisplayComment = DisplayComment
