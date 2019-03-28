import React from "react";
import ArticleShowLists from "./ArticleShowComponent/ArticleShowLists.js";
import $ from "jquery";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    let currentPage=this.props.match.params.pagenumber
    currentPage=currentPage?currentPage:1
    this.state = {
      data: [],
      currentPage: parseInt(currentPage),
      pageSize: 10,
      datalength: 0
    };
    this.pageUpdate = this.pageUpdate.bind(this);
    this.stop = this.stop.bind(this);
  }
  componentDidMount() {
    $.ajax({
      url: "/findArticleAll?currentPage=1&pageSize=10",
      type: "GET",
      dataType: "json",
      success: data => {
        this.setState({
          data: data.data,
          datalength: data.itemlength
        });
      }
    });
  }
  pageUpdate(e) {
    // e.preventDefault();
    let pagenumber = e.target.dataset.pagenumber;
    $.ajax({
      url: "/findArticleAll?currentPage=" + pagenumber + "&pageSize=10",
      type: "GET",
      dataType: "json",
      success: data => {
        this.setState({
          data: data.data,
          datalength: data.itemlength,
          currentPage: parseInt(pagenumber)
        });
      }
    });
  }
  stop(e) {
    e.preventDefault();
  }
  render() {
    return (
          <ArticleShowLists
            {...this.state}
            pageUpdate={this.pageUpdate}
            stop={this.stop}
          />
    );
  }
}

export default ArticleList;
