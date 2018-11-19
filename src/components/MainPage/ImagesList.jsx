import React, { Component } from "react";

import EachImage from "./ImagesList/EachImage";

class ImagesList extends Component {
  constructor() {
    super();

    this.state = {
      scrolledFromTop: 0
    };

    this._scrollToTop = this._scrollToTop.bind(this);
  }

  componentDidMount() {
    window.onscroll = () => {
      this.setState({
        scrolledFromTop: window.scrollY
      });
    };
  }

  _scrollToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const { posts } = this.props;

    const { scrolledFromTop } = this.state;

    return (
      <section id="images-list" className="imagesList">
        {posts.map((item, index) => {
          return <EachImage key={index} item={item} />;
        })}
        {scrolledFromTop > 200 && (
          <button className="imagesList__scrolltop" onClick={this._scrollToTop}>
            Up!
          </button>
        )}
      </section>
    );
  }
}

export default ImagesList;
