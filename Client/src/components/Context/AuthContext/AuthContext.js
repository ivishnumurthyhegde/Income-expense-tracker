import { createContext, useReducer } from "react";
import axios from "axios";

import { API_URL_USER } from "../../../utils/apiURL";
import {  FETCH_PROFILE_FAIL,
    FETCH_PROFILE_SUCCESS,
     LOGIN_FAILED,
      LOGIN_SUCCESS, 
      LOGOUT, 
      REGISTER_SUCCESS, 
    REGISTER_FAIL} from "./authActionTypes";


 export const authContext= createContext();

 const INITIAL_STATE={
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    error: null,
    loading : false,
    profile: null
 }

 //auth reducer
 const reducer=(state, action)=>{
 const {type, payload} =action;
 switch ( type){

//register user reducer
    case REGISTER_SUCCESS: 
    return {
        ...state, 
        error: null,
        loading: false, 
        userAuth: payload,

    };
    case REGISTER_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
          userAuth: null,
        };

//Login User reducer
    case LOGIN_SUCCESS: 
    // saving into localstorage 
    localStorage.setItem("userAuth", JSON.stringify(payload));
    return {
        ...state, 
        error: null,
        loading: false, 
        userAuth: payload,

    };
    case LOGIN_FAILED:
        return {
          ...state,
          error: payload,
          loading: false,
          userAuth: null,
        };

//User Profile reducer
        case FETCH_PROFILE_SUCCESS:
            return{
                ...state, 
                error: null,
                loading: false, 
                profile: payload,
            };

         case FETCH_PROFILE_FAIL:
            return{
                ...state, 
                error: payload,
                loading: false, 
                profile: null,
            };

// logout user
            case LOGOUT:
                return{
                    ...state,
                    error: null,
                    loading: null,
                    userAuth:null,
                };

        default: 
        return state;
 }

 }

 const AuthContextProvider=({children})=>{
    const [state, dispatch]= useReducer(reducer, INITIAL_STATE);

 // Register User 
    const registerUserAction= async (formData)=>{
        const config={
            header: {
                "Content-Type": "application/json",
            }
        }
        try {
            const res=await axios.post(
               `${API_URL_USER}/register`,
                 formData,
                  config);
           if(res?.data?.status=="success"){
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
           })
           }
           window.location.href='/login';
        } catch (error) {
            console.log(error);
            dispatch({
                type:REGISTER_FAIL,
                payload: error?.response?.data?.message,
           })
        }};



//login user
const loginUserAction= async (formData)=>{
    const config={
        header: {
            "Content-Type": "application/json",
        }
    }
    try {
        const res=await axios.post(
           `${API_URL_USER}/login`,
             formData,
              config);
       if(res?.data?.status=="success"){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
       })
       }
       window.location.href='/dashboard';
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAILED,
            payload: error?.response?.data?.message,
       })
    }};


//User Profile
const fetchProfileAction= async ()=> {
    try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state?.userAuth?.token}`,
          },
        };
        const res = await axios.get(`${API_URL_USER}/profile`, config);
        console.log(res);
        if (res?.data) {
          dispatch({
            type: FETCH_PROFILE_SUCCESS,
            payload: res.data,
          });
        }
      } catch (error) {
        dispatch({
          type: FETCH_PROFILE_FAIL,
          payload: error?.response?.data?.message,
        });
      }
};

//Logout User
 const logoutUserAction=()=>{
    // remove user from localstorage
    localStorage.removeItem('userAuth');
    dispatch({
        type: LOGOUT,
        payload: null,
    })
    window.location.href='/login';
 }
    return <authContext.Provider value={{ 
          loginUserAction,
        userAuth: state,
        fetchProfileAction,
        profile: state?.profile,
        token: state?.userAuth?.token,
        error: state?.error,
        logoutUserAction,
        registerUserAction,
        }}>
    {children}
    </authContext.Provider>
 }

export default AuthContextProvider;