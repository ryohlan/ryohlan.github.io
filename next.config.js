module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/", query: { menu: "blogs" } },
      "/?menu=blogs": { page: "/", query: { menu: "blogs" } },
      "/?menu=products": { page: "/", query: { menu: "products" } },
      "/?menu=others": { page: "/", query: { menu: "others" } },
      "/slides": { page: "/slides" }
    };
  }
};
