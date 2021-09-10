import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export function isResponseOK(response) {
  if (response.status >= 200 && response.status <= 299) {
    console.log(response);
    return response.data;
  } else if (response.status >= 400 && response.status <= 499) {
    console.log(response);
    return response.data;
  } else {
    console.log(response);
    throw new Error("Response ERROR!");
  }
}

export default class Authenticator {
  // Class made to handle authentications.
  // Create new instance with params and use object to operate
  constructor(url, method = "GET", contentType = "application/json") {
    this.url = url;
    this.method = method;
    this.contentType = contentType;
    this.request_conf = {
      method: this.method,
      url: this.url,
      headers: {
        "Content-Type": this.contentType,
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
    };
  }

  async login() {
    let form_username = document.getElementById("username").value;
    let form_password = document.getElementById("password").value;
    this.request_conf["data"] = {
      username: form_username,
      password: form_password,
    };
    const loginData = await axios(this.request_conf)
      .then(isResponseOK)
      .then((data) => {
        return {
          isAuthenticated: data.isAuthenticated,
          user: data.user,
          user_link: data.user_link,
          error: "",
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          isAuthenticated: false,
          error: "Wrong username or password!",
        };
      });
    return loginData;
  }

  async get_session() {
    const sessionData = await axios(this.request_conf)
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

  async logout() {
    const userData = await axios(this.request_conf)
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

  async register_get_form() {
    const form_data = await axios(this.request_conf)
      .then(isResponseOK)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(
          "Something went wrong when retrieving form data for Register!"
        );
        console.error(err);
      });
    console.log(form_data);
    return form_data;
  }

  async register() {
    try {
      const response = await axios(this.request_conf);
      var data = isResponseOK(response);
    } catch (error) {
      console.error(error.toJSON());
      data = error.response.data;
    }
    console.log({ data });
    return data;
  }
}
