import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startGetQuiz} from '../../actions/quizAction'
import Question from '../Question/Question'
import Grid from '@material-ui/core/Grid';
import Choices from '../Choices/Choices'
import ModalComponent from '../ModalComponent'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            question : '' ,
            choices : [] ,
            question_number : 1
        }
    }
    componentDidMount(){
        if(this.props.quiz.length === 0){
            this.props.dispatch(startGetQuiz())
        }
        this.props.quiz.length > 0 &&
            this.setState({ question : this.props.quiz[0].question , choices : this.props.quiz[0].choices}) 
    }
    handleChange = () => {
        if(this.props.quiz.length > this.state.question_number){
            this.setState((prev)=> {
                return {
                    question : this.props.quiz[this.state.question_number].question ,
                    choices : this.props.quiz[this.state.question_number].choices ,
                    question_number : prev.question_number + 1 
                }
            })
        }
        else {
            window.alert('end of questions')
        }

    }

    render() {
        return (
            <div>
                Add Question<ModalComponent/>
                {
                   
                        <div>
                        <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Question data={this.state.question}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Choices />
                        </Grid>
                        </Grid>
                        <button onClick={this.handleChange}>next</button>
                        
                        </div>
                    
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