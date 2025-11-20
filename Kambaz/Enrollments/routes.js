export default function EnrollmentsRoutes(app, db) {
  let enrollments = [];

  // GET all enrollments
  app.get("/api/enrollments", (req, res) => {
    res.json(enrollments);
  });

  // CREATE enrollment
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;

    const newEnrollment = {
      _id: Date.now().toString(),
      userId,
      courseId,
    };

    enrollments.push(newEnrollment);
    res.json(newEnrollment);
  });

  // DELETE enrollment
  app.delete("/api/enrollments/:id", (req, res) => {
    const { id } = req.params;
    enrollments = enrollments.filter((e) => e._id !== id);
    res.sendStatus(200);
  });
}
