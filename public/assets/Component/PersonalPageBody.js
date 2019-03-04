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
        <div>
          <div className={style.nav}>
            <h3>个人中心</h3>
            <Link
              to={{
                pathname: "/",
                state: { abc: 'true' }
              }}
            >
              用户信息
            </Link>
            <Link to="/articleManage">文章管理</Link>
          </div>
          <div className={style.showbox}>
          <usrinfo.Provider value={{'ss':'aaaaa'}}>
            <Route exact path="/" component={PersonInfoBox} />
            <Route path="/articleManage" component={ArticleManageBox} />
            </usrinfo.Provider>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default PersonalPageBody;
