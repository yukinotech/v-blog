import React from "react";
import ReactDOM from "react-dom";
import "../css/main.css";
import Header from "./Component/Header.js";
import Footer from "./Component/Footer.js";
import ArticleShowBody from "./Component/ArticleShowBody.js";
import ChangeArticleBody from "./Component/ChangeArticleBody.js";
import $ from "jquery";

class ArticleShow extends React.Component {
  constructor(props) {
    super(props);

    this.articleID = "";
    this.state = {
      pagestate: "show",
      data: {
        _id: "111",
        title: "111",
        text: "11",
        overview: "11",
        date: "11",
        author: "11"
      },
      isauthor:false
    };

    this.geturl = this.geturl.bind(this);

  }
  componentWillMount() {
    this.geturl();
    let id = this.articleID;
    let that = this;
    $.ajax({
      url: "/Article/" + id,
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: data => {
        that.setState({ pagestate: "show", data: data[0] });
        $.ajax({
          url: "/getUsername",
          dataType: "json",
          cache: false,
          crossDomain: true,
          success: data => {
            if (data === that.state.data.author) {
              console.log('true')
              that.setState({isauthor:true})
            }else{
              console.log('false')
            }
          }
        });
      }
    });
  }
  geturl() {
    let url = window.location.href;
    let urlitem = url.split("?")[1];
    this.articleID = urlitem.split("=")[1];
    console.log(this.articleID);
  }

  // changePageState() {
  //   $.ajax({
  //     url: "/getUsername",
  //     dataType: "json",
  //     cache: false,
  //     crossDomain: true,
  //     success: data => {
  //       if (data === this.state.data.author) {
  //         if (this.state.pagestate === "show") {
  //           this.setState({
  //             pagestate: "change"
  //           });
  //         }
  //       }else{
  //         alert('没有权限，操作失败')
  //       }
  //     }
  //   });
  // }
  render() {
    if (this.state.pagestate === "show") {
      return (
        <div>
          <Header />
          <ArticleShowBody
            articleData={this.state.data}
            // changeState={this.changePageState}
            isauthor={this.state.isauthor}
          />
          <Footer />
        </div>
      );
    } 
    // else if (this.state.pagestate === "change") {
    //   return (
    //     <div>
    //       <Header />
    //       <ChangeArticleBody articleData={this.state.data} />
    //       <Footer />
    //     </div>
    //   );
    // }
  }
}

ReactDOM.render(<ArticleShow />, document.getElementById("root"));
