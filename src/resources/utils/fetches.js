export function getFetchOptions() {
  let jwt = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  };
  return options;
}
