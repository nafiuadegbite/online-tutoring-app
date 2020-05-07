const Subject = require("../models/subject");
const Category = require("../models/category");

exports.createSubject = (req, res, next) => {
  const { category, subject } = req.body;
  if (!subject || !category) {
    res.status(400).send({
      status: false,
      message: "All fields are required"
    });
    return;
  }

  const newSubject = { subject: subject, category: category };

  return Subject.create(newSubject).then(docSubject => {
    console.log("\n>> Created Subject:\n", docSubject);
    res.status(200).json({ docSubject });

    return Category.findOneAndUpdate(
      { name: category },
      { $push: { subjects: docSubject._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

exports.getSubjectbyId = async (req, res, next) => {
  try {
    const { subjectId, category } = req.params;
    if (!category || !subjectId) {
      res.status(400).send({
        status: false,
        message: "All fields are required"
      });
      return;
    }
    const subject = await Subject.find(
      { category: category, _id: subjectId },
      { subject: 1 }
    );
    if (subject.length) {
      res.status(200).json(subject[0]);
    } else {
      res.status(400).json("Subject not found");
    }
  } catch (error) {
    next(error);
  }
};

exports.searchSubject = async (req, res, next) => {
  try {
    const search = req.query.q;
    if (!search) {
      res.status(400).send({
        status: false,
        message: "All fields are required"
      });
      return;
    }
    const subject = await Subject.find({ subject: search.toLowerCase() });
    if (subject.length) {
      res.status(200).json(subject[0]);
    } else {
      res.status(400).json("Subject not found");
    }
  } catch (error) {
    next(error);
  }
};
