import React from 'react'
import style from './ArticleShowListitem.css'

export default class Listitem extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return ( 
        <li className={style.article_item} >
          <h2 className={style.title}><a href={'/show?articleID='+this.props.altItem._id}>{this.props.altItem.title}</a></h2>
          <div className={style.info}></div>
          {/* <p className={style.overview}>{this.props.altItem.overview+'......'}</p> */}
          <p className={style.date}>
          <span className={style.icon}></span>
          {new Date(this.props.altItem.date).toLocaleDateString()}
          </p>
          <p className={style.date}>
          <span className={style.icon}></span>
          Last commit:
          {this.props.altItem.lastCommitDate?
          new Date(this.props.altItem.lastCommitDate).toLocaleString():
          new Date(this.props.altItem.date).toLocaleString()
          }
          </p>
        </li>
      );
    }
  }