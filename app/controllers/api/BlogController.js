const Joi = require('joi');
const useBlogRepository = require("../../../app/repositories/BlogRepository")
const blogRepository = useBlogRepository();

function BlogController() {

 async function list(request, response) {
    const post = await blogRepository.list();
    response.status(200).json(post);
  }

  async function save(request, response) {

    const validation = Joi.object({
      title: Joi.string().min(5).required(),
      text: Joi.string().min(10).required(),
      publish_date: Joi.date().iso().required(),
    });

    try {
      // await validation.validateAsync(request.body);

      const post = await blogRepository.save(request.body);
      response.status(201).json(post);

    } catch (error) {
      response.status(400).json(error.details)
    }
  }

  return{
    save,
    list
  }
}

module.exports = BlogController();