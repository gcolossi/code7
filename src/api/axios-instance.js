import axios from 'axios';


export const apiUser = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/users'
})


export const apiCode = axios.create({
    baseURL:'https://provadev.xlab.digital/api/v1/divida/'
})


