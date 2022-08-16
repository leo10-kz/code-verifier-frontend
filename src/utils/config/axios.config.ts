import axios from "axios";

export  default axios.create({
    baseURL: 'http://localhost:8000/api',// la URL base se completará con los endpoints de nuestra aplicación backend
    responseType: 'json',
    timeout: 6000
});