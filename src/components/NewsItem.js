import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,imageUrl,newsUrl,author,publishedAt,source} = this.props;
    return (
      <div className="card container" style={{width: "19rem"}}>
        <img src={imageUrl}  className="card-img-top" alt="..."/>
          <div className="card-body">
          <span className="badge text-bg-danger">{source.name}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">{`By ${author?author:"UnKnown"} At ${new Date(publishedAt).toLocaleString()}`}</small></p>
            <a href={newsUrl} rel="noreferrer" target = "_blank" className="btn btn-sm btn-dark">Read More..</a>
          </div>
      </div>
    )
  }
}
