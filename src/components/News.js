import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading.js'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a17f729c44b46939296f9e9a9fe410f&page=${pageNo}&pageSize=${props.pageSize}`
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(()=>{
    updateNews();
  },[])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a17f729c44b46939296f9e9a9fe410f&page=${pageNo+1}&pageSize=${props.pageSize}`
    setPageNo(pageNo + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 style={{ textAlign: "center", color: "white", marginTop:"44px" }}>{`NewsApp - Top ${capitalizeFirstLetter(props.category)} News-heading`}</h1>

      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="row my-3"  >
          {articles.map((element) => {
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
export default News
