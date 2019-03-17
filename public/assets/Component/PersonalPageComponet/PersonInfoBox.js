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
    this.haddleFormSubmit = this.haddleFormSubmit.bind(this)
    this.haddleAvatarSubmit = this.haddleAvatarSubmit.bind(this)
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
    let that =this
    let files = e.target.files;
    let render  = new FileReader();
    console.log(files[0])
		render.readAsDataURL(files[0]);
		render.onloadstart = function(){
				// alert("start")
		};
		render.onload = function(){
				let img = document.getElementById("avatar");
        img.src = this.result;
				// alert("success");
		};
		render.onloadend = function(){
        // alert("end");
        
    }
    that.avatar=files[0]
    console.log(e);
  }
  haddleFormSubmit(e){
    e.preventDefault();
    $.ajax({
      url:'/updateUserInfo',
      type:'POST',
      dataType: "json",
      data:this.state,
      success:(data)=>{
        if(data==='no_login'){
          alert('更新出错，客户端表单有误，或者服务端错误')
        } else{
          alert('更新信息成功')
        }
        console.log(data)
      }
    })
  }
  haddleAvatarSubmit(e){
    
    e.preventDefault()
    let that =this
    if(that.avatar){
          let formdata = new FormData()
    formdata.append('avatarData',that.avatar)
    $.ajax({
        url:'/updateAvatar',
        type:'POST',
        data:formdata,
        processData:false,
        contentType: false,
        success:function(data){
          if(data.message==='fileUploadSuccess'){
             alert('头像更新成功')
          } else{
            alert('头像更新失败，可能是文件过大，压缩后仍然超出500kb，或者图片后缀名不是jpg，png，jpeg')
          }
        },error :function(data){
          alert('头像更新失败，可能是文件过大，压缩后仍然超出500kb，或者图片后缀名不是jpg，png，jpeg')
        }
    })
    } else{
      alert('未选择任何文件')
    }


  }
  render() {
    return (
      <div className={style.box}>
        <div className={style.boxleft}>
          <form onSubmit={this.haddleFormSubmit}>
            <h1 className={style.title}>个人主页</h1>
            <label>登录名</label>
            <p>{this.state.username}</p>
            <label>用户名</label>
            <input type="text" id="username" value={this.state.publicname} onChange={this.haddlePublicnameChange}/>
            <label>用户邮箱</label>
            <input type="email" id="useremail" value={this.state.email} onChange={this.haddleEmailChange}/>
            <label>个性签名</label>
            <textarea id="userwords" value={this.state.signature} onChange={this.haddleSignatureChange}/>
            <input type="submit" className={style.submitbtn} value="更新资料" />
          </form>
        </div>

        <div className={style.boxright}>
          <label>头像</label>
          <img
            id='avatar'
            src={this.state.avatar === "" ? Avatar : this.state.avatar}
            alt=""
            className={style.Avatar}
          />
          <form onSubmit={this.haddleAvatarSubmit}>
            <input type="file" onChange={this.haddleAvatarUpdate} className={style.updateavatar}/>
            <input type="submit" value='确认更新头像'/>
          </form>
          <div id="oDiv"></div>
        </div>
      </div>
    );
  }
}

export default PersonInfoBox;
