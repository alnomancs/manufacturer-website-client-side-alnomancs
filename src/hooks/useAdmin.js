import React, { useState } from "react";

const useAdmin = ({ user }) => {
  const [admin, setAdmin] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  return [admin];
};

export default useAdmin;
