import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import image from "../Assets/img/user.png";
import { toast } from "react-toastify";

//Sign-up
export const signUp = async (name: string, email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: image,
    });
    return user;
  } catch (error: any) {
    toast.error(`${error.message}`, {
      position: "top-center",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

//Login
export const Login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    toast.error(`${error.message}`, {
      position: "top-center",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};