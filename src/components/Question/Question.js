import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startGetQuiz} from '../../actions/quizAction'
import './Question.css'

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import {startUpdateQuiz} from '../../actions/quizAction'

class Question extends Component {
    constructor(){
        super()
        this.state = {
            value:"",
            edit_question : false ,
            tab : 'write' 
        }
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
          });
    }
    componentDidMount(){
        console.log('componet');
        console.log(this.props.quiz);
        // if(this.props.quiz.length == 0){
        //     this.props.dispatch(startGetQuiz())
        //     console.log('first');
            
        // }
        if(this.props.quiz){
            this.setState({ value : this.props.quiz})
            console.log(this.props.quiz);
        }
    }
    handleValueChange = (value) => {
        this.setState({ value });
        console.log(value);
      };
    handleAlert = () => {
        window.alert('please click on edit to make changes')
    }
    hanldeEdit = () => {
        this.setState((prev) => {
            return {
                edit_question : !prev.edit_question
            }
        })
    }
    handleSave = () => {
        this.setState((prev) => {
            return {
                edit_question : !prev.edit_question
            }
        })
        this.props.dispatch(startUpdateQuiz())
    }
    handleTabChange = () => {
        if(this.state.tab === 'write'){
            this.setState({tab : 'preview'})
        }
        else {
            this.setState({ tab:'write'})
        }
    }
    render() {
        return (
            <div>
                <div className='same-row'>
                    <h1 className='row-left'>Question Stream</h1>
                    {
                        this.state.edit_question ? <SaveIcon onClick={this.handleSave} /> : <EditIcon onClick={this.hanldeEdit} />
                    }
                   
                </div>
                    {
                        this.state.value.length > 0 && (
                            <ReactMde
                            onChange={this.state.edit_question ? this.handleValueChange : this.handleAlert}
                            value={this.state.value}
                            selectedTab={this.state.tab}
                            onTabChange={this.handleTabChange}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(this.converter.makeHtml(markdown))
                            }
                        />
                        )
                    }
            </div>
        )
    }
}
const mapStateToProps = (state,props) =>{
    console.log("data",props.data)
    return {
        quiz : props.data
    }
}
export default connect(mapStateToProps)(Question)