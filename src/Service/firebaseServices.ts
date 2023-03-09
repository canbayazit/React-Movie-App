// not working above import for react firebase.
// import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  IComment,
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
    postCommentService: builder.mutation<any, Partial<IComment>>({
      async queryFn(arg) {
        try {
          const docRef = doc(db, `${arg.id}`, "Comments");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await updateDoc(docRef, {
                comments: arrayUnion({
                name: arg.name,
                description: arg.description,
                date: arg.date,
              }),
            });
          } else {
            await setDoc(doc(db, `${arg.id}`, "Comments"), {
            comments: arrayUnion({
                name: arg.name,
                description: arg.description,
                date: arg.date,
              }),
            });
          }
          return { data: "ok" };
        } catch (error: any) {
          return {
            error: toast.error(`${error.message}`, {
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
          await createUserWithEmailAndPassword(auth, arg.email!, arg.password!);
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
          const docRef = doc(db, `${arg.uid}`, "FL");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let data = docSnap
              .data()
              .ids.find(
                (item: { id: number | undefined }) => item.id === arg.id
              );
            if (data) {
              await updateDoc(docRef, {
                ids: arrayRemove(data),
              });
            } else {
              await updateDoc(docRef, {
                ids: arrayUnion({ id: arg.id, category: arg.category }),
              });
            }
          } else {
            await setDoc(doc(db, `${arg.uid}`, "FL"), {
              ids: arrayUnion({ id: arg.id, category: arg.category }),
            });
          }
          return { data: "ok" };
        } catch (error: any) {
          return {
            error: toast.error(`${error.message}`, {
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
          const docRef = doc(db, `${arg.uid}`, "WL");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let data = docSnap
              .data()
              .ids.find(
                (item: { id: number | undefined }) => item.id === arg.id
              );
            if (data) {
              await updateDoc(docRef, {
                ids: arrayRemove(data),
              });
            } else {
              await updateDoc(docRef, {
                ids: arrayUnion({ id: arg.id, category: arg.category }),
              });
            }
          } else {
            await setDoc(doc(db, `${arg.uid}`, "WL"), {
              ids: arrayUnion({ id: arg.id, category: arg.category }),
            });
          }

          return { data: "ok" };
        } catch (error: any) {
          return {
            error: toast.error(`${error.message}`, {
              position: "top-center",
              autoClose: 20000,
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
  usePostCommentServiceMutation,
  usePostFavoriteServiceMutation,
  usePostWatchListServiceMutation,
  usePostRegisterServiceMutation,
  usePostLoginServiceMutation,
} = firebaseApi;
