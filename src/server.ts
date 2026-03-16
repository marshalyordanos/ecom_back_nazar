import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { initSocket } from "./lib/socket";

dotenv.config();

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
