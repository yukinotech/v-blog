import React from 'react'
import $ from 'jquery'
import usrinfo from '../PersonalContext/usrinfo.js'

class ArticleManageBox extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        $.ajax({
            url: "/getUsername",
            dataType: "json",
            cache: false,
            type: "GET",
            success: data => {
              if (data === "no_login") {
              } else {
                $.ajax({
                    url: "/findSomeoneArticle",
                    dataType: "json",
                    cache: true,
                    type:'post',
                    data:{author:data},
                    success: data2 => {
                        this.setState({ data: data2 },()=>{
                            console.log(this.state)
                        }); 
                    }
                  });
              }
            },
            error: function(data) {
              console.log(data);
              alert(data.id);
            }
          });

        console.log('ArticleManageBox DidMount')
    }
    componentWillUnmount(){
        console.log('ArticleManageBox Unmount')
    }
    render(){
        // let articlelist=
    
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