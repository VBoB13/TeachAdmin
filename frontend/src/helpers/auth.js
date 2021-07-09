import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export function isResponseOK(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.data;
  } else if (response.status >= 400 && response.status <= 499) {
    return response.data;
  } else {
    console.log(response);
    throw new Error("Response ERROR!");
  }
}

export async function login() {
  // Reading the values from input fields
  let form_username = document.getElementById("username").value;
  let form_password = document.getElementById("password").value;

  // Setting up variable to return to App
  const loginData = await axios({
    method: "POST",
    url: "/accounts/login/",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    data: JSON.stringify({
      username: form_username,
      password: form_password,
    }),
  })
    .then(isResponseOK)
    .then((data) => {
      console.log({ data });
      return {
        isAuthenticated: data.isAuthenticated,
        user: data.user,
        user_link: data.user_link,
        error: "",
      };
    })
    .catch((err) => {
      console.log({ err });
      return {
        isAuthenticated: false,
        error: "Wrong username or password!",
      };
    });

  return loginData;
}

export async function logout() {
  // Authentication process START
  const userData = await axios("/accounts/logout/", {
    credentials: "same-origin",
  })
    .then(isResponseOK)
    .then((data) => {
      console.log(data);
      return {
        isAuthenticated: data.isAuthenticated,
        user: "",
        user_link: "",
        error: "",
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        isAuthenticated: false,
        user: "",
        user_link: "",
        error: "Something went wrong when loggin out!",
      };
    });
  return userData;
}

export async function getSessionData() {
  const sessionData = await axios({
    method: "GET",
    url: "/accounts/session/",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(isResponseOK)
    .then((data) => {
      if (data.isAuthenticated) {
        return {
          isAuthenticated: true,
          user: data.user,
          user_link: data.user_link,
        };
      } else {
        return {
          isAuthenticated: false,
          user: "",
          user_link: "",
        };
      }
    })
    .catch((err) => {
      console.error(err);
      return {
        error: "Server session call failed.",
      };
    });
  return sessionData;
}
