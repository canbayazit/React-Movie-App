import { getAuth, signOut, updatePassword } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutHandle } from "../Store/authSlice";
import { useAppDispatch } from "./Hook";

export const useChangePassword = (newPassword: string) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (newPassword) {
      const update = async () => {
        await updatePassword(auth.currentUser!, newPassword)
          .then(() => {
            toast.success("Successfully updated Password!", {
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
          navigate("/login");
      };
      update();
    }
  }, [auth, dispatch, navigate, newPassword]);
};
