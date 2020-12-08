import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startGetQuiz ,startUpdateQuiz} from '../../actions/quiz'
import Question from '../Question/Question'
import Grid from '@material-ui/core/Grid'
import Choices from '../Choices/Choices'
import AddQuestion from '../AddQuestion/AddQuestion'
import Button from '@material-ui/core/Button'


class Home extends Component {
    constructor(){
        super()
        this.state = {
            currentQuestion : 0 
        }
    }
    // lifecyclemethod to get the questions
    componentDidMount(){
        if(this.props.quiz.length === 0){
            this.props.dispatch(startGetQuiz())
        }
    }

    // handler to change next question 
    handleChange = () => {
        if(this.props.quiz.length - 1 > this.state.currentQuestion){ 
            this.setState((prev)=> {
                return { currentQuestion : prev.currentQuestion + 1  }
            })
        }
        else {
            window.alert('end of questions')
        }
    }

    // handler to update question
    handleUpdateQuestion = (id,obj,task) =>{
        this.props.dispatch(startUpdateQuiz(id,obj,task))
    }

    // handler to remove choice
    handleDeleteChoices = (id ,option) => {
        this.props.dispatch(startUpdateQuiz(id,option))
    }

    // handler to add choice
    handleAddChoices = (id,option) => {
        this.props.dispatch(startUpdateQuiz(id,option))
    }
    render() {
        return (
            <div> 
                <AddQuestion/><br/>
                {
                    this.props.quiz.length > 0 &&(
                        <div> 
                            <Button 
                                onClick={this.handleChange} 
                                variant="contained" 
                                color="primary" 
                                size="small"
                                disabled = { !( this.props.quiz.length - 1 > this.state.currentQuestion ) }
                            >
                                next Question
                            </Button>
                                
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <Question 
                                        data={this.props.quiz[this.state.currentQuestion].question} 
                                        id={this.props.quiz[this.state.currentQuestion]._id} 
                                        eventHandler={this.handleUpdateQuestion}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Choices 
                                        data={this.props.quiz[this.state.currentQuestion].options} 
                                        id={this.props.quiz[this.state.currentQuestion]._id} 
                                        answer={this.props.quiz[this.state.currentQuestion].answer}
                                        eventHandler={this.handleUpdateQuestion}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )   
                }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        quiz : state.quiz
    }
}
export default connect(mapStateToProps)(Home)