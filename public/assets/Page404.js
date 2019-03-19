import React from "react";
import ReactDom from "react-dom";
import style from "./Page404.css";

class Page404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lasttime: 3
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={style.centerBox}>
            <h1>Page404</h1>
            <div className={style.centerItem}>
                你迷路了，小<span className={style.cat}>猫</span>咪
            </div>
      </div>
    );
  }
}

ReactDom.render(<Page404 />, document.getElementById("root"));
