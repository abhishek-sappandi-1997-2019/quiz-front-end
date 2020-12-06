import axios from 'axios'

const Axios = axios.create({
    baseURL : `http://localhost:3344/api`
})

export default Axios
