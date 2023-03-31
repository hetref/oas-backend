const express = require("express");
const { createUser, getUser } = require("./database");
const cors = require("cors");
const app = express();
const fs = require("fs");
const pdf = require("pdf-creator-node");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", async (req, res) => {
  const { userfname, userlname, email, phone } = req.body;
  const users = await createUser(userfname, userlname, email, phone);
  res.status(201).send(users);
});

app.post("/user", async (req, res) => {
  //   const emaildb = req.params.email;
  const email = req.body.email;
  const user = await getUser(email);
  res.status(201).send(user);
});

app.post("/order-acknowledgement", (req, res) => {
  // res.send("Order Acknowledgement");
  const uid = req.body.uid;
  const orderno = req.body.orderno;
  var html = fs.readFileSync("./oa.html", "utf8");
  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "25mm",
      contents:
        '<div style="text-align: right;"><img src="./paneltechnologies.svg" alt="Panel Technologies Logo"></div>',
    },
    footer: {
      height: "28mm",
      contents: {
        // first: "Cover page",
        // 2: "Second page", // Any page number is working. 1-based index
        default: `<div>
          <div>
          <span>Panel Tecnologies India Private Limited</span>
          <span>Add: B-2, Osiamatadi Compound, Pipeline Road, Kalher, Bhiwandi, Dist. Thane - 421302 India</span>
          </div>
          <div>
          <span>CIN</span>
          <span>U31900MH2020PTC344664</span>
          <span>GSTIN - </span>
          <span>27AALCP3636R1ZL</span>
          </div>
          <div>
          <span>Email: </span>
          <span>marketing@paneltechnologies.in /</span>
          <span>Phone: </span>
          <span>+91 9987881335</span>
          </div>
          </div>`, // fallback value
        // last: "Last Page",
      },
    },
  };

  var document = {
    content: html,
    path: "./outp.pdf",
    data: {
      text: "text",
    },
    type: "",
  };

  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  res.download("./outpu.pdf");
  // var document = {
  //   html: html,
  //   path: "./" + uid + orderno + ".pdf",
  //   type: "",
  // };
  // pdf
  //   .create(document, options)
  //   .then((res) => {
  //     console.log(res);
  //     res.send("Get PDF");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
});

app.post("/register", async (req, res) => {
  const { fname, lname, email, phone } = req.body;
  const users = await createUser(fname, lname, email, phone);
  res.status(201).send(users);
});

app.post("/orderproduct", async (req, res) => {
  const {
    userfname,
    userlname,
    email,
    phone,
    alt_name,
    alt_email,
    alt_phone,
    billing_address,
    shipping_address,
    item_one,
    item_two,
    item_three,
    item_four,
    user_id,
  } = req.body;
  const order = await createUser(
    userfname,
    userlname,
    email,
    phone,
    alt_name,
    alt_email,
    alt_phone,
    billing_address,
    shipping_address,
    item_one,
    item_two,
    item_three,
    item_four,
    user_id
  );
  res.status(201).send(order);
});

app.post("/orderproductwfax", async (req, res) => {
  const {
    userfname,
    userlname,
    email,
    phone,
    alt_name,
    alt_email,
    alt_phone,
    billing_address,
    shipping_address,
    item_one,
    item_two,
    item_three,
    item_four,
    fax_number,
    user_id,
  } = req.body;
  const order = await createUser(
    userfname,
    userlname,
    email,
    phone,
    alt_name,
    alt_email,
    alt_phone,
    billing_address,
    shipping_address,
    item_one,
    item_two,
    item_three,
    item_four,
    fax_number,
    user_id
  );
  res.status(201).send(order);
});

app.listen("8080", () => console.log("Listening on port 8080"));
