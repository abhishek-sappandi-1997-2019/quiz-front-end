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
            value: 0
        }
    }

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
            <Typography>
                {/* {
                    this.props.quiz.length > 0 && this.props.quiz.options.map(option => {
                        return (
                            <li>{option}</li>
                        )
                    })
                } */}
            </Typography>
        }
        {this.state.value === 1 && <Typography>Item Two</Typography>}
      </div>
    ]
  }
}
const mapStateToProps = (state) =>{
    return {
        quiz : state.quiz
    }
}

export default connect(mapStateToProps)(Choices)