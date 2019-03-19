import React from "react";
import style from "./ArticleList.css";
import $ from "jquery";


class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      currentPage:1,
      pageSize:10,
      datalength:0
  }
  this.pageUpdate = this.pageUpdate.bind(this)
  this.stop = this.stop.bind(this)
  }
  componentDidMount() {
    $.ajax({
      url:'/findArticleAll?currentPage=1&pageSize=10',
      type:'GET',
      dataType:'json',
      success:(data)=>{
          this.setState({
              data:data.data,
              datalength:data.itemlength
          })
      }
  })
  }
  pageUpdate(e){
    e.preventDefault();
    let pagenumber=e.target.dataset.pagenumber
    $.ajax({
        url:'/findArticleAll?currentPage='+pagenumber+'&pageSize=10',
        type:'GET',
        dataType:'json',
        success:(data)=>{
            this.setState({
                data:data.data,
                datalength:data.itemlength,
                currentPage:parseInt(pagenumber)
            })
            console.log(this.state)
        }
    })
  }
  stop(e){
      e.preventDefault()
  }
  render() {
    //list li条目渲染
    function listItemsMaker() {
      let listItems = this.state.data.map((item,index) => {
        return <Listitem altItem={item} key={'Listitem'+index}/>;
      });
      return listItems;
    }
    let listItems = listItemsMaker.bind(this)();
    //制作分页
    let pagesNumber = this.state.datalength / this.state.pageSize
        pagesNumber = Math.ceil(pagesNumber)
        let PageDomList = []
        //添加首页分页
        if(this.state.currentPage===1){
            PageDomList.push(
                <a className={style.pageFirstItem+' '+style.pageItem} key={`list-${'home'}`} href='' onClick={this.stop} data-pagenumber='1'>首页</a>
            ) 
        } else{
            PageDomList.push(
                <a className={style.pageFirstItem+' '+style.pageItem} key={`list-${'home'}`} href='' onClick={this.pageUpdate} data-pagenumber='1'>首页</a>
            ) 
        }
        //上一页
        PageDomList.push(
            this.state.currentPage-1>=1?
            (<a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'beforePage'}`} href='' onClick={this.pageUpdate} data-pagenumber={this.state.currentPage-1}>上一页</a>)
            :(<a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'beforePage'}`} href='' onClick={this.stop} data-pagenumber={1}>上一页</a>)
        ) 
        //下一页
        PageDomList.push(
            this.state.currentPage+1<=pagesNumber?
            (<a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'afterPage'}`} href='' onClick={this.pageUpdate} data-pagenumber={this.state.currentPage+1}>下一页</a>)
            :(<a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'afterPage'}`} href='' onClick={this.stop} data-pagenumber={pagesNumber}>下一页</a>)
        ) 
        //中间分页
        if(pagesNumber<=5){
            for(let i=1;i<=pagesNumber;i++){
                let classname = i===this.state.currentPage?(style.pageItem+' '+style.pageItemSelect):
                style.pageItem;
                if(i===this.state.currentPage){
                    PageDomList.push(
                        <a className={classname} key={`list-${i}`} href='' onClick={this.stop} data-pagenumber={i}>-{i}-</a>
                    ) 
                }else{
                    PageDomList.push(
                        <a className={classname} key={`list-${i}`} href='' onClick={this.pageUpdate}
                        data-pagenumber={i}>{i}</a>
                    ) 
                }

            }
        } else if(5<pagesNumber){
            let {currentPage}=this.state
            for(let i=currentPage-2;i<currentPage+3;i++){
                if(i>0 && i<=pagesNumber){
                    let classname = i===this.state.currentPage?(style.pageItem+' '+style.pageItemSelect):
                    style.pageItem;
                    if(i===this.state.currentPage){
                        PageDomList.push(
                            <a className={classname} key={`list-${i}`} href='' onClick={this.stop} data-pagenumber={i}>-{i}-</a>
                        ) 
                    }else{
                        PageDomList.push(
                            <a className={classname} key={`list-${i}`} href='' onClick={this.pageUpdate}
                            data-pagenumber={i}>{i}</a>
                        ) 
                    }
                }
            }
        }
        //添加尾页分页
        if(this.state.currentPage===pagesNumber){
            PageDomList.push(
                <a className={style.pageFirstItem+' '+style.pageItem} key={`list-${'last'}`} href='' onClick={this.stop} data-pagenumber={pagesNumber}>尾页</a>
            ) 
        } else{
            PageDomList.push(
                <a className={style.pageFirstItem+' '+style.pageItem} key={`list-${'last'}`} href='' onClick={this.pageUpdate} data-pagenumber={pagesNumber}>尾页</a>
            ) 
        }
        //添加总页数标签
        if(this.state.currentPage===pagesNumber){
            PageDomList.push(
                <a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'all'}`} href='' onClick={this.stop} data-pagenumber={pagesNumber}>...共{pagesNumber}页</a>
            ) 
        }
         else{
        PageDomList.push(
            <a className={style.pageLastPageItem+' '+style.pageItem} key={`list-${'all'}`} href='' onClick={this.pageUpdate} data-pagenumber={pagesNumber}>...共{pagesNumber}页</a>
        ) 
         }
    return (
      <div>
        <ul className={style.ulbox}>{PageDomList}</ul>
        <ul>{listItems}</ul>
        <ul className={style.ulbox}>{PageDomList}</ul>
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
      <li className={style.article_item} >
        <h2 className={style.title}><a href={'/show?articleID='+this.props.altItem._id}>{this.props.altItem.title}</a></h2>
        <div className={style.info}></div>
        {/* <p className={style.overview}>{this.props.altItem.overview+'......'}</p> */}
        <p className={style.date}><span className={style.icon}></span>{new Date(this.props.altItem.date).toLocaleString()}</p>
      </li>
    );
  }
}

export default ArticleList;
