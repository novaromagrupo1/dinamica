const useUsersRepository = require("../../app/repositories/UsersRepository");
const usersRepository = useUsersRepository();

test("Listando usuários", async () => {
  const users = await usersRepository.list();

  expect(users).not.toBeNull();
  expect(users.length).toBeGreaterThan(0);
});

test("Salvar usuário com sucesso", async () => {
  const user = await usersRepository.save({
    name: "Maria José",
    email: "mariaj@example.com",
    password: "password123",
    confirm_password: "password123",
  });

  expect(user.id).not.toBeNull();
  expect(user.name).toBe("Maria José");
  expect(user.email).toBe("mariaj@example.com");
});

test("Encontrando usuário pelo ID", async () => {
  const user_data = {
    name: "Francisco da Silva",
    email: "fsilva@example.com",
    password: "password123",
    confirm_password: "password123",
  };

  // Cria um usuário no banco
  const new_user = await usersRepository.save(user_data);

  const user = await usersRepository.find(new_user.id);

  expect(user.id).not.toBeNull();
  expect(user.name).toBe(user_data.name);
  expect(user.email).toBe(user_data.email);
});

test("Atualizando um usuário já existente", async () => {
  const user_data = {
    name: "Francisco da Silva",
    email: "fsilva@example.com",
    password: "password123",
    confirm_password: "password123",
  };

  // Cria um usuário no banco
  const new_user = await usersRepository.save(user_data);

  // Atualiza o usuário
  const updated_data = {
    name: "Francisco da Silva Updated",
    email: "fsilva_updated@example.com",
    active: true,
  };

  await usersRepository.update(new_user.id, updated_data);

  // Busca o usuário novamente e assegura que a alteração foi gravada no banco
  const updated_user = await usersRepository.find(new_user.id);

  expect(updated_user.name).toBe(updated_data.name);
  expect(updated_user.email).toBe(updated_data.email);
});

test("Removendo usuário do banco de dados", async () => {
  // Cria um usuário no banco
  const new_user = await usersRepository.save({
    name: "Marcos da Silva",
    email: "marcoss@example.com",
    password: "password123",
    confirm_password: "password123",
  });

  // Remove o usuário do banco
  await usersRepository.remove(new_user.id);

  // Assegura que o usuário foi removido
  const user = await usersRepository.find(new_user.id);

  expect(user).toBeNull();
});
