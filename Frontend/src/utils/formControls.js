export const registerFormControls = [
  {
    name: "name",
    label: "Username",
    placeholder: "Enter user name",
    componentType: "input",
    type: "text",
    focus: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    componentType: "input",
    type: "email",
    focus: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormControls = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    placeholder: "Select Category",
    componentType: "select",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
      { value: "household", label: "Household" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    placeholder: "Select Brand",
    componentType: "select",
    options: [
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "puma", label: "Puma" },
      { value: "levi", label: "Levi's" },
      { value: "zara", label: "Zara" },
      { value: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
