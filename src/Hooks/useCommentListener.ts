import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Service/firebase";
import { IComment } from "../Types/sliceStates";

export const useCommentListener = (id?: string) => {
  const [data, setData] = useState<IComment[]>([]);
  useEffect(() => {
    if (id) {
      onSnapshot(doc(db, `${id}`, "Comments"), (doc) => {
        let data = doc.data();
        console.log(data, "comments");
        setData([...data?.comments])
      });
    }
  }, [id]);
  return data;
};
