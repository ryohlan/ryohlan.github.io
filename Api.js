const url =
  "https://api.github.com/repos/ryohlan/ryohlan.github.io/issues?author_association=OWNER&sort=updated";

export const getBlogs = () => fetch(url + "&labels=Blog").then(s => s.json());

export const getOthers = () => fetch(url + "&labels=Other").then(s => s.json());

export const getProducts = () =>
  fetch(url + "&labels=Product").then(s => s.json());
