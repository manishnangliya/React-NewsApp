import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading.js'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  articles = []
  pageNo = 1
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      pageNo: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a17f729c44b46939296f9e9a9fe410f&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({
      pageNo: this.state.pageNo + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a17f729c44b46939296f9e9a9fe410f&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="container my-3">
        <h1 style={{ textAlign: "center", color: "white" }}>{`NewsApp - Top ${this.capitalizeFirstLetter(this.props.category)} News-heading`}</h1>

        {this.state.loading && <Loading/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="row my-3"  >
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-2" key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 86) : ""} imageUrl={element.urlToImage ? element.urlToImage : "	https://images.moneycontrol.com/static-mcnews/2022/05/bar-g7e5eaa827_1280-770x433.jpg"} newsUrl={element.url}
                  author={element.author} publishedAt={element.publishedAt} source={element.source} />
              </div>
            })}
          </div>
        </InfiniteScroll>
      </div>

    )
  }
}
