import React from 'react'
import $ from 'jquery'
import style from './ArticleManageBox.css'
import usrinfo from '../PersonalContext/usrinfo.js'
import ArticleManageArticleList from './ArticleManageArticleList.js'


class ArticleManageBox extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log('ArticleManageBox DidMount')
    }
    componentWillUnmount(){
        console.log('ArticleManageBox Unmount')
    }
    render(){
        return(
            <div className={style.box}>
                <div className={style.boxleft}>               
                    <h1 className={style.title}>文章列表</h1>
                    <div className={style.articleListBox}>
                        <ArticleManageArticleList />
                    </div>
                </div>
            </div>
        )
    }
}





export default ArticleManageBox;