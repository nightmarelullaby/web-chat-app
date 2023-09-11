import {create} from "zustand";
export const useUserInformationStore = create((set) => ({
  userInfo:{chats:[],createdAt:"",email:"",friendRequests:[],friends: [],password:"",updatedAt:"2023-08-24T02:27:00.178Z",username:"",__v:0,_id:""},
  notifications:[],
  friends:[],
  chats:[],
  setUserInfo:(obj) => set((state) => ({userInfo:obj})) 
}));