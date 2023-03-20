import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutHandle } from "../Store/authSlice";
import { useAppDispatch } from "./Hook";

export const useUpdatedDisplayName = (newUsername: string) => {
  const { t } = useTranslation();
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
            toast.success(t('updatedUsername'), {
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
            toast.warning(t('needLoginAgain'), {
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
  }, [auth, dispatch, navigate, newUsername, t]);
};
