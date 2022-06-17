const express = require("express");
const bodyParser = require("body-parser"); //YOU NEED TO SET BODYPARSER TO RECIEVE AND USE REQ...
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ //this is how u set up bodyParser
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
const day = date.getDate();
  res.render("list", {
    kindofday: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === 'work') {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});


/*
var day = {0: 'Sunday', //am creat alternativa asta la varianta cu switch intrucat switch mi se pare prea slagaroasa
1: 'Monday',
2: 'Tuesday',
3: 'Wednesday',
4: 'Thursday',
5: 'Friday',
6: 'Saturday'}

var day = "";
switch (currentDay) {
  case 0:
    day = 'Sunday';
    break;
  case 1:
    day = 'Monday';
    break;
  case 2:
    day = 'Tuesday';
    break;
  case 3:
    day = 'Wednesday';
    break;
  case 4:
    day = 'Thursday';
    break;
  case 5:
    day = 'Friday';
    break;
  case 6:
    day = 'Saturday';
    break;
    default:
console.log("Error: current day is equal to:" + currentDay);
}
res.render("list", {
  kindofday: day //[currentDay] //teoretic imi face legatura cu ejs-ul si imi spune ce zi din saptamana e
});
});

*/
