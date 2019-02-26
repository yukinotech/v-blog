import React from "react";
import style from "./PublishBody.css";
import $ from "jquery";
import E from "wangeditor";

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
      }
    };
    this.HaddleSubmit = this.HaddleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(e) {
    let val = e.target.value;
    let data = Object.assign({}, this.state.data, { title: val });
    this.setState({
      data: data
    });
  }
  HaddleSubmit(e) {
    var data = {};
    data["title"] = this.state.data.title;
    data["date"] = new Date();

    var overview = this.editor.txt.text();
    var length = overview.length < 120 ? overview.length : 120;
    overview = overview.slice(0, length - 1);
    console.log(overview);
    data["overview"] = overview;

    var text = this.editor.txt.html();
    data["text"] = text;
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

  componentDidMount() {
    const elem = this.refs.editorElem;
    const editor = new E(elem);
    this.editor = editor;
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      let data = Object.assign({}, this.state.data, { text: html });
      this.setState({
        data: data
      });
    };

    editor.create();

    editor.$textElem[0].parentNode.style.height = "400px";
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
            />
            <div ref="editorElem" className={style.articleInputText} />
            <input type="submit" className={style.button} value="提交" />
          </form>
        </div>
        <div className={style.right} />
      </div>
    );
  }
}

export default PublishBody;
