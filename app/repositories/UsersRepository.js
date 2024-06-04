const User = require('../models/User');
const bcrypt = require('bcrypt');

function useUsersRepository() {

  async function list() {
    const users = await User.findAll({ raw: true });
    return users;
  }

  async function find(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async function save(dados) {
    if (dados.password !== dados.confirm_password) {
      throw new Error('Os campos senha e confirmar senha são diferentes.');
    }

    const hashed_password = await bcrypt.hash(dados.password, 10);

    const user = {
      name: dados.name,
      email: dados.email,
      password: hashed_password,
    }

    const user_created = await User.create(user);
    return user_created;
  }

  async function update(id, dados) {
    const user = {
      name: dados.name,
      email: dados.email,
      password: dados.password ? await bcrypt.hash(dados.password, 10) : undefined,
      active: dados.active === '1' ? true : false
    }

    const user_updated = await User.update(user, { where: { id: id } });
    return user_updated;
  }

  async function remove(id) {
    await User.destroy({ where: { id: id } });
  }

  return {
    list,
    find,
    save,
    remove,
    update,
  }

}

module.exports = useUsersRepository;
