const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({
      status: false,
      message: "All fields are required"
    });
    return;
  }
  Category.findOne({ name }).then(user => {
    if (name) {
      return res
        .status(423)
        .send({ status: false, message: "Category already exists" });
    }
  });
  const category = new Category({ name: name });
  category.save((err, docs) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(200).json({ docs });
    }
  });
};

exports.getSubjectsByCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).send({
        status: false,
        message: "All fields are required"
      });
      return;
    }
    Category.findOne({ name: category }).then(category => {
      if (!category) return res.status(404).send("Category does not exist");
    });
    const subject = await Category.find(
      { name: category },
      { _id: 0, subjects: 1 }
    ).populate("subjects", "-_id -__v -category -tutors");
    res.status(200).json({
      data: subject
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  const categories = await Category.find({}, { _id: 0, name: 1 });
  res.status(200).json({
    data: categories
  });
};
