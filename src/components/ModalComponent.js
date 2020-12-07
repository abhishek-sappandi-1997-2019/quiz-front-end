import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {startAddQuiz} from '../actions/quizAction'
import {useDispatch , connect} from 'react-redux'
import AddBoxIcon from '@material-ui/icons/AddBox';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddQuestion() {


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = React.useState([{ value: null }])
  const [question, setQuestion] = React.useState('')
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    console.log('index',i);
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  function hanldeSubmit(e){
    e.preventDefault()
    console.log('submitted');
    const choices = fields.map(answer => answer.value)
    const data = { question , options : choices , answer : choices[0]}
    console.log('data',data);
    dispatch(startAddQuiz(data))
    handleClose()
  }

  function handleQuestionChange (e){
    const value = e.target.value
    setQuestion(value)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <form onSubmit={hanldeSubmit}> 
        <h1>Add New Question</h1>

        <label>Question</label>
            <input
                type="text"
                placeholder="Enter question"
                onChange={handleQuestionChange}
            /><br/><br/>
        
        <label>Choices</label>
            <button type="button" onClick={() => handleAdd()}>
                +
            </button>

        {fields.map((field, idx) => {
            return (
            <div key={`${field}-${idx}`}>
                <input
                type="text"
                placeholder="Enter text"
                onChange={e => handleChange(idx, e)}
                />
                <button type="button" onClick={() => handleRemove(idx)}>
                X
                </button>
            </div>
            );
        })}<br/>
        
            <input
                type='submit'
                value='add question'
            />
        </form>
    </div>
  );

  return (
    <div>
      <AddBoxIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default connect()(AddQuestion)