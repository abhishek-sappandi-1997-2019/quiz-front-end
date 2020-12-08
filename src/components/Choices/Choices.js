import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../App.css'

class Choices extends React.Component {
    constructor(){
        super()
        this.state = {
            value: 1 ,
            shuffle : false
        }
    }
// handler to set question into state
  handleChange = (event, value) => {
    this.setState({ value });
  };

// handler to remove choice
  deleteChoice = (choice) => {
    if(choice.isCorrect){
      window.alert(`This is correct answer , you can't delete it....!`)
    }
    else{
      const _id = choice._id
      const obj = { choice : { _id }}
      const task = 'remove'
      this.props.eventHandler(this.props.id, obj ,task)
    }
  }

  // handler to add choice
  addChoice = () => {
    const value = window.prompt('Enter the Answer')
    if(value){
      const obj = { choice : { value ,isCorrect : false} }
      const task = 'add'
      this.props.eventHandler(this.props.id , obj ,task)
    }
  }

  // handler to shuffle choice and re-render
  handleShuffle = () => {
    this.setState({shuffle : true})
  }

  // function to shuffle choice
  shuffleChoice() {
    let array = this.props.options
    let len = array.length, temp, index;
    while (len > 0) {

        index = Math.floor(Math.random() * len);
        len--;
        temp = array[len];
        array[len] = array[index];
        array[index] = temp;

    }
    return array;
}
  render() {

    return [
      <AppBar position="static" key="appbar">
        <Tabs 
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Choice / Options" />
          <Tab label="Answer Key" />
        </Tabs>
      </AppBar>,
      <div key="tab-content">
        {this.state.value === 0 && (
            <div>
              <br/>
              <Button variant="outlined" color="primary" size="small" onClick={this.addChoice}><b>Add Choice</b></Button>
              <Button variant="outlined" color="primary" size="small" onClick={this.handleShuffle}><b>Shuffle</b></Button>
              <ol>
                {
                  this.shuffleChoice().map((choice,index) => {
                    return (
                      <div key={index}>
                        <li>
                          {choice.value}
                          <span>
                            <DeleteIcon 
                              className='delete-icon' 
                              onClick={() => {this.deleteChoice(choice)}} 
                              color="secondary" 
                              fontSize='small'
                            />
                          </span>
                        </li><br/>
                      </div>
                    )
                  })
                }
              </ol> 
            </div>
          )
        }
        {this.state.value === 1 && (
            <>
            <h2>Answer Key:</h2>
            {
              this.props.options.length > 0 && ( this.props.options.map(choice => {
                return (
                  <div key={choice._id}>
                      <input 
                          type='radio'
                          name={choice.value}
                          checked={choice.isCorrect}
                          readOnly
                        />
                        {choice.value}
                  </div>
                )}) 
              )
            }
            </>
          )
        }
      </div>
    ]
  }
}
const mapStateToProps = (state,props) =>{
    return {
        options : props.data,
        eventHandler : props.eventHandler ,
        id : props.id
    }
}

export default connect(mapStateToProps)(Choices)