import users from "../Database/users.js";

export const findAllUsers = () => users;

export const findUsersByCourse = (courseId) =>
  users.filter((u) => u.section === courseId);

export const createUser = (user) => {
  const newUser = {
    ...user,
    _id: Date.now().toString(),
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, updatedUser) => {
  const index = users.findIndex((u) => u._id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedUser };
  return users[index];
};

export const deleteUser = (id) => {
  const index = users.findIndex((u) => u._id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};
