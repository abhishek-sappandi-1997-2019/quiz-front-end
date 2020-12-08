import axios from 'axios'

const Axios = axios.create({
    baseURL : `https://quiz-node-backend-1.herokuapp.com/api`
})

export default Axios
