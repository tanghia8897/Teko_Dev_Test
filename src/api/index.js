import { BASE_API } from "../constants/appSettings";
import { ACCESS_TOKEN } from "../constants/localStorageKeys";
import { showError, showInfo } from "../utils/app";
import { signOut } from "../auth";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};


export function get(endpoint, successCallback, errorCallback) {
  myFetch("GET", endpoint, undefined, successCallback, errorCallback);
}

export function post(endpoint, body, successCallback, errorCallback) {
  myFetch("POST", endpoint, body, successCallback, errorCallback);
}

export function put(endpoint, body, successCallback, errorCallback) {
  myFetch("PUT", endpoint, body, successCallback, errorCallback);
}
export function _delete(endpoint, body, successCallback, errorCallback) {
  myFetch("DELETE", endpoint, body, successCallback, errorCallback);
}
export function postFormData(endpoint, data, successCallback, errorCallback) {
  let url = BASE_API + endpoint;

  let response = fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "bearer " + window.localStorage.getItem(ACCESS_TOKEN)
    },
    body: data
  });

  handleResponse(response, successCallback, errorCallback);
}

function myFetch(method, endpoint, body, successCallback, errorCallback) {
  let url = BASE_API + endpoint;

  body = JSON.stringify(body);

  let headers = defaultHeaders;
  headers["Authorization"] =
    "bearer " + window.localStorage.getItem(ACCESS_TOKEN);

  let response = null;

  if (body == undefined)
    response = fetch(url, {
      method: method,
      headers: headers
    });
  else {
    response = fetch(url, {
      method: method,
      headers: headers,
      body: body
    });
  }
  handleResponse(response, successCallback, errorCallback);
}

var isSessionTimeOut = false;
const handleResponse = (response, successCallback, errorCallback) => {
  response.then(r => {
    if (r.status == 200) {
      if (successCallback) {
        r.json()
          .then(result => {
            if (successCallback) successCallback(result);
          })
          .catch(() => {
            if (successCallback) successCallback();
          });
      }
    } else if (r.status == 400) {
      r.json()
        .then(result => {
          handleError(errorCallback, result);
        })
        .catch(() => {
          handleError(errorCallback, "Unknown error occurred");
        });
    } else if (r.status == 401) {
      if (!isSessionTimeOut) {
        isSessionTimeOut = true;
        handleError(null, "Session timeout");
        signOut();
      }
    } else if (r.status == 403) {
      isSessionTimeOut = true;
      handleError(null, "Session timeout");
      signOut();
    } else {
      handleError(null, "Unhandled response");
    }
  });
};

const handleError = (errorCallback, error) => {
  if (error.errorCode == "Info") {
    showInfo(error.message);
  } else {
    showError(error.message);
    if (errorCallback) errorCallback(error);
  }
};
