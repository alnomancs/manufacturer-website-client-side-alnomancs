import React, { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  const email = user?.user?.email;
  const currentUser = { email: email };

  if (email) {
    fetch(``, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  useEffect(() => {});

  return [token];
};

export default useToken;
