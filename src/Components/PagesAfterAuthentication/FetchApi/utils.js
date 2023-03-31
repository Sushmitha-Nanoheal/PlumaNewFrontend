export function fetchApi(path, method, body = undefined, requiresLogin = true) {
  // console.log(process.env.NEXT_PUBLIC_API);
  const headers = { "content-type": "application/json" };
  if (requiresLogin) {
    headers["Authorization"] = localStorage.getItem("token");
  }
  return fetch(new URL(path, `${process.env.REACT_APP_API_URL}`), {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined
  }).then((response) => {
    if (response.status == 401) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      return response;
    }
  });
}
