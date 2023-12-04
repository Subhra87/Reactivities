import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activitiy";
 const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
 }
axios.defaults.baseURL='http://localhost:5000/api'
axios.interceptors.response.use(async response=>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const resposeBody=<T>(response:AxiosResponse<T>)=> response.data;

const request={
    get:<T>(url:string)=>axios.get<T>(url).then(resposeBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(resposeBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(resposeBody),
    del:<T>(url:string,id:string)=>axios.delete<T>(url).then(resposeBody),
}

const Activities ={
    list:()=>request.get<Activity[]>('/activity/getactivities'),
    details:(id:string)=>request.get<Activity>(`/activity/${id}`),
    create :(activity:Activity)=>axios.post<void>('/activity',activity),
    update:(activity:Activity)=> axios.put<void>(`/activity/${activity.id}`,activity),
    delete:(id:string)=>axios.delete<void>(`/activity/${id}`)
}
 const agent={
    Activities
 }
 export default agent;