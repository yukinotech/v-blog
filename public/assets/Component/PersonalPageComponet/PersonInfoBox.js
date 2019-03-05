import React from 'react'
import $ from 'jquery'

class PersonInfoBox extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
 
        console.log('PersonInfoBox DidMount')
    }
    componentWillUnmount(){
        console.log('PersonInfoBox Unmount')
    }
    render(){
        return (
            <div>sxxx</div>
        )
    }
}

export default PersonInfoBox;