import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startGetQuiz ,startUpdateQuiz,StartDeleteQuizChoice,StartAddQuizChoice} from '../../actions/quizAction'
import Question from '../Question/Question'
import Grid from '@material-ui/core/Grid';
import Choices from '../Choices/Choices'
import ModalComponent from '../ModalComponent'
import Button from '@material-ui/core/Button';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            question : '' ,
            choices : [] ,
            question_number : 0 ,
            id :''
        }
    }
    componentDidMount(){
        if(this.props.quiz.length === 0){
            console.log('componentdidmount');
            this.props.dispatch(startGetQuiz())
        }

    }
    handleChange = () => {
        if(this.props.quiz.length > ( 1 + this.state.question_number)){
            console.log('increase');
            this.setState((prev)=> {
                return { question_number : prev.question_number + 1  }
            })
        }
        else {
            window.alert('end of questions')
        }
    }
    handleUpdateQuestion = (id,obj) =>{
        this.props.dispatch(startUpdateQuiz(id,obj))
    }
    handleDeleteChoices = (id ,option) => {
        this.props.dispatch(StartDeleteQuizChoice(id,option))
    }
    handleAddChoices = (id,option) => {
        this.props.dispatch(StartAddQuizChoice(id,option))
    }
    render() {
        return (
            <div>
                <ModalComponent/>Add Question
                {
                    this.props.quiz.length > 0 &&(
                    <div>
                                            {
                     ( this.props.quiz.length > ( 1 + this.state.question_number) )
                     && (<Button onClick={this.handleChange} variant="contained" color="primary" size="small">next Question</Button>)
                    }
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Question 
                            data={this.props.quiz[this.state.question_number].question} 
                            id={this.props.quiz[this.state.question_number]._id} 
                            eventhandler={this.handleUpdateQuestion}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Choices 
                            data={this.props.quiz[this.state.question_number].options} 
                            id={this.props.quiz[this.state.question_number]._id} 
                            answer={this.props.quiz[this.state.question_number].answer}
                            eventhandler={this.handleDeleteChoices}
                            addeventhandler = {this.handleAddChoices}
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