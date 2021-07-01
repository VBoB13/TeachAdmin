import Cookies from "universal-cookie";

const cookies = new Cookies();

export function isResponseOK(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else if (response.status >= 400 && response.status <= 499) {
      return response.json();
    } else {
      console.log(response);
      throw new Error("Response ERROR!");
    }
  }

export function login(componentLogin) {
    // Reading the values from input fields
    let form_username = document.getElementById("username").value;
    let form_password = document.getElementById("password").value;

    // Setting up variable to return to App
    var loginData = {};

    // Sending request to server to login
    fetch("/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: form_username,
        password: form_password,
      }),
    })
      .then(isResponseOK)
      .then((data) => {
        loginData = {
            isAuthenticated: data.isAuthenticated,
            user: data.user,
            user_link: data.user_link,
            error: "",
        };
        console.log('loginData SET to:');
        console.log(loginData);
        componentLogin(loginData);
      })
      .catch((err) => {
        console.log(err);
        loginData = {
            isAuthenticated: false,
            error: "Wrong username or password!",
        };
      });
    return loginData;
}

export function logout(event){
    // Preventing Event default behavior
    event.preventDefault();
    // Initiating an empty object to store the login data
    let userData = {};
    // Authentication process START
    fetch("/accounts/logout/", {
      credentials: "same-origin",
    })
      .then(isResponseOK)
      .then((data) => {
        console.log(data);
        userData = {
          isAuthenticated: false,
          user: "",
          user_link: "",
          error: ""
        };
      })
      .catch((err) => {
        console.log(err);
        userData = {
          isAuthenticated: false,
          user: "",
          user_link: "",
          error: "Something went wrong when loggin out!"
        };
      });
    return userData;
}

export function getSessionData() {
    let sessionData = {};
    fetch("/accounts/session/", {
        credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
    if (data.isAuthenticated) {
        sessionData = {
            isAuthenticated: true,
            user: data.user,
            user_link: data.user_link
        };
    } else {
        sessionData = {
            isAuthenticated: false,
            user: "",
            user_link: ""
        };
    }
    })
    .catch((err) => {
        sessionData = {
            error: "Server session call failed."
        };
        console.error(err);
    });
    return sessionData;
}