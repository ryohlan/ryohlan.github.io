const url =
  "https://api.github.com/repos/ryohlan/ryohlan.github.io/issues?author_association=OWNER";

export const getBlogs = () => fetch(url + "&labels=Blog").then(s => s.json());

export const getSlides = () => fetch(url + "&labels=Slide").then(s => s.json());
