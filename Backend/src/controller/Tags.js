const Tag = require("../models/Tags");

//create Tag ka handler funciton

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      data: tagDetails,
      message: "Tag Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAlltags function

exports.showAlltags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All tags returned successfully",
      data: allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
