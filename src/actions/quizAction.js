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
export const removeChoice = (_id ,obj) =>{
    return {type:'REMOVE_CHOICE' , payload:{_id,obj}}
}
export const addChoice = (_id ,obj) =>{
    return {type:'ADD_CHOICE' , payload:{_id,obj}}
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
        console.log('inside action');
        axios.put(`quiz/${_id}`,obj)
        .then((response)=>{
            const questions = response.data
            if(!questions.errors){
                dispatch(update(_id,questions))
                toast.error('Changes Saved', {
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
export const StartDeleteQuizChoice = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`quiz/remove/${_id}`,obj)
        .then((response)=>{
            const user = response.data
            if(!user.errors){
                dispatch(removeChoice(_id,user))
            }
            
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}
export const StartAddQuizChoice = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`quiz/add/${_id}`,obj)
        .then((response)=>{
            const user = response.data
            if(!user.errors){
                dispatch(addChoice(_id,user))
            }
            
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}