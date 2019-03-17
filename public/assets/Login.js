import React from 'react'
import ReactDOM from 'react-dom'
import '../css/main.css'
import Header from './Component/Header.js'
import LoginBody from './Component/LoginBody.js'
import Footer from './Component/Footer.js'

class Login extends React.Component {
    render() {
      return (
        <div  className='pagecontainer'>
            <Header/>
            <LoginBody/>
            <Footer/>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Login/>,
      document.getElementById('root')
   );
