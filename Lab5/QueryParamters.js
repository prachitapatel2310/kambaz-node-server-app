export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    const A = parseInt(a);
    const B = parseInt(b);
    let result;

    switch (operation) {
      case "add":
        result = A + B;
        break;

      case "subtract":
        result = A - B;
        break;

      case "multiply":
        result = A * B;
        break;

      case "divide":
        result = B !== 0 ? A / B : "Division by zero error";
        break;

      default:
        result = "Invalid operation";
    }

    res.send(result.toString());
  };

  app.get("/lab5/calculator", calculator);
}
