import Address from "../modals/address.modal.js";

import memoryCache from "../utils/nodeCache.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    // ! Add New Address
    await newAddress.save();

    // ! Delete Address Cache
    memoryCache.del(`addresses-${userId}`);

    res
      .status(200)
      .json({ success: true, message: "Address Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id required" });
    }

    // ! check Address Cache Found
    if (memoryCache.has(`addresses-${userId}`)) {
      const addressCache = memoryCache.get(`addresses-${userId}`);
      return res.status(200).json({ success: true, addresses: addressCache });
    }

    const addresses = await Address.find({ userId });

    // ! Set Address Cache
    memoryCache.set(`addresses-${userId}`, addresses);

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { address, city, pincode, phone, notes } = req.body;

    const reqData = { address, city, pincode, phone, notes };

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      reqData,
      { new: true }
    );

    // ! Delete Address Cache
    memoryCache.del(`addresses-${userId}`);

    res
      .status(200)
      .json({ success: true, message: "Address Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    // ! Delete Address Cache
    memoryCache.del(`addresses-${userId}`);

    res
      .status(200)
      .json({ success: true, message: "Address Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
