import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading.js'

export default class News extends Component {
  articles = []
  pageNo=1
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      pageNo: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a17f729c44b46939296f9e9a9fe410f&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
       articles: parsedData.articles,
       total : parsedData.totalResults,
       loading:false
     });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreButton = async () =>{
    this.setState({
      pageNo : this.state.pageNo-1
    });
    this.updateNews();

  }
  handleNextButton = async () =>{
    this.setState({
      pageNo : this.state.pageNo+1
    });
    this.updateNews();
  }
  
  render() {
    return (
      <div className="container my-3">
        <h1 style={{ textAlign: "center" , color: "white" }}>{`NewsApp - Top ${this.capitalizeFirstLetter(this.props.category)} News-heading`}</h1>

        {this.state.loading && <Loading/>}

        <div className="row my-3"  >
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col-md-4 my-2" key={element.url} >
              <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 86) : ""} imageUrl={element.urlToImage ? element.urlToImage : "	https://images.moneycontrol.com/static-mcnews/2022/05/bar-g7e5eaa827_1280-770x433.jpg"} newsUrl={element.url} 
              author={element.author} publishedAt = {element.publishedAt}  source = {element.source}/>
            </div>
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled ={this.state.pageNo<=1} onClick={this.handlePreButton} type="button" className="btn btn-dark">&larr; Prev</button>
          <button disabled ={this.state.pageNo>= Math.ceil( this.state.total/this.props.pageSize)} type="button" onClick={this.handleNextButton} className="btn btn-dark">Next  &rarr;</button>
        </div>
      </div>

    )
  }
}
