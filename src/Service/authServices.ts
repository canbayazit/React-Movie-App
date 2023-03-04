import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";
import image from "../Assets/img/user.png";
const auth = getAuth(app);

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
    console.log(error.message);
  }
};

//Login
export const Login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};
