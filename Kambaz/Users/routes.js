import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  /* --------------------------------------------------------
     CREATE USER (Not used for signup, just raw creation)
  --------------------------------------------------------- */
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };

  /* --------------------------------------------------------
     DELETE USER
  --------------------------------------------------------- */
  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  /* --------------------------------------------------------
     FIND ALL USERS
  --------------------------------------------------------- */
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };

  /* --------------------------------------------------------
     FIND USER BY ID
  --------------------------------------------------------- */
  const findUserById = (req, res) => {
    res.json(dao.findUserById(req.params.userId));
  };

  /* --------------------------------------------------------
     UPDATE USER + UPDATE SESSION
  --------------------------------------------------------- */
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;

    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);

    req.session["currentUser"] = updatedUser; // session sync
    res.json(updatedUser);
  };

  /* --------------------------------------------------------
     SIGNUP – USE loginId, NOT username
  --------------------------------------------------------- */
  const signup = (req, res) => {
    const { loginId } = req.body;

    const existing = dao.findUserByLoginId(loginId);
    if (existing) {
      return res
        .status(400)
        .json({ message: "Login ID already in use" });
    }

    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser; // logged in after signup
    res.json(newUser);
  };

  /* --------------------------------------------------------
     SIGNIN – USE loginId + password
  --------------------------------------------------------- */
  const signin = (req, res) => {
    const { loginId, password } = req.body;

    const currentUser = dao.findUserByCredentials(loginId, password);
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "Invalid login ID or password" });
    }

    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  /* --------------------------------------------------------
     SIGNOUT – destroy session
  --------------------------------------------------------- */
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  /* --------------------------------------------------------
     PROFILE – return current logged-in user
  --------------------------------------------------------- */
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };

  /* --------------------------------------------------------
     ROUTES REGISTRATION
  --------------------------------------------------------- */
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
