import express from "express"
const router = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

router.get("/*", (req, res) => {
  res.render("react-view")
})

export default router
