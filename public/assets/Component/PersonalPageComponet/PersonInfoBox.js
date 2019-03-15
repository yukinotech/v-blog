import React from "react";
import $ from "jquery";
import style from "./PersonInfoBox.css";
import Avatar from "../../../avatar/defaultAvatar.jpg";

class PersonInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicname: "",
      username: "",
      email: "",
      signature: "",
      avatar: ""
    };
    this.haddleAvatarUpdate = this.haddleAvatarUpdate.bind(this);
    this.haddlePublicnameChange = this.haddlePublicnameChange.bind(this);
    this.haddleEmailChange = this.haddleEmailChange.bind(this);
    this.haddleSignatureChange = this.haddleSignatureChange.bind(this);
  }
  componentDidMount() {
    let that = this;
    $.ajax({
      url: "/getUserInfo",
      method: "post",
      success: function(data) {
        console.log(data);
        that.setState({ ...data });
      }
    });
    console.log("PersonInfoBox DidMount");
  }
  componentWillUnmount() {
    console.log("PersonInfoBox Unmount");
  }
  haddlePublicnameChange(e){
      this.setState({publicname:e.target.value})
  }
  haddleEmailChange(e){
      this.setState({email:e.target.value})
  }
  haddleSignatureChange(e){
      this.setState({signature:e.target.value})
  }
  haddleAvatarUpdate(e) {
    console.log(e);
  }
  render() {
    return (
      <div className={style.box}>
        <div className={style.boxleft}>
          <form action="">
            <h1 className={style.title}>个人主页</h1>
            <label>登录名</label>
            <p>{this.state.username}</p>
            <label>用户名</label>
            <input type="text" id="username" value={this.state.publicname} onChange={this.haddlePublicnameChange}/>
            <label>用户邮箱</label>
            <input type="email" id="useremail" value={this.state.email} onChange={this.haddleEmailChange}/>
            <label>个性签名</label>
            <textarea id="userwords" value={this.state.signature} onChange={this.haddleSignatureChange}/>
            <input type="button" className={style.submitbtn} value="更新资料" />
          </form>
        </div>

        <div className={style.boxright}>
          <label>头像</label>
          <img
            src={this.state.avatar === "" ? Avatar : this.state.avatar}
            alt=""
            className={style.Avatar}
          />
          <input type="file" onChange={this.haddleAvatarUpdate} />
        </div>
      </div>
    );
  }
}

export default PersonInfoBox;
