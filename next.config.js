module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/", query: { page: "blogs" } },
      "/blogs": { page: "/", query: { page: "blogs" } },
      "/products": { page: "/", query: { page: "products" } },
      "/others": { page: "/", query: { page: "others" } },
      "/slides": { page: "/slides" }
    };
  }
};
