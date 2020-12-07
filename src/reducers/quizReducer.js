const quizReducer = (state =[] ,action) =>{
    switch(action.type){
        case 'GET_QUIZ':{
            return [ ...action.payload]
        }
        case 'ADD_QUIZ':{
            return [...state , action.payload]
        }
        case 'UPDATE_QUIZ':{
            return state.map((question)=>{
                if(question._id === action.payload._id){
                    return {...question ,...action.payload.obj}
                }else
                {
                    return {...question}
                }

            })
        }
        case 'REMOVE_CHOICE':{
            return state.map((question)=>{
                if(question._id === action.payload._id){
                    return {...question ,...action.payload.obj}
                }else
                {
                    return {...question}
                }

            })
        }
        case 'ADD_CHOICE':{
            return state.map((question)=>{
                if(question._id === action.payload._id){
                    return {...question ,...action.payload.obj}
                }else
                {
                    return {...question}
                }

            })
        }
        default : {
            return [...state]
        }
    }
}
export default quizReducer