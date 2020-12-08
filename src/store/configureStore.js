import { createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import quizReducer from '../reducers/quiz'

const Configstore = () =>{
    const store = createStore(combineReducers({
        quiz : quizReducer 
    }), applyMiddleware(thunk))
    return store
}

export default Configstore