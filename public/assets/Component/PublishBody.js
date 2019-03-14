import style from "./PublishBody.css";
import marked from "marked";
import $ from "jquery";
import hljs from "highlight.js";
import React from "react";
import Switch from "antd/lib/switch";

import '../../directOutPutCss/hljsClass.css'
import '../../directOutPutCss/markdownCode.css'
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


class PublishBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        title: "",
        text: "",
        overview: "",
        date: new Date()
      },
      preview:{
      },
      isAlign: true,
      inleft: false,
      inright: false,
      leftarea: "",
      rightarea: ""
    };
    this.eventConlect = {
      leftmouseenter: () => {
        this.state.inleft = true;
        console.log(this.state)
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
    console.log(this.state.data)
  }
  HaddleSubmit(e) {
    var data = {};
    data["title"] = this.state.data.title;
    data["date"] = new Date();

    // var overview = this.editor.txt.text();
    // var length = overview.length < 120 ? overview.length : 120;
    // overview = overview.slice(0, length - 1);
    // console.log(overview);
    // data["overview"] = overview;

    // var text = this.editor.txt.html();
    data["text"] = this.state.data.text;
    console.log(data);
    var newArticleID = "dd";
    $.ajax({
      url: "/blogCreatArticle",
      dataType: "json",
      cache: false,
      type: "POST",
      crossDomain: true,
      data: data,
      success: data => {
        if (data === "no_login") {
          alert('请登陆后发布文章')
        } else {
          newArticleID = data;
          console.log(typeof newArticleID);

          alert("提交成功 " + newArticleID);
          // window.location.href = '/index.html'
        }
      }
    });

    e.preventDefault();
  }
  handleTextChange(e){
    let val =e.target.value;
    let data = Object.assign({},this.state.data,{text:val})
    this.setState({
      data: data
    });
    console.log(this.state.data)
  }
  clickToSubmit(e){
    this.HaddleSubmit()

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
  componentDidMount() {
    let leftarea = document.getElementById("leftarea");
    let rightarea = document.getElementById("rightarea");
    this.setState({ leftarea: leftarea, rightarea: rightarea }, () => {
      this.scrollAlign();
    });
  }
  scrollAlign() {
    let leftarea = document.getElementById("leftarea");
    let rightarea = document.getElementById("rightarea");

    leftarea.addEventListener("mouseenter", this.eventConlect.leftmouseenter);
    leftarea.addEventListener("mouseleave", this.eventConlect.leftmouseleave);
    leftarea.addEventListener("scroll", this.eventConlect.leftscroll);
    rightarea.addEventListener("mouseenter", this.eventConlect.rightmouseenter);
    rightarea.addEventListener("mouseleave", this.eventConlect.rightmouseleave);
    rightarea.addEventListener("scroll", this.eventConlect.rightscroll);
  }
  removeAlign() {
    let leftarea = document.getElementById("leftarea");
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
      <div className={style.PublishBody}>
        <div className={style.left}>
          <form onSubmit={this.HaddleSubmit}>
            <input
              type="text"
              className={style.articleInputTitle}
              value={this.state.data.title}
              onChange={this.handleTitleChange}
              placeholder="请输入title"
            />
            <ul className={style.editorNav}>
              <li className={style.floatright} onClick={this.clickToSubmit}><i className={"fa fa-mail-forward "+style.submit_i}></i><span className={style.submit_span}>发布文章</span></li>
              <li className={style.floatright}><i className="fa fa-save"></i></li>
              <input type="submit" className={style.button} value=" " />
            </ul>
            <textarea
              id="leftarea"
              onChange={this.handleTextChange}
              value={this.state.data.value}
              className={style.articleInputText}
            />
            
          </form>
        </div>
        <div className={style.right}  id="rightarea">
        <div>
            同步滚动:
            <Switch
              defaultChecked={this.state.isAlign}
              onChange={this.haddleAlignChange}
            />
          </div>
            <h1 className={style.h1preview}>{this.state.data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: marked(this.state.data.text)}} className='markdown'></div>
        </div>
        <div className={style.clear}></div>
      </div>
    );
  }
}

export default PublishBody;
