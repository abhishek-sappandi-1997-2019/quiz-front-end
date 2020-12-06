const quizReducer = (state =[] ,action) =>{
    switch(action.type){
        case 'GET_QUIZ':{
            return [ ...action.payload]
        }
        case 'ADD_QUIZ':{
            return [...state , action.payload]
        }
        case 'UPDATE_QUIZ':{
            return state.map((message)=>{
                if(message._id === action.payload._id){
                    return {...message ,...action.payload.obj}
                }else
                {
                    return {...message}
                }

            })
        }
        default : {
            return [...state]
        }
    }
}
export default quizReducer