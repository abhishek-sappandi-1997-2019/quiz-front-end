import React, { Component } from 'react'
import Home from './components/Home/Home'
import {connect} from 'react-redux'

class App extends Component {
    componentDidMount(){
        // if(this.props.quiz.length === 0){
        //     this.props.dispatch(startGetQuiz())
        // }
    }
    render() {
        return (
            <div>
               <Home/>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        quiz : state.quiz
    }
}
export default connect(mapStateToProps)(App)