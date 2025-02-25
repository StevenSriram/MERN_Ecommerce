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
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
    minLength: 4,
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    componentType: "input",
    type: "email",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    focus: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
    minLength: 4,
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
      { id: "electronics", label: "Electronics" },
      { value: "household", label: "Household" },
      { id: "sports", label: "Sports" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    placeholder: "Select Brand",
    componentType: "select",
    options: [
      { value: "nike", label: "Nike" },
      { value: "zara", label: "Zara" },
      { value: "levi", label: "Levi's" },
      { id: "disney", label: "Disney Store" },
      { value: "h&m", label: "H&M" },
      { id: "samsung", label: "Samsung" },
      { id: "bosch", label: "Bosch" },
      { value: "puma", label: "Puma" },
      { value: "adidas", label: "Adidas" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    min: 0,
    max: 9999999999,
    step: "0.01",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    min: 0,
    max: 9999999999,
    step: "0.01",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    min: 1,
    max: 9999,
    placeholder: "Enter total stock",
  },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "number",
    min: 100000,
    max: 999999,
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "number",
    min: 1000000000,
    max: 9999999999,
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const discountFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "text",
    placeholder: "Enter Discount Name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "text",
    placeholder: "Enter Discount Description",
  },
  {
    label: "Percent",
    name: "percent",
    componentType: "number",
    placeholder: "Enter Discount Percentage",
  },
];

// * Web3Forms
export const ACCESS_TOKEN = "c9a99748-858d-4330-bcb8-30d967267ad2";
