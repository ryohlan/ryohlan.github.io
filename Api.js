const Base = "https://api.github.com/repos/ryohlan/ryohlan.github.io/issues";

const url = Base + "?author_association=OWNER&sort=updated";

export const getBlogs = () =>
  fetch(url + "&labels=Blog")
    .then(res => {
      if (res.ok) {
        return res;
      }
      throw res;
    })
    .then(s => s.json());

export const getOthers = () => fetch(url + "&labels=Other").then(s => s.json());

export const getProducts = () =>
  fetch(url + "&labels=Product").then(s => s.json());

export const getSlide = (slideId: string) =>
  fetch(Base + "/" + slideId).then(res =>
    res.json().then(r => {
      if (res.ok) {
        return r;
      }
      throw r;
    })
  );
