import React, { Component } from 'react'


class Token extends Component{

    state={
        linda: []
    }
    
    componentDidMount(){
    fetch('http://192.241.145.208:8890/lims/v1/auth',{
        method: "GET",
        headers: {
            "Authorization": "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk",
        }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ linda: data.payload.token })
      console.log(this.state.bars)
    })
    .catch(console.log)
}
render(){
    return <h1>{ this.state.linda }</h1>
}
}

export default Token