import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: String,
  address: String,
  city: String,
  pincode: Number,
  phone: Number,
  notes: String,
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
