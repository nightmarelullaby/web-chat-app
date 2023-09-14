import {create} from "zustand";
import {persist} from 'zustand/middleware'
export const useUserInformationStore = create(
  persist(
    (set, get) => ({
      chats:[],createdAt:"",email:"",friendRequests:[],friends: [],password:"",updatedAt:"",username:"",__v:0,_id:"",status:"",
      setUserInfo:(obj) => set((state) => (obj)) 
    }),
    {
  
    }
  )
)
// export const useUserInformationStore = create(
//   persist((set) => ({
//     userInfo:{chats:[],createdAt:"",email:"",friendRequests:[],friends: [],password:"",updatedAt:"2023-08-24T02:27:00.178Z",username:"",__v:0,_id:""},
//     notifications:[],
//     friends:[],
//     chats:[],
//     setUserInfo:(obj) => set((state) => ({userInfo:obj})) 
// })),{});
