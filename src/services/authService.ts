import axios from "../utils/config/axios.config";

/**
 * @param {string} email
 * @param {string} password 
 * @returns 
 */
export const login = (email: string, password: string) => {
   
    let body = {
        email,
        password
    };

    return axios.post('/auth/login', body);
};

/**
 * Method for Register of user
 * @param {string} name Name of user
 * @param {string} email email of user
 * @param {string} password password of user
 * @param {number} age age of user
 * @returns 
 */
export const register = (name: string, email: string, password: string, age: number) => {
 
    let body = {
        name,
        email,
        password,
        age
    };

    return axios.post('/auth/register', body);
};