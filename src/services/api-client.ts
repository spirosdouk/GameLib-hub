import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key:'926777cc9bf6459ba463eb02f8d6c7a0'
    }
})