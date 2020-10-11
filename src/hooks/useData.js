import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const db = firebase.ref(url);
    db.on("value", (snapshot) => {
      if (snapshot.val() !== data) setData(snapshot.val());
    });
    return () => db.off();
  }, [url]);

  return data;
}

export default useData;
