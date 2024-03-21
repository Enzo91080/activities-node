const generateWoodLinks = (wood) => {
  const id = wood.id;
  return [
    {
      rel: "getWoodById",
      method: "GET",
      href: `/wood/${id}`,
    },
    {
      rel: "editWood",
      method: "put",
      href: `/wood/${id}`,
    },
    {
      rel: "deleteWood",
      method: "delete",
      href: `/wood/${id}`,
    },
    {
      rel: "sameHardness",
      method: "get",
      href: `/wood/${wood.hardness}`,
    },
  ];
};

const globalLinks = () => {
  return [
    {
      rel: "all",
      method: "get",
      href: "/wood",

    },
    {
      rel: "create",
      method: "post",
      href: "/wood",

    },
    {
      rel: "byHardness",
      method: "get",
      href: "/wood/hardness",

    }
  ]
}

module.exports = {
  generateWoodLinks,
  globalLinks
};
