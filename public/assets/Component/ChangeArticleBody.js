import style from "./ChangeArticleBody.css";
import marked from "marked";
import $ from "jquery";
import hljs from "highlight.js";
import React from "react";
import Switch from "./commonComponent/Switch.js";

import "../../directOutPutCss/hljsClass.css";
import "../../directOutPutCss/markdownCode.css";
import "../../directOutPutCss/antd.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlight("javascript", code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

class ChangeArticleBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "a",
        title: "加载中...",
        text: "加载中...",
        overview: " ",
        date: new Date(),
        author: "加载中..."
      },
      preview: {},
      isauthor: false,
      isAlign: true,
      inleft: false,
      inright: false,
      leftarea: "",
      rightarea: ""
    };
    this.eventConlect = {
      leftmouseenter: () => {
        this.state.inleft = true;
      },
      leftmouseleave: () => {
        this.state.inleft = false;
      },
      leftscroll: () => {
        if (this.state.inleft) {
          this.state.rightarea.scrollTop = this.state.leftarea.scrollTop;
        }
      },
      rightmouseenter: () => {
        this.state.inright = true;
      },
      rightmouseleave: () => {
        this.state.inright = false;
      },
      rightscroll: () => {
        if (this.state.inright) {
          this.state.leftarea.scrollTop = this.state.rightarea.scrollTop;
        }
      }
    };
    this.HaddleSubmit = this.HaddleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.clickToSubmit = this.clickToSubmit.bind(this);
    this.haddleAlignChange = this.haddleAlignChange.bind(this);
    this.scrollAlign = this.scrollAlign.bind(this);
    this.removeAlign = this.removeAlign.bind(this);
  }

  handleTitleChange(e) {
    let val = e.target.value;
    let data = Object.assign({}, this.state.data, { title: val });
    this.setState({
      data: data
    });
    console.log(this.state.data);
  }
  HaddleSubmit() {
    var data = {};
    data["title"] = this.state.data.title;
    data["lastCommitDate"] = new Date();

    // var overview = this.editor.txt.text();
    // var length = overview.length < 120 ? overview.length : 120;
    // overview = overview.slice(0, length - 1);
    // console.log(overview);
    // data["overview"] = overview;

    // var text = this.editor.txt.html();
    data["text"] = this.state.data.text;
    console.log(data);
    data["_id"] = this.state.data._id;
    var newArticleID = "dd";
    $.ajax({
      url: "/blogChangeArticle/" + data._id,
      dataType: "json",
      cache: false,
      type: "POST",
      crossDomain: true,
      data: data,
      success: data => {
        newArticleID = JSON.parse(data).id;
        alert("提交成功 " + newArticleID +'\n'+'跳回首页');
        window.location.href='/'
      },
      error: function(data) {
        console.log(data);
        alert(data.id);
      }
    });

    
  }
  handleTextChange(e) {
    let val = e.target.value;
    let data = Object.assign({}, this.state.data, { text: val });
    this.setState({
      data: data
    });
    console.log(this.state.data);
  }
  clickToSubmit(e) {
    e.preventDefault();
    this.HaddleSubmit();
  }
  haddleAlignChange() {
    this.setState(
      (state, props) => {
        console.log(this.state);
        return { isAlign: !state.isAlign };
      },
      () => {
        if (this.state.isAlign) {
          console.log("加入scroll");
          this.scrollAlign();
        } else {
          console.log("删除scroll");
          this.removeAlign();
        }
      }
    );
  }
  componentWillMount() {
    let that = this;
    console.log(that.props.articleID);
    console.log(that.props);
    console.log(that);

    $.ajax({
      url: "/Article/" + that.props.articleID,
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: data => {
        let ajaxdata = Object.assign({}, this.state.data, { ...data[0] });
        this.setState({
          data: ajaxdata
        });
        // that.setState({data:data})
        console.log(this.state.data);
        console.log(ajaxdata);
        $.ajax({
          url: "/getUsername",
          dataType: "json",
          cache: false,
          crossDomain: true,
          success: data => {
            if (data === this.state.data.author) {
              console.log("true");
              this.setState({ isauthor: true });
            } else {
              console.log("false");
              alert("您现在未登录，或者不是文章作者。\n操作权限不够，失败");
            }
          }
        });
      }
    });
  }
  componentDidMount() {
    let leftarea = document.getElementById("lefrarea");
    let rightarea = document.getElementById("rightarea");
    this.setState({ leftarea: leftarea, rightarea: rightarea }, () => {
      this.scrollAlign();
    });
  }
  scrollAlign() {
    let leftarea = document.getElementById("lefrarea");
    let rightarea = document.getElementById("rightarea");

    leftarea.addEventListener("mouseenter", this.eventConlect.leftmouseenter);
    leftarea.addEventListener("mouseleave", this.eventConlect.leftmouseleave);
    leftarea.addEventListener("scroll", this.eventConlect.leftscroll);
    rightarea.addEventListener("mouseenter", this.eventConlect.rightmouseenter);
    rightarea.addEventListener("mouseleave", this.eventConlect.rightmouseleave);
    rightarea.addEventListener("scroll", this.eventConlect.rightscroll);
  }
  removeAlign() {
    let leftarea = document.getElementById("lefrarea");
    let rightarea = document.getElementById("rightarea");
    leftarea.removeEventListener(
      "mouseenter",
      this.eventConlect.leftmouseenter
    );
    leftarea.removeEventListener(
      "mouseleave",
      this.eventConlect.leftmouseleave
    );
    leftarea.removeEventListener("scroll", this.eventConlect.leftscroll);
    rightarea.removeEventListener(
      "mouseenter",
      this.eventConlect.rightmouseenter
    );
    rightarea.removeEventListener(
      "mouseleave",
      this.eventConlect.rightmouseleave
    );
    rightarea.removeEventListener("scroll", this.eventConlect.rightscroll);
  }
  render() {
    return (
      <div className={style.ChangeArticleBody}>
        <div className={style.left}>
          <form onSubmit={this.HaddleSubmit}>
            <input
              type="text"
              className={style.articleInputTitle}
              value={this.state.data.title}
              onChange={this.handleTitleChange}
            />
            <ul className={style.editorNav}>
              <li className={style.floatright} onClick={this.clickToSubmit}>
                <i className={"fa fa-mail-forward " + style.submit_i} />
                <span className={style.submit_span}>发布文章</span>
              </li>
              <li className={style.floatright}>
                <i className="fa fa-save" />
              </li>
              <li className={style.floatright}>
                <i className="fa fa-book" />
              </li>
              <input type="submit" className={style.button} value=" " />
            </ul>
            <textarea
              id="lefrarea"
              onChange={this.handleTextChange}
              value={this.state.data.text}
              className={style.articleInputText}
            />
          </form>
        </div>
        <div className={style.right} id="rightarea">
        <div>
            <label className={style.chuizhiMiddle}>同步滚动:</label>
            <Switch
              Checked={this.state.isAlign}
              onChange={this.haddleAlignChange}
            />
          </div>
          <h1 className={style.h1preview}>{this.state.data.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: marked(this.state.data.text) }}
            className="markdown"
          />
        </div>
        <div className={style.clear} />
      </div>
    );
  }
}

export default ChangeArticleBody;
