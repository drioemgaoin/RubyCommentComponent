import styleable from 'react-styleable'
import css from "./add-comment"

export default class AddComment extends React.Component {
  constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = this.initState()
  }

  initState() {
    return {
      comment: {
        username: "",
        content: ""
      }
    }
  }

  handleInputChange(event) {
    let state = this.state.comment
    state[event.target.name] = event.target.value

    this.setState({ comment: state });
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      url: this.props.url + '/comments',
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function(data) {
        this.setState(this.initState());
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return(
      <div className={css.root}>
        <h2>Add comment</h2>

        <form method="post" onSubmit={this.handleSubmit} className={css.form}>
          <div className={css.field}>
            <label className={css.label}>Username</label>
            <input id="username"
              className={css.input}
              name="username"
              type="text"
              value={this.state.comment.username}
              onChange={this.handleInputChange} />
          </div>

          <div className={css.field}>
            <label className={css.label}>Content</label>
            <textarea id="content"
              className={css.textarea}
              name="content"
              type="text"
              value={this.state.comment.content}
              onChange={this.handleInputChange}></textarea>
          </div>

          <input className={css.input} type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

window.AddComment = AddComment
