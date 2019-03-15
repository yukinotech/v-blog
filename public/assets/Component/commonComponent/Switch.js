import React from 'react'
import style from './Switch.css'

export default class Switch extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <input className={style.switch+" "+style.switch_anim} type="checkbox" checked={this.props.Checked} onChange={this.props.onChange}/>
        )
    }
}