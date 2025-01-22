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
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
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
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
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
    focus: true,
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
    min: 0,
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    min: 0,
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    min: 0,
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
    focus: true,
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
    placeholder: "Enter your pincode",
    minLength: 6,
    maxLength: 6,
    pattern: "[0-9]{6}",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "number",
    placeholder: "Enter your phone number",
    minLength: 10,
    maxLength: 10,
    pattern: "[0-9]{10}",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

// * Web3Forms
export const ACCESS_TOKEN = "c9a99748-858d-4330-bcb8-30d967267ad2";
