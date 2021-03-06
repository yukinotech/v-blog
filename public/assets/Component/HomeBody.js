import React from "react";
import style from "./HomeBody.css";
import { HashRouter, Route } from "react-router-dom";
import ArticleList from "./ArticleList.js";
import ArticleCollet from "./ArticleCollet.js";

class HomeBody extends React.Component {

  render() {
    return (
      <div className={style.mainbody}>
        <div className={style.left}>
          <HashRouter>
            <>
            <Route path="/page/:pagenumber" component={ArticleList}/>
            <Route exact path="/" component={ArticleList}/>
            </>
          </HashRouter>
        </div>
        <div className={style.right}>
          <ArticleCollet />
        </div>
        <div className={style.clear}></div>
      </div>
    );
  }
}

export default HomeBody;
