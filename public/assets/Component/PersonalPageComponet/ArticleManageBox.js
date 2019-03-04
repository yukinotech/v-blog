import React from 'react'
import $ from 'jquery'
import usrinfo from '../PersonalContext/usrinfo.js'

class ArticleManageBox extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        $.ajax({
            url:'/getUsername',
            type:'get',
        })
        $.ajax({
            url:'/findSomeoneArticle',
            type:'post',
            data:''
        })
    }
    render(){
        return(
            <div>
                <usrinfo.Consumer>
                {value => {
                    let v = value.ss
                    return(
                        <div>{v}</div>
                    )
                    }
                }
                </usrinfo.Consumer>
            </div>
        )
    }
}

export default ArticleManageBox;