module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/", query: { menu: "blogs" } },
      "/blogs": { page: "/", query: { menu: "blogs" } },
      "/products": { page: "/", query: { menu: "products" } },
      "/others": { page: "/", query: { menu: "others" } },
      "/slides": { page: "/slides" }
    };
  }
};
