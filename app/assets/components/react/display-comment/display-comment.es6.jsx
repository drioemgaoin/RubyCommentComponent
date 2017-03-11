import Comment from './comment.es6.jsx'

export default class DisplayComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
  }

  componentDidMount() {
    this.setupSubscription();

    $.getJSON(this.props.url + '/comments', (comments) => { this.setState({ comments: comments }) });
  }

  orderByAscDate(comment1, comment2) {
    return new Date(comment1.created_at) - new Date(comment2.created_at);
  }

  updateCommentList(data) {
    if (data.action === 'add') {
      this.setState({ comments: this.state.comments.concat([data.comment]) })
    } else if (data.action === 'update') {
      const comments = this.state.comments.map(comment => comment.id === data.comment.id ? data.comment : comment)
      this.setState({ comments: comments })
    } else if (data.action === 'delete') {
      const comments = this.state.comments.filter(comment => comment.id !== data.comment.id)
      this.setState({ comments: comments })
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
    var items = this.state.comments.sort(this.orderByAscDate).map((comment) => {
      return (<Comment key={comment.id} comment={comment} defaultAvatar={this.props.defaultAvatar} />)
    });

    return(<div>{items}</div>)
  }
}

window.DisplayComment = DisplayComment
