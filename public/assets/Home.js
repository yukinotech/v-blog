import React from 'react'
import '../css/main.css'
import Header from './Component/Header.js'
import HomeBody from './Component/HomeBody.js'
import Footer from './Component/Footer.js'

class Home extends React.Component {
    render() {
      return (
        <div>
            <Header/>
            <HomeBody/>
            <Footer/>
        </div>
      );
    }
  }
  
export default Home;
