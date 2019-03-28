import React from "react";
import { Link } from "react-router-dom";
import Listitem from "./ArticleShowListitem.js";
import style from './ArticleShowLists.css'

export default class ArticleShowLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    function listItemsMaker() {
      let listItems = this.props.data.map((item, index) => {
        return <Listitem altItem={item} key={"Listitem" + index} />;
      });
      return listItems;
    }
    let listItems = listItemsMaker.bind(this)();

    //制作分页
    let pagesNumber = this.props.datalength / this.props.pageSize;
    pagesNumber = Math.ceil(pagesNumber);
    let PageDomList = [];
    //添加首页分页
    if (this.props.currentPage === 1) {
      PageDomList.push(
        <Link
          className={style.pageFirstItem + " " + style.pageItem}
          key={`list-${"home"}`}
          to="/page/1"
          onClick={this.props.stop}
          data-pagenumber="1"
        >
          首页
        </Link>
      );
    } else {
      PageDomList.push(
        <Link
          className={style.pageFirstItem + " " + style.pageItem}
          key={`list-${"home"}`}
          to="/page/1"
          onClick={this.props.pageUpdate}
          data-pagenumber="1"
        >
          首页
        </Link>
      );
    }
    //上一页
    PageDomList.push(
      this.props.currentPage - 1 >= 1 ? (
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"beforePage"}`}
          to={"/page/" + (this.props.currentPage - 1).toString()}
          onClick={this.props.pageUpdate}
          data-pagenumber={this.props.currentPage - 1}
        >
          上一页
        </Link>
      ) : (
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"beforePage"}`}
          to={"/page/" + (this.props.currentPage - 1).toString()}
          onClick={this.props.stop}
          data-pagenumber={1}
        >
          上一页
        </Link>
      )
    );
    //下一页
    PageDomList.push(
      this.props.currentPage + 1 <= pagesNumber ? (
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"afterPage"}`}
          to={"/page/"+(this.props.currentPage + 1)}
          onClick={this.props.pageUpdate}
          data-pagenumber={this.props.currentPage + 1}
        >
          下一页
        </Link>
      ) : (
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"afterPage"}`}
          to={"/page/"+(this.props.currentPage + 1)}
          onClick={this.props.stop}
          data-pagenumber={pagesNumber}
        >
          下一页
        </Link>
      )
    );
    //中间分页
    if (pagesNumber <= 5) {
      for (let i = 1; i <= pagesNumber; i++) {
        let classname =
          i === this.props.currentPage
            ? style.pageItem + " " + style.pageItemSelect
            : style.pageItem;
        if (i === this.props.currentPage) {
          PageDomList.push(
            <Link
              className={classname}
              key={`list-${i}`}
              to={"/page/"+i}
              onClick={this.props.stop}
              data-pagenumber={i}
            >
              -{i}-
            </Link>
          );
        } else {
          PageDomList.push(
            <Link
              className={classname}
              key={`list-${i}`}
              to={"/page/"+i}
              onClick={this.props.pageUpdate}
              data-pagenumber={i}
            >
              {i}
            </Link>
          );
        }
      }
    } else if (5 < pagesNumber) {
      let { currentPage } = this.props;
      for (let i = currentPage - 2; i < currentPage + 3; i++) {
        if (i > 0 && i <= pagesNumber) {
          let classname =
            i === this.props.currentPage
              ? style.pageItem + " " + style.pageItemSelect
              : style.pageItem;
          if (i === this.props.currentPage) {
            PageDomList.push(
              <Link
                className={classname}
                key={`list-${i}`}
                to={"/page/"+i}
                onClick={this.props.stop}
                data-pagenumber={i}
              >
                -{i}-
              </Link>
            );
          } else {
            PageDomList.push(
              <Link
                className={classname}
                key={`list-${i}`}
                to={"/page/"+i}
                onClick={this.props.pageUpdate}
                data-pagenumber={i}
              >
                {i}
              </Link>
            );
          }
        }
      }
    }
    //添加尾页分页
    if (this.props.currentPage === pagesNumber) {
      PageDomList.push(
        <Link
          className={style.pageFirstItem + " " + style.pageItem}
          key={`list-${"last"}`}
          to={"/page/"+pagesNumber}
          onClick={this.props.stop}
          data-pagenumber={pagesNumber}
        >
          尾页
        </Link>
      );
    } else {
      PageDomList.push(
        <Link
          className={style.pageFirstItem + " " + style.pageItem}
          key={`list-${"last"}`}
          to={"/page/"+pagesNumber}
          onClick={this.props.pageUpdate}
          data-pagenumber={pagesNumber}
        >
          尾页
        </Link>
      );
    }
    //添加总页数标签
    if (this.props.currentPage === pagesNumber) {
      PageDomList.push(
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"all"}`}
          to={"/page/"+pagesNumber}
          onClick={this.props.stop}
          data-pagenumber={pagesNumber}
        >
          ...共{pagesNumber}页
        </Link>
      );
    } else {
      PageDomList.push(
        <Link
          className={style.pageLastPageItem + " " + style.pageItem}
          key={`list-${"all"}`}
          to={"/page/"+pagesNumber}
          onClick={this.props.pageUpdate}
          data-pagenumber={pagesNumber}
        >
          ...共{pagesNumber}页
        </Link>
      );
    }
    return(
          <>
            <ul className={style.ulbox}>{PageDomList}</ul>
            <ul>
             {listItems}
            </ul>
            <ul className={style.ulbox}>{PageDomList}</ul>
          </>
    )
  }
}
