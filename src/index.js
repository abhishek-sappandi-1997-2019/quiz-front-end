import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Configstore from './store/configureStore'
import {Provider} from 'react-redux'
//import {startGetQuiz} from './actions/quizAction'

const store = Configstore()
console.log('initial state',store.getState())
store.subscribe(()=>{             // calls for every update in redux 
    console.log(store.getState()) 
})

// handle page reload
//store.dispatch(startGetQuiz())

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))