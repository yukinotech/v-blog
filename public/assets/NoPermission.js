import React from "react";
import ReactDom from "react-dom";
import style from "./NoPermission.css";

class NoPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lasttime: 3
    };
  }
  componentDidMount() {
    let Countdown=()=>{
      if (this.state.lasttime !== 0) {
        setTimeout(()=>{
          this.setState({lasttime:this.state.lasttime-1})
          Countdown()
          console.log(this.state.lasttime)
        }, 1000);
      }else{
        setTimeout(()=>{
            window.location.href='/'
          }, 500);
    }
    } 
    Countdown()
  }
  render() {
    return (
      <div className={style.centerBox}>
      <div className={style.centerItem}> 未登录，无权访问,{this.state.lasttime}秒后自动跳回主页</div>
       
      </div>
    );
  }
}

ReactDom.render(<NoPermission />, document.getElementById("root"));
