import React from 'react'
import ReactDOM from 'react-dom'
import '../css/main.css'
import Header from './Component/Header.js'
import RegisterBody from './Component/RegisterBody.js'
import Footer from './Component/Footer.js'

class Register extends React.Component {
    render() {
      return (
        <div  className='pagecontainer'>
            <Header/>
            <RegisterBody/>
            <Footer/>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Register/>,
      document.getElementById('root')
   );
