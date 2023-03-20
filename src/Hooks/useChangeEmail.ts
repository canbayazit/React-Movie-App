import { getAuth, signOut, updateEmail } from "firebase/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutHandle } from "../Store/authSlice";
import { useAppDispatch } from "./Hook";

export const useChangeEmail = (newEmail: string) => {
  const { t } = useTranslation();
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (newEmail) {
      const update = async () => {
        const result = await updateEmail(auth.currentUser!, newEmail)
          .then(() => {
            toast.success(t("updatedMail"), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return "";
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
            return "error";
          });
        if (!result) {
          await signOut(auth)
            .then(() => {
              dispatch(logOutHandle());
              navigate("/login");
              toast.warning(t("needLoginAgain"), {
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
      };
      update();
    }
  }, [auth, dispatch, navigate, newEmail, t]);
};
