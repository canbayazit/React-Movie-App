import { getAuth, signOut, updateEmail } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutHandle } from "../Store/authSlice";
import { useAppDispatch } from "./Hook";

export const useChangeEmail = async (newEmail: string) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (newEmail) {
      updateEmail(auth.currentUser!, newEmail)
        .then(() => {
          toast.success("Successfully updated email!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
      signOut(auth)
        .then(() => {
          dispatch(logOutHandle());
          navigate("/login");
          toast.warning("you need to login again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [auth, dispatch, navigate, newEmail]);
};
