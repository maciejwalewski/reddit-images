import React, { Component } from "react";

import SubredditChoice from "./MainPage/SubredditChoice";
import ImagesList from "./MainPage/ImagesList";
import Loader from "../shared/Loader";

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      subreddit: "",
      loading: false
    };

    this._fetchApi = this._fetchApi.bind(this);
    this._saveSubreddit = this._saveSubreddit.bind(this);
  }

  _fetchApi() {
    const { subreddit } = this.state;

    this.setState({
      posts: [],
      loading: true
    });

    let fetchedPosts = [];
    let nextUrl = "";
    let requestsCounter = 0;

    let fetchImages = () => {
      let fetchUrl = `https://www.reddit.com/r/${subreddit}/new/.json?limit=100`;
      let fetchNextUrl = `https://www.reddit.com/r/${subreddit}/new/.json?after=${nextUrl}&limit=100/`;
      fetch(nextUrl ? fetchNextUrl : fetchUrl)
        .then(res => {
          return res.json();
        })
        .then(res => {
          res.data.children.forEach(element => {
            if (
              element.data.url.match(/\.(jpeg|jpg|gif|png)$/) != null &&
              fetchedPosts.length < 50
            ) {
              fetchedPosts.push(element);
            }
          });

          this.setState({
            posts: fetchedPosts
          });

          if (
            fetchedPosts.length < 50 &&
            res.data.after &&
            requestsCounter < 15
          ) {
            nextUrl = res.data.after;
            requestsCounter++;
            fetchImages();
          } else if (fetchedPosts.length === 0) {
            alert("No results, please try another subreddit.");
            this.setState({
              loading: false
            });
          } else {
            nextUrl = "";
            this.setState({
              loading: false
            });
          }
        })
        .catch(err => {
          alert(`Something went wrong`, err);
          this.setState({
            loading: false
          });
        });
    };

    fetchImages();
  }

  _saveSubreddit(value) {
    let that = this;

    this.setState(
      {
        subreddit: value
      },
      () => {
        that._fetchApi();
      }
    );
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <main>
        <SubredditChoice sendSubreddit={this._saveSubreddit} />
        {loading ? <Loader /> : <ImagesList posts={posts} />}
      </main>
    );
  }
}

export default MainPage;
