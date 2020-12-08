import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import "react-mde/lib/styles/css/react-mde-all.css";
import '../../App.css'

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

    /**
     * lifecycle method (assign question to state)
     */
    componentDidMount(){
        this.setState({ value : this.props.question})
    }

    /**
     * lifecycle method to update state once props changed from parent
     * @param {*} prevProps 
     */
    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.question){
            this.setState({ value : this.props.question })
        }
    }

    /**
     * this used to update state
     * @param {*} value 
     */
    handleValueChange = (value) => {
        this.setState({ value });
    };

     /**
      * alert to change question 
      */
    handleAlert = () => {
        window.alert('please click on edit icon to make changes ...!')
    }

    /**
     * handler to edit question
     */
    hanldeEdit = () => {
        this.setState((prev) => {
            return {
                edit_question : !prev.edit_question ,
                value : this.props.question
            }
        })
    }

    /**
     * handler to save question
     */
    handleSave = () => {
        this.setState((prev) => {
            return {
                edit_question : !prev.edit_question 
            }
        })
        const obj = { question : this.state.value }
        const task = "edit"
        this.props.eventHandler(this.props.id ,obj,task)
    }

    /**
     * handler to change tab from write to preview
     */
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
                        this.state.edit_question ? 
                        <SaveIcon className='edit-save' onClick={this.handleSave} /> : 
                        <EditIcon  className='edit-save' onClick={this.hanldeEdit} />
                    }
                </div>
                    { 
                        this.props.question.length > 0 && (
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
    return {
        question : props.data ,
        eventHandler : props.eventHandler ,
        id : props.id
    }
}
export default connect(mapStateToProps)(Question)