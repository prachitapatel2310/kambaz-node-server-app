import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  let { users } = db;

  // Create a new user with a unique _id
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
  };

  // Find all users
  const findAllUsers = () => users;

  // Find user by ID
  const findUserById = (userId) => users.find((user) => user._id === userId);
  const findUserByLoginId = (loginId) =>
  users.find((user) => user.loginId === loginId);

  const findUserByCredentials = (loginId, password) =>
  users.find((user) => user.loginId === loginId && user.password === password);

  // Update user by ID
  const updateUser = (userId, user) =>
    (users = users.map((u) => (u._id === userId ? { ...u, ...user } : u)));

  // Delete user by ID
  const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByLoginId,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
