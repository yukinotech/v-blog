import React from "react";
import style from "./ArticleShowBody.css";
import ArticleCollet from "./ArticleCollet.js"

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
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     data: nextProps.articleData
    });
   }
  componentWillMount() {
    this.setState({data:this.props.articleData})
  }
  changeArticle(){
    this.props.changeState()
  }
  render() {
    var htmlcode={__html:this.state.data.text}
    return (
      <div className={style.mainbody}>
        <div className={style.left}>
          <p>标题:{this.state.data.title}</p>
          <p>最后一次发布时间:{new Date(this.state.data.date).toLocaleString()}</p>
          <p>作者:{this.state.data.author}</p>
          <input type="button" value="修改文章" onClick={this.changeArticle.bind(this)}/>
          <div dangerouslySetInnerHTML={htmlcode} className={style.textcontainner}></div>
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
