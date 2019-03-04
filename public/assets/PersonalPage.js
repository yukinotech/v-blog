import React from 'react'
import ReactDOM from "react-dom";
import '../css/main.css'
import Header from './Component/Header.js'
import Footer from './Component/Footer.js'
import PersonalPageBody from './Component/PersonalPageBody.js'

class PersonalPage extends React.Component {
  constructor(props){
    super(props);
  }
    render() {
      return (
        <div>
            <Header/>
            <PersonalPageBody />
            <Footer/>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <PersonalPage/>,
      document.getElementById('root')
   );
