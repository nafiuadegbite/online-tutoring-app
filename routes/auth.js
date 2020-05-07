const router = require("express").Router();
const { signUp, logIn, getUsers } = require("../controllers/auth");
const {
  createCategory,
  getSubjectsByCategory,
  getCategories
} = require("../controllers/category");
const {
  createSubject,
  getSubjectbyId,
  searchSubject
} = require("../controllers/subject");

router.get("/", (req, res) => {
  res.send("This is an app");
});

router.post("/user/signup", signUp);
router.post("/user/login", logIn);
router.get("/users", getUsers);
router.get("/category", getCategories);
router.post("/category", createCategory);
router.post("/subject", createSubject);
router.get("/subject", getSubjectsByCategory);
router.get("/:category/:subjectId", getSubjectbyId);
router.get("/search", searchSubject);

module.exports = router;
