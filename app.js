// memanggil module express
const express = require("express");

//memanggil module morgan
const morgan = require('morgan');

// Memanggil module expressLayouts dengan require
const expressLayouts = require('express-ejs-layouts');


// membuat variable untuk menampung function express
const app = express();
// membuat variable untuk port
const port = 3000;
// memakai fungsi view engine dengan ejs
app.set("view engine", "ejs");

//memanggil path layout yang dibuuat
app.set("layout","layout/ejs-layout.ejs")

// memakai module expressLayouts
app.use(expressLayouts);

// memakai module morgan
app.use(morgan('dev'))

//menjadikan folder 'public' menjadi public
app.use(express.static('views/public'))

app.use((req, res, next) => {
  // menampilkan date dengan fungsi date.now() ke terminal
  console.log('Time:', Date.now())
  // middleware bawahan express, untuk mnegakses perintah selanjutnya
  next()
})

//menerima request dari client
app.get("/", (req, res) => {
    
    // membuat ilai object ke index dengan ejs
  res.render("index", { nama: "desman", title: "Halaman index" });
});



// menerima request about
app.get("/about", (req, res) => {
  //menampilkan ke browser file about dan memberikan values title
  res.render("about",{title: "Halaman About" });
});
//menerima request contact
app.get("/contact", (req, res) => {
  // membuat data tipe json dengan variable cont
  cont = [
    //     {
    // //     name : "Desman",
    // //     email : "desman@gmail.com",
    // // },
    // // {
    // //     name : "d",
    // //     email : "d@gmail.com",
    // // },
    // // {
    // //     name : "spt",
    // //     email : "spt@gmail.com",
    // }
  ];
//   menampilkan file contact dan memasukan variable cont ke contact dengan ejs
  res.render("contact", { cont, title: "Halaman Content"  });
});

//memakai parameter, dan query
app.get("/product/:id", (req, res) => {
  // mengirimkan ke browser
  res.send(`Product id : ${req.params.id} <br><br>Product name : ${req.query.nama}`);
});

// use untuk pemanggilan path apapun
app.use("/", (req, res) => {
  //menyetting status html menjadi 404 (not found)
  res.status(404);
  // menuliskan di web browser 'Page not found'
  res.send("Page not found 404");
});

// membaca port
app.listen(port, () => {
  // memunculkan tulisan diterminal
  console.log(`Example app listening on port ${port}`);
});
