import React from 'react'
import $ from 'jquery'
import style from './ArticleManageArticleList.css'

class ArticleManageArticleList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            currentPage:1,
            pageSize:10,
            datalength:0
        }
        this.deleteArticle=this.deleteArticle.bind(this)
        this.haddleDelete=this.haddleDelete.bind(this)
        this.pageUpdate=this.pageUpdate.bind(this)
    }
    componentDidMount(){
        $.ajax({
            url:'/findArticle?currentPage=1&pageSize=10',
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
    deleteArticle(_id){
        $.ajax({
          type: "POST",
          url: '/articleDelete/'+_id,
          dataType: "json",
          cache: false,
          crossDomain: true,
          success: data => {
            if (data) {
              console.log(data)
              if(data==='delete_success'){
                alert('删除成功')
              }
            }else{
                alert('删除失败')
              console.log('ajax false')
            }
          }
        });
        
    }
    haddleDelete(e){
        e.preventDefault();
        let id=e.target.dataset.articleid
        let isDelete=confirm('你确定要删除吗？')
        isDelete?this.deleteArticle(id):null
        $.ajax({
            url:'/findArticle?currentPage=1&pageSize=10',
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
            url:'/findArticle?currentPage='+pagenumber+'&pageSize=10',
            type:'GET',
            dataType:'json',
            success:(data)=>{
                this.setState({
                    data:data.data,
                    datalength:data.itemlength,
                    currentPage:parseInt(pagenumber)
                })
            }
        })
    }
    stop(e){
        e.preventDefault()
    }
    render(){
        let DomList = this.state.data.map((item,index)=>{
            let {title,text,_id,date}=item
            let time = new Date(date).toLocaleDateString()
            return (
                <li key={`list-${index}`} className={style.item}>
                    <a href={'/show?articleID='+_id} className={style.title}>{title}</a>
                    <div className={style.otherblock}> 
                    <a href={"/articleChange?articleID="+_id} className={style.icon}><i className="fa fa-repeat fa-lg"></i></a> 
                    <a href="javascript:0" className={style.icon}onClick={this.haddleDelete} ><i className="fa fa-trash fa-lg" data-articleid={_id}></i></a>
                    <span className={style.time}>{time}</span>
                    </div>
                    
                </li>
            )
        })
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

        console.log(this.state)
        return (
            <div>
                <div className={style.pageblock}>{PageDomList}</div>
                <ul className={style.liBox}>{DomList}</ul>
            </div>
        )
    }
}


export default ArticleManageArticleList;