import style from "./PersonalPageBody.css";
import $ from "jquery";
import React from "react";
import PersonInfoBox from "./PersonalPageComponet/PersonInfoBox.js";
import ArticleManageBox from "./PersonalPageComponet/ArticleManageBox.js";
import { HashRouter, Link, Route } from "react-router-dom";
import usrinfo from './PersonalContext/usrinfo.js'

class PersonalPageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <HashRouter>
        <div className={style.bodymainbox+' '+style.clearfix}>
          <div className={style.nav_box}> 
            <nav className={style.nav+' '+style.big}>
              <h3 className={style.menu_header}>个人中心</h3>
              <Link to="/" className={style.menu_item}>用户信息</Link>
              <Link to="/articleManage" className={style.menu_item}>文章管理</Link>
            </nav>
          </div>
          <div className={style.showbox}>   
            <Route exact path="/" component={PersonInfoBox} />
            <Route path="/articleManage" component={ArticleManageBox} />
          </div>
          {/* <div className={style.clear}></div> */}
        </div>
      </HashRouter>
    );
  }
}

export default PersonalPageBody;
