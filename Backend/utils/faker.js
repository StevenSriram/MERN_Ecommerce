import { faker } from "@faker-js/faker";

function createRandomProduct() {
  /*
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    category: random(["men", "women", "kids", "accessories", "footwear"]),
    brand: random(["nike", "adidas", "puma", "levi", "zara", "h&m"]),
  */

  return {
    image: faker.image.url(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    price: faker.commerce.price(10, 100, 2),
    salePrice: faker.commerce.price(5, 90, 2),
    totalStock: faker.number.int({ min: 10, max: 100 }),
    arrival: faker.date.past(),
  };
}

function insertRandomProducts() {
  try {
    const products = faker.helpers.multiple(createRandomProduct, {
      count: 10,
    });

    console.log(products);
  } catch (error) {
    console.error("Error inserting products:", error);
  }
}

insertRandomProducts();
