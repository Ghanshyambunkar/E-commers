const app = require("./app");

const dotenv=require("dotenv");

const mongoose=require("mongoose");

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


dotenv.config({ path: "./config/config.env" }); 

const dburl=process.env.MONGO_URL;

main()
.then(()=>{
    console.log("Connected to DB..");
})
// .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  });
});
