import { AxiosRequestConfig } from 'axios';
import axios from '../utils/config/axios.config';
import { Kata } from '../types/Kata.type'

export const getAllKatas = (token: string, limit?: number, page?: number) => {
 
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params:{
            limit,
            page
        }
    };
    
    return axios.get('/katas', options);
};

export const getKataById = (token: string, id: string) => {

    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params:{
            id
        }
    };

   return axios.get('/katas', options)

};

export const createKata = (token: string, kata: Kata) => {

    const options: AxiosRequestConfig ={
       headers: {
        'x-access-token': token
       }
    };

  return axios.post('/katas', { options, kata });
};