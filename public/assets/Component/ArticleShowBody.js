import React from "react";
import style from "./ArticleShowBody.css";
import ArticleCollet from "./ArticleCollet.js"

import marked from "marked";
import hljs from "highlight.js";
import imgitem from "../../img/62351480_0.jpg"
import "../../directOutPutCss/hljsClass.css";
import "../../directOutPutCss/markdownCode.css";


marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
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


class ArticleShowBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        title: "",
        text: "",
        overview: "",
        date: "",
        author:""
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     data: nextProps.articleData,
    });
   }
  componentWillMount() {
    this.setState({data:this.props.articleData})
  }
  // changeArticle(){
  //   this.props.changeState()
  // }
  render() {
    var htmlcode={__html:marked(this.state.data.text)}
    return (
      <div className={style.mainbody}>
        <div className={style.left}>
          <h1 className={style.title}>标题:{this.state.data.title}</h1>
          <div className={style.author}>
            <a className={style.avatar} href=""><img src={imgitem} alt=""/></a>
            <div className={style.info}>
              <span className={style.authorName}><a href="">{this.state.data.author}</a></span>
              <div className={style.meta}>
                <span className={style.publishtime}>{new Date(this.state.data.date).toLocaleString()}</span>
              </div>
            </div>
            {this.props.isauthor?<a href="" className={style.edit}>修改文章</a>:null}
          </div>
          {/* <p>最后一次发布时间:{new Date(this.state.data.date).toLocaleString()}</p>
          <p>作者:{this.state.data.author}</p>
          <input type="button" value="修改文章" onClick={this.changeArticle.bind(this)}/> */}
          <div className={style.textcontainner}>
            <div className="markdown" dangerouslySetInnerHTML={htmlcode}></div>
          </div>
          {this.props.articleID}
        </div>
        <div className={style.right}>
          <ArticleCollet ></ArticleCollet> 
        </div>
        <div className={style.clear}></div>
      </div>
    );
  }
}

export default ArticleShowBody;
