const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: "CS101",
  name: "Introduction to Programming",
  description: "Learn the basics of programming",
  course: "Computer Science",
};

export default function WorkingWithObjects(app) {
  // =====================================
  // ASSIGNMENT ROUTES
  // =====================================
  
  // GET FULL ASSIGNMENT
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  // GET ASSIGNMENT TITLE
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };

  // UPDATE ASSIGNMENT TITLE
  // Route: /lab5/assignment/title/:title
  const setAssignmentTitle = (req, res) => {
    const { title } = req.params;
    assignment.title = title;
    res.json(assignment);
  };

  // UPDATE SCORE
  // Route: /lab5/assignment/score/:score
  const setAssignmentScore = (req, res) => {
    const { score } = req.params;
    assignment.score = parseInt(score);
    res.json(assignment);
  };

  // UPDATE COMPLETED (true/false)
  // Route: /lab5/assignment/completed/:completed
  const setAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    // Convert "true" or "false" strings to boolean
    assignment.completed = completed === "true";
    res.json(assignment);
  };

  // =====================================
  // MODULE ROUTES
  // =====================================
  
  // GET FULL MODULE
  const getModule = (req, res) => {
    res.json(module);
  };

  // GET MODULE NAME
  const getModuleName = (req, res) => {
    res.json(module.name);
  };

  // UPDATE MODULE NAME
  // Route: /lab5/module/name/:name
  const setModuleName = (req, res) => {
    const { name } = req.params;
    module.name = name;
    res.json(module);
  };

  // UPDATE MODULE DESCRIPTION
  // Route: /lab5/module/description/:description
  const setModuleDescription = (req, res) => {
    const { description } = req.params;
    module.description = description;
    res.json(module);
  };

  // =====================================
  // REGISTER ALL ROUTES
  // =====================================
  
  // Assignment routes
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:title", setAssignmentTitle);
  app.get("/lab5/assignment/score/:score", setAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);

  // Module routes
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:name", setModuleName);
  app.get("/lab5/module/description/:description", setModuleDescription);
}