export const filterData = (category, brand) => {
  let filters = {};

  if (category.length > 0) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length > 0) {
    filters.brand = { $in: brand.split(",") };
  }

  return filters;
};

export const sortData = (sortBy) => {
  let sort = {};

  switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;
      break;
    case "price-hightolow":
      sort.price = -1;
      break;
    case "title-atoz":
      sort.title = 1;
      break;
    case "title-ztoa":
      sort.title = -1;
      break;
    default:
      sort.arrival = -1;
  }

  return sort;
};
