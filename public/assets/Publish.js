import React from 'react'
import ReactDOM from 'react-dom'
import '../css/main.css'
import Header from './Component/Header.js'
// import Footer from './Component/Footer.js'
import PublishBody from './Component/PublishBody.js'

class Publish extends React.Component {
    render() {
      return (
        <div  className='pagecontainer'>
            <Header/>
            <PublishBody/>
            {/* <Footer/> */}
        </div>
      );
    }
  }

  ReactDOM.render(
    <Publish/>,
      document.getElementById('root')
   );

