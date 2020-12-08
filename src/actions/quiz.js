import axios from '../config/Axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export const get = (questions) =>{
    return {type:'GET_QUIZ' ,payload:questions}
}
export const add = (questions) =>{
    return {type:'ADD_QUIZ' ,payload:questions}
}
export const update = (_id ,obj) =>{
    return {type:'UPDATE_QUIZ' , payload:{_id,obj}}
}

function fireToast(task){
    toast.error(task, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

// to get Questions
export const startGetQuiz = () =>{
    return (dispatch) =>{
        axios.get('/quiz')
        .then((response)=>{
            const questions = response.data
            if(Object.keys(questions).length > 0){
                dispatch(get(questions))
            }else{
                alert('Please add Questions..!')
            }
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}

// to add Question
export const startAddQuiz= (data)=>{
    return (dispatch) =>{
        axios.post('/quiz',data)
        .then((response)=>{
            const questions = response.data
            if(!questions.errors){
                dispatch(add(questions))
                fireToast('added sucessfully')
            }  
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}

// 1. Edit question  2. Add choice  3.Remove choice
export const startUpdateQuiz = (_id,obj,task) =>{
    return (dispatch)=>{
        axios.put(`quiz/${_id}?type=${task}`,obj)
        .then((response)=>{
            const questions = response.data
            if(!questions.errors){
                dispatch(update(_id,questions))
                if(task === 'remove'){
                    fireToast('removed sucessfully')
                } else if(task === 'add'){
                    fireToast('added sucessfully')
                } 
                else {
                    fireToast('changes saved...!')
                }           
            }    
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}
