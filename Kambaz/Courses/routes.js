import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  /* ---------- FIND ALL COURSES ---------- */
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  };

  /* ---------- FIND COURSES FOR CURRENT USER ---------- */
  const findCoursesForCurrentUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const courses = dao.findCoursesForEnrolledUser(currentUser._id);
    res.json(courses);
  };

  /* ---------- CREATE COURSE + AUTO ENROLL ---------- */
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  };

  /* ---------- DELETE COURSE ---------- */
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };

  /* ---------- UPDATE COURSE ---------- */
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.updateCourse(courseId, req.body);
    res.send(status);
  };

  /* ---------- ROUTE REGISTRATIONS ---------- */
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/current/courses", findCoursesForCurrentUser);

  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
