//import { AxiosRequestConfig } from "axios";
import axios from "../utils/config/axios.config";

export const getAllUsers = (limit: number) => {
    return axios.get('/users');
};

export const getUserById = (id: string) =>{

    
  return axios.get(`/users?id=${id}`);
};