export const isLoggedIn = () => !!localStorage.getItem("bw_token");

export const saveAuth = (token, user) => {
  localStorage.setItem("bw_token", token);
  localStorage.setItem("bw_user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("bw_token");
  localStorage.removeItem("bw_user");
  window.location.href = "/login";
};
