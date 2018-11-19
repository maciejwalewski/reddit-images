import React, { Component } from "react";

class EachImage extends Component {
  constructor() {
    super();

    this.state = {
      voting: 0
    };
  }

  componentDidMount() {
    const { item } = this.props;

    this.setState({
      voting: item.data.ups - item.data.downs
    });
  }

  render() {
    const { item } = this.props;

    const { voting } = this.state;

    return (
      <div className="eachImage">
        <a target="blank" href={`https://www.reddit.com${item.data.permalink}`}>
          <img className="eachImage__image" alt="" src={item.data.url} />
        </a>
        <p className="eachImage__title">{item.data.title}</p>
        <div className="voting">
          {voting >= 0 ? (
            <span className="voting__up">
              {voting > 0 && "+"}
              {this.state.voting}
            </span>
          ) : (
            <span className="voting__down">-{this.state.voting}</span>
          )}
        </div>
      </div>
    );
  }
}

export default EachImage;
