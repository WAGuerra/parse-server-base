/**
 * A initialization code to be run on server startup.
 */
import http from "http";
import {createSchemas} from "./parseServer/schema";


const ParseServer = require("parse-server").ParseServer;

const bootstrap = (httpServer: http.Server) => {
  createSchemas();

  //TODO Register Parse classes here

// This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);

};

export default bootstrap;