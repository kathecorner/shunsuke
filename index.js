const exp = require("constants");
const express = require("express");
const path = require("path");

// init app
const app = express();

app.use(express.json());
app.use(express.static("./public/checkout.html"));


app.use(express.static("./public"));


function getPort() {
  return process.env.PORT || 8080;
}

/* ################# end UTILS ###################### */

// Start server
app.listen(getPort(), () => console.log(`Server started -> http://localhost:${getPort()}`));
