import React, { Component } from "react";

class SubredditChoice extends Component {
  constructor() {
    super();

    this.state = {
      subreddit: ""
    };

    this._updateSubreddit = this._updateSubreddit.bind(this);
    this._sendSubreddit = this._sendSubreddit.bind(this);
  }

  _updateSubreddit(event) {
    this.setState({
      subreddit: event.target.value
    });
  }

  _sendSubreddit(event) {
    event.preventDefault();

    const { sendSubreddit } = this.props;

    sendSubreddit(this.state.subreddit);
  }

  render() {
    return (
      <section id="subreddit-choice" className="container">
        <div className="sub-choice">
          <header className="sub-choice__header">
            Welcome to Reddit Image Viewer
          </header>
          <p className="sub-choice__instruction">
            Feel free to type your favorite subreddit below
          </p>
          <form className="choice-form">
            <input
              className="choice-form__input"
              type="text"
              value={this.state.subreddit}
              onChange={this._updateSubreddit}
              placeholder="e.g. funny"
            />
            <button
              className="choice-form__submit"
              type="submit"
              onClick={this._sendSubreddit}
            >
              Find images!
            </button>
          </form>
          <span className="sub-choice__note">
            Please keep in mind, that some of the subreddits contain few or none
            images.
          </span>
        </div>
      </section>
    );
  }
}

export default SubredditChoice;
