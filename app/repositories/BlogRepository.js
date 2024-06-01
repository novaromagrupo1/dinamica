const { date } = require('joi');
const Blog = require('../models/blog')

function useBlogRepository() {
  async function list() {
    const blogs = await Blog.findAll({raw: true});
    return blogs;
  }

  async function save(dados) {
    const post = {
      title: dados.title,
      text: dados.text,
      publish_date: dados.data_publicacao,
    }

    const post_created = await Blog.create(post);
    return post_created;
  }

  async function remove(id) {
    await Blog.destroy({ where: { id: id } });
  }

  return {
    list,
    save,
    remove
  }
}

module.exports = useBlogRepository;