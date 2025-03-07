const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" }); 

app.get("/", (req, res) => {
    res.send("Working..............");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT}`);
});
