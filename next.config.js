const path = require("path");

module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/", query: { menu: "blogs" } },
      "/blogs": { page: "/", query: { menu: "blogs" } },
      "/products": { page: "/", query: { menu: "products" } },
      "/others": { page: "/", query: { menu: "others" } },
      "/slides": { page: "/slides" }
    };
  },
  webpack: cfg => {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (entries["main.js"]) {
        entries["main.js"].unshift("./client");
      }
      1;
      return entries;
    };
    return cfg;
  }
};
