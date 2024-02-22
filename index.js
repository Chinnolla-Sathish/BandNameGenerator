import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import morgan from "morgan";
import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var bandName="";
app.use(bodyParser.urlencoded({extended:true}));

// function logger(req,res,next){
//   console.log("Requested Method:",req.method);
//   console.log("Requested URL:",req.url);
//   next();
// }
// app.use(logger); // after executing the next() control is shift to app.get then after it will go app.use(morgan(""))
// app.use(morgan("combined"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));


function bandNameGenerator(req,res,next)
{

  bandName = req.body["street"]+req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/",(req,res)=>{

  res.sendFile(_dirname+"/bandname_generator.html");
  console.log(_dirname+"/bandname_generator.html");
});

app.post("/submit",(req,res)=>{
  console.log(req.body);
  res.send('<h1>Your Band Name is :<h1><br/><h2><h2>'+bandName);

});


app.listen(port,()=>{

  console.log("server started at :"+port);
});
