import React from 'react'
import ReactDOM from "react-dom";
import '../css/main.css'
import Header from './Component/Header.js'
import Footer from './Component/Footer.js'
import ChangeArticleBody from './Component/ChangeArticleBody.js'

class ChangeArticle extends React.Component {
  constructor(props){
    super(props);
    this.geturl=this.geturl.bind(this);
  }
  componentWillMount() {
    this.geturl();
  }
  geturl(){
    let url=window.location.href
    console.log(url)
    let urlitem=url.split('?')[1]
    this.articleID = urlitem.split('=')[1]
    console.log('ChangeArticle '+this.articleID)
    console.log('ChangeArticle ')
  }
    render() {
      return (
        <div>
            <Header/>
            <ChangeArticleBody articleID={this.articleID}/>
            {/* <Footer/> */}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <ChangeArticle/>,
      document.getElementById('root')
   );
