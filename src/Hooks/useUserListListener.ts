import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { db } from "../Service/firebase";
import { setFavoriteList, setWatchList } from "../Store/movieSlice";
import { useAppDispatch, useAppSelector } from "./Hook";

export const useUserListListener = () => {
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (uid) {
      onSnapshot(doc(db, `${uid}`, "FL"), (doc) => {
        dispatch(setFavoriteList(doc.data()?.ids));
      });
      onSnapshot(doc(db, `${uid}`, "WL"), (doc) => {
        dispatch(setWatchList(doc.data()?.ids));
      });
    }
  }, [dispatch, uid]);
};
