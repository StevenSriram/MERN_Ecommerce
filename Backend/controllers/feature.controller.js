import { Banner } from "../modals/feature.modal.js";

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

    const banners = await Banner.find({});

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
