import style from "./ChangeArticleBody.css";
import marked from "marked";
import $ from "jquery";
import hljs from "highlight.js";
import React from "react";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);
import "../../directOutPutCss/hljsClass.css";
import "../../directOutPutCss/markdownCode.css";



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
        author:"加载中..."
      },
      preview:{
      },
      isauthor:false
    };
    this.HaddleSubmit = this.HaddleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.clickToSubmit = this.clickToSubmit.bind(this);
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
    data["_id"] = this.state.data._id;
    var newArticleID = "dd";
    $.ajax({
      url: "/blogChangeArticle/"+data._id,
      dataType: "json",
      cache: false,
      type: "POST",
      crossDomain: true,
      data: data,
      success: data => {
        newArticleID = JSON.parse(data).id
        alert("提交成功 " + newArticleID);
        
      },
      error:function(data){
        console.log(data)
        　　alert(data.id);
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
  componentWillMount() {
    let that=this
    console.log(that.props.articleID)
    console.log(that.props)
    console.log(that)

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
        console.log(this.state.data)
        console.log(ajaxdata)
        $.ajax({
          url: "/getUsername",
          dataType: "json",
          cache: false,
          crossDomain: true,
          success: data => {
            if (data === this.state.data.author) {
              console.log('true')
              this.setState({isauthor:true})
            }else{
              console.log('false')
              alert('您现在未登录，或者不是文章作者。\n操作权限不够，失败')
            }
          }
        });
      }
    });
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
              <li className={style.floatright} onClick={this.clickToSubmit}><i className={"fa fa-mail-forward "+style.submit_i}></i><span className={style.submit_span}>发布文章</span></li>
              <li className={style.floatright}><i className="fa fa-save"></i></li>
              <input type="submit" className={style.button} value=" " />
            </ul>
            <textarea 
              onChange={this.handleTextChange}
              value={this.state.data.text}
              className={style.articleInputText}
            />
            
          </form>
        </div>
        <div className={style.right}>
            <h1 className={style.h1preview}>{this.state.data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: marked(this.state.data.text)}} className='markdown'></div>
        </div>
        <div className={style.clear}></div>
      </div>
    );
  }
}

export default ChangeArticleBody;
