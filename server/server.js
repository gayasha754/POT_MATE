const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const corsOptions = require("./config/cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//apply middleware
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

//socketio

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("here");

  socket.on("join_room", (data) => {
    console.log(`user Connected to roon ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("disd", socket.id);
  });
});

//routes

app.use("/root", require("./routes/root"));
app.use("/upload", require("./routes/upload"));
app.use("/buyers", require("./routes/buyers"));
app.use("/sellers", require("./routes/sellers"));
app.use("/stripe", require("./routes/stripe"));
// app.use("/stock", require("./routes/stripe"));

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
