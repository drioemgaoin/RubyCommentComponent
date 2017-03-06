var FormattedDate = ReactIntl.FormattedDate;

var DisplayComment = React.createClass({
  getInitialState: function() {
    return { items: [] }
  },

  componentDidMount: function() {
    $.getJSON('http://ruby-comment-api.herokuapp.com/comments', (response) => { this.setState({ items: response }) });
  },

  render: function() {
    var items = this.state.items.map((item) => {
      return (
        <div class="comment">
            <div class="comment-avatar"></div>
            <div class="comment-infos">
              <span class="username">{item.username}</span>
              <span class="created-at">{moment(item.created_at).format("MMMM Do YYYY, h:mm a")}</span>
            </div>
            <textarea>{item.content}</textarea>
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
