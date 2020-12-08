import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {startAddQuiz} from '../../actions/quiz'
import {useDispatch , connect} from 'react-redux'
import Button from '@material-ui/core/Button';

// this return random number 
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

// this return position
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// this return style
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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = React.useState([{ value: null }])
  const [question, setQuestion] = React.useState('')
  const dispatch = useDispatch()

  // handler to open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // handler to close modal
  const handleClose = () => {
    setOpen(false);
  };

  // handler to take input Choices
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  // handler to add input feilds dynamically
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  // handler to remove input feilds dynamically
  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  // handler to submit the question
  function hanldeSubmit(e){
    e.preventDefault()
    let options = [].concat(fields)
    options[0].isCorrect = true
    for(let i=1;i<options.length ;i++){
      options[i].isCorrect = false
    }
    const data = { question , options , answer : fields[0].value}
    dispatch(startAddQuiz(data))
    handleClose()
    setFields([{ value: null }])
  }

  // handler to take input question
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
          <button 
            type="button" 
            onClick={() => handleAdd()}
          >
              +
          </button>

          {
            fields.map((field, idx) => {
                return (
                <div key={`${field}-${idx}`}>
                    <input
                      type="text"
                      placeholder="Enter text"
                      value={field.value || ""}
                      onChange={e => handleChange(idx, e)}
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemove(idx)}
                    >
                    X
                    </button>
                </div>
                )
              })
          }<br/>
          
          <input
              type='submit'
              value='add question'
          />
        </form>
    </div>
  );

  return (
    <div >
      <Button variant="contained" color="secondary" size="small" onClick={handleOpen}>Add Question</Button>
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