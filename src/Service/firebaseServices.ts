// not working above import for react firebase.
// import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  IUserCollection,
  IUserLogin,
  IUserRegister,
} from "../Types/sliceStates";
import { auth, db } from "./firebase";
import image from "../Assets/img/simpson_user.png";
export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["POST"],
  endpoints: (builder) => ({
    fethBlogs: builder.query({
      queryFn() {
        return { data: "ok" };
      },
    }),
    postLoginService: builder.mutation<any, Partial<IUserLogin>>({
      async queryFn(arg) {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            arg.email!,
            arg.password!
          );
          //To serialize an object to JSON, you can use JSON.stringify: 
          //otherwise you will get error on console.
          return { data: JSON.stringify(user) };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: [{ type: "POST", id: "LIST" }],
    }),
    postRegisterService: builder.mutation<any, Partial<IUserRegister>>({
      async queryFn(arg) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            arg.email!,
            arg.password!
          );
          await updateProfile(auth.currentUser!, {
            displayName: arg.username,
            photoURL: image,
          });
          //it must be object and property's key name "data"
          return { data: "ok" };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: [{ type: "POST", id: "LIST" }],
    }),
    postFavoriteService: builder.mutation<string, Partial<IUserCollection>>({
      async queryFn(arg) {
        try {
          await addDoc(collection(db, `${arg.uid}`), {
            ...arg,
          });
          return { data: "ok" };
        } catch (error) {
          return {
            error: toast.error(`${error}`, {
              position: "top-center",
              autoClose: 5500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }),
          };
        }
      },
      invalidatesTags: [{ type: "POST", id: "LIST" }],
    }),
    postWatchListService: builder.mutation<string, Partial<IUserCollection>>({
      async queryFn(arg) {
        try {
          await addDoc(collection(db, `${arg.uid}`), {
            ...arg,
          });
          return { data: "ok" };
        } catch (error) {
          return {
            error: toast.error(`${error}`, {
              position: "top-center",
              autoClose: 5500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }),
          };
        }
      },
      invalidatesTags: [{ type: "POST", id: "LIST" }],
    }),
  }),
});
export const {
  useFethBlogsQuery,
  usePostFavoriteServiceMutation,
  usePostWatchListServiceMutation,
  usePostRegisterServiceMutation,
  usePostLoginServiceMutation,
} = firebaseApi;
