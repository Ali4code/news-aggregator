import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectApiKeys } from "../store/authSlice";

export const useAuthAlert = () => {
  const apikeys = useSelector(selectApiKeys);

  useEffect(() => {
    if (!apikeys.guardianNews || !apikeys.newsApiOrg || !apikeys.nyTimes) {
      alert("Please provide all the API keys from Authentication tab");
    }
  }, [apikeys]);
};
