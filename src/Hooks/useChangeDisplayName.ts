import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutHandle } from "../Store/authSlice";
import { useAppDispatch } from "./Hook";

export const useUpdatedDisplayName = (newUsername: string) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (newUsername) {
      const update = async () => {
        await updateProfile(auth.currentUser!, {
          displayName: newUsername,
        })
          .then(() => {
            toast.success("Successfully updated username!", {
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

        await signOut(auth)
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
      };
      update();
    }
  }, [auth, dispatch, navigate, newUsername]);
};
