require("dotenv").config();
var cors = require("cors");

const app = require("./app.js");
const port = process.env.PORT;

// CORS configuration
const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
