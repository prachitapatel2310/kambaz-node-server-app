import {
  findAllUsers,
  findUsersByCourse,
  createUser,
  updateUser,
  deleteUser,
} from "./dao.js";

export default function PeopleRoutes(app) {

  // GET all users
  app.get("/api/people", (req, res) => {
    const data = findAllUsers();
    res.json(data);
  });

  // GET users enrolled in a course (section === courseId)
  app.get("/api/people/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    const data = findUsersByCourse(courseId);
    res.json(data);
  });

  // CREATE user (Faculty only — but FE handles auth)
  app.post("/api/people", (req, res) => {
    const newUser = createUser(req.body);
    res.json(newUser);
  });

  // UPDATE user
  app.put("/api/people/:id", (req, res) => {
    const updated = updateUser(req.params.id, req.body);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  });

  // DELETE user
  app.delete("/api/people/:id", (req, res) => {
    const ok = deleteUser(req.params.id);
    if (!ok) return res.sendStatus(404);
    res.sendStatus(200);
  });
}
