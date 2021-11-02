import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export function isResponseOK(response) {
  console.log(response);
  if (response.status >= 200 && response.status <= 299) {
    if (response.data) return response.data;
    return response;
  } else if (response.status >= 400 && response.status <= 499) {
    if (response.data) return response.data;
    return response;
  } else {
    throw new Error("Response ERROR!");
  }
}

export class RequestHandler {
  // Base class for handling requests
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
  async sendRequest() {
    const response = await axios(this.request_conf);
    var data = isResponseOK(response);
    return data;
  }
}

export default class Authenticator extends RequestHandler {
  // Class made to handle authentications.
  // Create new instance with params and use object to operate
  constructor(url, method = "GET", contentType = "application/json") {
    super(url, method, contentType);
  }

  async login() {
    let form_username = document.getElementById("username").value;
    let form_password = document.getElementById("password").value;
    this.request_conf["data"] = {
      username: form_username,
      password: form_password,
    };
    try {
      let data = await this.sendRequest();
      return {
        isAuthenticated: data.isAuthenticated,
        user: data.user,
        user_link: data.user_link,
        error: "",
      };
    } catch (error) {
      console.log(error.response.data.detail);
      return {
        isAuthenticated: false,
        error: `${error.response.data.detail}`,
      };
    }
  }

  async get_session() {
    let state_data = {};
    try {
      var session_data = await this.sendRequest();
      state_data = {
        isAuthenticated: session_data.isAuthenticated,
        user: session_data.user,
        user_link: session_data.user_link,
      };
    } catch (error) {
      console.log("Not logged in.");
      console.error(error.toJSON());
      state_data = {
        isAuthenticated: false,
        user: "",
        user_link: "",
      };
    }
    return state_data;
  }

  async logout() {
    try {
      let data = await this.sendRequest();
      return {
        isAuthenticated: data.isAuthenticated,
        user: "",
        user_link: "",
        error: "",
      };
    } catch (error) {
      console.log(error);
      console.error(error.toJSON());
      return {
        isAuthenticated: false,
        user: "",
        user_link: "",
        error: "Something went wrong when loggin out!",
      };
    }
  }

  async register_get_form() {
    try {
      let form_data = await this.sendRequest();
      return form_data;
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  async register() {
    try {
      var data = await this.sendRequest();
    } catch (error) {
      console.error(error.toJSON());
      data = error.response.data;
    }
    console.log({ data });
    return data;
  }

  async whoami() {
    try {
      var data = this.sendRequest();
    } catch (error) {
      console.error(error.toJSON());
    }
    return data;
  }
}
