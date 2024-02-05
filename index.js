//The code imports required Node.js modules and external dependencies such as Express, path, cookie-parser, MongoDB 
//connection utility, authentication middlewares, and the URL model.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
//const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const router = require("./routes/url");

//An Express application is created, and the server will run on port 8001.
const app = express();
const PORT = 8001;

//The application connects to MongoDB using the connectToMongoDB function. The connection URL is obtained from the 
//environment variable MONGODB, defaulting to "mongodb://localhost:27017/short-url".
connectToMongoDB(process.env.MONGODB ?? "mongodb+srv://geetikab03:Riya@123@cluster0.qj36c6r.mongodb.net/?retryWrites=true&w=majority").then(() =>
  console.log("Mongodb connected")
);

//The view engine is set to "ejs" (Embedded JavaScript), and the views directory is set to "./views".
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware is set up to parse JSON, handle form submissions, and parse cookies.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => { //It uses the restrictTo middleware to restrict access to users with the "ADMIN" role.If a user without the "ADMIN" role tries to access this route, they will be blocked.
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  })
})

//Routes are handled using specific middleware. For "/url", the restrictToLoggedinUserOnly middleware is applied 
//before routing to urlRoute. For "/user" and "/", the checkAuth middleware is applied before routing to userRoute 
//and staticRoute, respectively.
//app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); //It uses the restrictTo middleware to ensure that only users with roles "NORMAL" or "ADMIN" can access the routes defined in urlRoute.
app.use("/user", userRoute);
//app.use("/", checkAuth, staticRoute);
app.use("/", staticRoute);


//This route handles requests with a short ID parameter. It updates the visit history in the database and redirects 
//to the original URL.
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

//The server starts listening on port 8001, and a message is logged when the server starts.
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));






//1st method
/*app.get("/test", async(req, res) => {
    const allUrls = await URL.find({});
    return res.end(`
    <html>
        <head></head>
        <body>
            <ol>
                ${allUrls
                    .map(
                        (url) =>
                        `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`
                    )
                      .join("")
                }
            </ol>
        </body>
    </html>
    `)
    //return res.end("<h1>Hey from server</h1>")
});
*/

//2nd method
/*app.get("/test", async(req, res) => {
  const allUrls = await URL.find({});
  return res.render("home",{
    urls: allUrls,
  });
});
*/