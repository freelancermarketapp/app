const Blog = require("../models/Blog");
const Category = require("../models/Category");


exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      status: "succes",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
   const categorySlug = req.query.categories;
   const category = await Category.findOne({slug:categorySlug})

   let filter = {};
   if(categorySlug){
    filter = {category:category._id}
   }

    const blogs = await Blog.find(filter);

    const categories = await Category.find();

    res.status(200).render('blogs',{
      blogs,
      categories,
      page_name:'blogs',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({slug: req.params.slug});
    res.status(200).render('blog',{
      blog,
      page_name:'blogs',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};