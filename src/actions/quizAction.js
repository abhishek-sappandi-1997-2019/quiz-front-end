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
export const startGetQuiz = () =>{
    return (dispatch) =>{
        axios.get('/quiz')
        .then((response)=>{
            const questions = response.data
            ////console.log(user)
            dispatch(get(questions))
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}
export const startAddQuiz= (data)=>{
    return (dispatch) =>{
        axios.post('/quiz',data)
        .then((response)=>{
            const questions = response.data
            //console.log("in action");
            if(!questions.errors){
                dispatch(add(questions))
                toast.error('Added sucessfully', {
                    position: "top-center",
                    autoClose: 1200,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }  
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}

export const startUpdateQuiz = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`quiz/${_id}`,obj)
        .then((response)=>{
            const questions = response.data
            if(!questions.errors){
                dispatch(update(_id,questions))
            }    
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}