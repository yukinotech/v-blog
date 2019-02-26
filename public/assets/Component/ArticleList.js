import React from "react";
import style from "./ArticleList.css";
import $ from "jquery";


class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  getlistItemJson() {
    $.ajax({
      url: "/blog",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: data => {
          data.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          this.setState({ data: data }); 
      }
    });
  }
  componentDidMount() {
    this.getlistItemJson();
  }
  render() {
    function listItemsMaker() {
      let listItems = this.state.data.map(item => {
        return <Listitem altItem={item} />;
      });
      return listItems;
    }
    let listItems = listItemsMaker.bind(this)();
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
class Listitem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return ( 
      <li className={style.article_item}>
        <h2 className={style.title}><a href={'/show?articleID='+this.props.altItem._id}>{this.props.altItem.title}</a></h2>
        <p className={style.overview}>{this.props.altItem.overview+'......'}</p>
        <p className={style.date}><span className={style.icon}></span>{new Date(this.props.altItem.date).toLocaleString()}</p>
      </li>
    );
  }
}

export default ArticleList;
