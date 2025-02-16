import { Banner, Discount } from "../modals/feature.modal.js";
import Order from "../modals/order.modal.js";

import memoryCache from "../utils/nodeCache.js";

export const addBanner = async (req, res) => {
  try {
    const { image, title } = req.body;

    const banner = new Banner({
      image,
      title,
    });

    // ! Save Banner
    await banner.save();

    // ! Delete Banner Cache
    memoryCache.del("banners");

    res
      .status(200)
      .json({ success: true, message: "Banner Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    // ? Check Cache exits
    if (memoryCache.has("banners")) {
      const bannerCache = memoryCache.get("banners");
      return res.status(200).json({ success: true, banners: bannerCache });
    }

    const banners = await Banner.find({}).sort({ createdAt: -1 });

    // ? Set Banner Cache
    memoryCache.set("banners", banners);

    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // ? Delete Banner
    await Banner.findByIdAndDelete(id);

    // ? Delete Banner Cache
    memoryCache.del("banners");

    res
      .status(200)
      .json({ success: true, message: "Banner Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addDiscount = async (req, res) => {
  try {
    const { name, code, description, percent } = req.body;

    const discountCupon = new Discount({
      name,
      description,
      code,
      percent,
    });

    // ! Save Discount Cupon
    await discountCupon.save();

    // ! Delete Discount Cupon Cache
    memoryCache.keys().forEach((key) => {
      if (key.startsWith("discount-cupons-")) {
        memoryCache.del(key);
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Discount Cupon Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDiscounts = async (req, res) => {
  try {
    const { userId } = req.params;

    // ? Check Cache exits
    if (memoryCache.has(`discount-cupons-${userId}`)) {
      const discountCuponCache = memoryCache.get(`discount-cupons-${userId}`);
      return res
        .status(200)
        .json({ success: true, discountCupons: discountCuponCache });
    }

    // ? Check User Already  Orderes
    const userOrders = await Order.countDocuments({ userId });

    let discountCupons = await Discount.find({});
    if (userOrders > 0) {
      discountCupons = discountCupons.filter(
        (cupon) => cupon.code !== "50FIRST50"
      );
    }

    // ? Set Discount Cupon Cache
    memoryCache.set(`discount-cupons-${userId}`, discountCupons);

    res.status(200).json({ success: true, discountCupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    // ? Delete Discount Cupon
    await Discount.findByIdAndDelete(id);

    // ! Delete Discount Cupon Cache
    memoryCache.keys().forEach((key) => {
      if (key.startsWith("discount-cupons-")) {
        memoryCache.del(key);
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Discount Cupon Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
