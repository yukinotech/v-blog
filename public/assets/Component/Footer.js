import React from "react"
import style from "./Footer.css"

class Footer extends React.Component {
    render() {
      return (
        <div className={style.footer}>
            <small>© 2018 John Smith
                <br/>
                Powered by <a href="https://github.com/yukinotech">yukinotech</a>
            </small>
        </div>
      );
    }
  }
  
export default Footer;