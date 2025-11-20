import express from "express";
import session from "express-session";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import db from "./Kambaz/Database/index.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import PeopleRoutes from "./Kambaz/People/routes.js";
import Lab5 from "./Lab5/index.js";
const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000",
            "https://kanbas-next-js-83ct.vercel.app",],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// SESSION — FIXED
app.use(
  session({
    secret: "secret phrase",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,       // local only
      sameSite: "lax",     // FIXED
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to kambaz Node server");
});


// Routes
Lab5(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app,db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app,db);
PeopleRoutes(app,db);
app.listen(4000, () => console.log("Server running on port 4000"));
