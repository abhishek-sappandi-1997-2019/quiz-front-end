import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {connect} from 'react-redux'

class Choices extends React.Component {
    constructor(){
        super()
        this.state = {
            value: 0 ,
            shuffle : true
        }
    }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleDelete = (ele) => {
    console.log(ele);
    const obj = { choice : ele}
    this.props.eventhandler(this.props.id , obj)
  }
  handleAdd = () => {
    const choice = window.prompt('Enter the Choice')
    if(choice){
      const obj = { choice }
      this.props.addeventhandler(this.props.id , obj)
    }
  }
  hanldeShuffle = () => {
    this.setState({shuffle : true})
  }
  shuffle() {
    let array = this.props.options
    let len = array.length, temp, index;
    // While there are elements in the array
    while (len > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * len);
        // Decrease len by 1
        len--;
        // And swap the last element with it
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
        {this.state.value === 0 && 
          (
            <div>
              <button onClick={this.handleAdd}>Add Answer</button>
              <button onClick={this.hanldeShuffle}>Shuffle</button>
              <ol>
                {
                  this.shuffle().map((ele,index) => {
                    return (
                            <div key={index}>
                              <li>{ele} <button onClick={() => {this.handleDelete(ele)}}>delete</button></li> <br/>
                            </div>
                          )
                  })
                }
              </ol> 
            </div>
          )
        }
        {this.state.value === 1 && 
          (
            <>
            <h2>Correct Answer :</h2>
            {this.props.answer}
            </>
          )
        }
      </div>
    ]
  }
}
const mapStateToProps = (state,props) =>{
  console.log('choices',props);
    return {
        options : props.data,
        eventhandler : props.eventhandler ,
        addeventhandler : props.addeventhandler ,
        id : props.id,
        answer : props.answer
    }
}

export default connect(mapStateToProps)(Choices)