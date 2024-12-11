import axios from 'axios'

export const axiosInctance = axios.create({});

export const apiConnector = (method,url,bodData,headers,params) => {
    return axiosInctance({
        method:`${method}`,
        url:`${url}`,
        data:bodData ? bodData : null,
        headers:headers ? headers : null,
        params:params ? params : null
    })
} 