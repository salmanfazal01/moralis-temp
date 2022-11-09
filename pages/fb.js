import React, { useEffect, useState } from "react";
import { getContacts } from "@lib/user";

const Fb = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    getContacts().then((res) => {
      if (res?.length > 0) {
        const _user = res.find((i) => i.email === "salmanfazal01@gmail.com");

        setText(_user.firstName || "");
      }
    });
  }, []);

  return <h1>{text}</h1>;
};

export default Fb;
