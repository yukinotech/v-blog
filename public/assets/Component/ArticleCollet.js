import React from "react";
import style from "./ArticleCollet.css";
import $ from "jquery";

class ArticleCollet extends React.Component {
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
    let listItems = this.state.data.slice(0, 7).map(item => {
      return <AritcleItemlist altItem={item} />;
    });
    return (
      <div>
        <div className={style.box}>
          <h2 className={style.boxtitle}>最新文章</h2>
          <div className={style.content}>
            <ul>{listItems}</ul>
          </div>
        </div>
      </div>
    );
  }
}

class AritcleItemlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className={style.li_item}>
        <a href={'/show?articleID=' + this.props.altItem._id}>
          {this.props.altItem.title}
        </a>
      </li>
    );
  }
}

export default ArticleCollet;
