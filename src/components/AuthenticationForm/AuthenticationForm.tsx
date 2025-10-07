import { useState } from "react";
import Classes from "./AuthenticationForm.module.css";
import { API_KEYS_LOCAL_STORAGE_KEY } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApiKeys,
  setActionApiKeys,
  TApiKeys,
} from "../../store/authSlice";
import { setActionSelectedTab } from "../../store/tabsSlice";
import { TABS } from "../Navbar/Navbar.constants";

export const AuthenticationForm = () => {
  const storedApiKeys = useSelector(selectApiKeys);

  const [apiKeys, setApiKeys] = useState<TApiKeys>(
    storedApiKeys || {
      newsApiOrg: "",
      guardianNews: "",
      nyTimes: "",
    }
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeys((prev: TApiKeys) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.setItem(API_KEYS_LOCAL_STORAGE_KEY, JSON.stringify(apiKeys));
    dispatch(setActionApiKeys({ apiKeys }));
    dispatch(setActionSelectedTab({ selectedTab: TABS.news }));
  };

  return (
    <div className={Classes.authentication_header}>
      <div>Please paste in Auth keys in below field</div>
      <form className={Classes.keys_container}>
        <div>
          <div className={Classes.keys_repeater}>
            <div className={Classes.keys}>
              <label htmlFor="newsApiOrg">Newapi.org</label>
              <input
                onChange={onChange}
                name="newsApiOrg"
                id="newsApiOrg"
                type="text"
                value={apiKeys.newsApiOrg ?? ""}
              ></input>
            </div>
            <div className={Classes.keys}>
              <label htmlFor="guardianNews">The Guardian</label>
              <input
                onChange={onChange}
                name="guardianNews"
                id="guardianNews"
                type="text"
                value={apiKeys.guardianNews ?? ""}
              ></input>
            </div>
            <div className={Classes.keys}>
              <label htmlFor="nyTimes">New York Times</label>
              <input
                onChange={onChange}
                name="nyTimes"
                id="nyTimes"
                type="text"
                value={apiKeys.nyTimes ?? ""}
              ></input>
            </div>
          </div>
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <div>
        <p>
          This Section added to avoid committing private keys to the repository
          as its a very bad practice to do so
        </p>
        <p>
          but to make it easy to run the project i'm gonna commit keys to repo
        </p>
        <p>
          if you are seeing this application on a deployed url, newsapi.org will
          throw an CORS error because i'm not using their commercial keys (paid)
        </p>
      </div>
    </div>
  );
};
