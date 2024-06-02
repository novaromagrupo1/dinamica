const Blog = require('../models/Blog');
const useBlogRepository = require("../repositories/BlogRepository");
const moment = require('moment');

// No seu código onde você renderiza o template


const blogRepository = useBlogRepository();

function BlogController(){
  async function list(req, res) {
    const posts = await blogRepository.list()

      res.render('blog/list', {
      title: "Lista Postagens",
      posts: posts,
      moment: moment
    })
  }

  function create(req, res) {
    res.render('blog/create')
  }

  async function save(req, res) {
    await blogRepository.save(req.body);
    res.redirect('/blog');
  }
  
  async function remove(req, res) {
    await blogRepository.remove(req.params.id);
    res.redirect('/blog')
  }

  return {
    list,
    create,
    save,
    remove
  }
}

module.exports = BlogController();