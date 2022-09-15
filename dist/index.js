"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/config.ts
var config = {
  API_PORT: 3e3
};

// src/resources/twitch/twitch.controller.ts
var import_express = require("express");

// src/resources/twitch/twitch.config.ts
var import_axios = __toESM(require("axios"));

// src/data.ts
var apiData = {
  client_id: "3qlhvtm78xgpq4nw63dqlgp07zb0zg",
  client_secret: "qxv5e47fsxm8yhemihpktgk8fe58ji",
  authorization: "Bearer gs6d188f7eus71a6kxlt5obfvgydum",
  redirect_uri: "http://localhost:3000/",
  response_type: "token",
  scope: "user:read:follows",
  gta_game_name: "Grand Theft Auto V",
  gta_game_id: "32982",
  rdr_game_name: "Red Dead Redemption 2",
  rdr_game_id: "493959",
  language: "fr",
  limit: "100",
  use_follows: false,
  user_id: "147359949",
  regExp21JC: /(21 *[jJ][uU][mM][pP] *[cC][lL][iI][cC][kK])|(21 *[jJ] *[cC])/,
  regExpLP: /([lL][oO][sS] *[pP][lL][aA][nN][tT][oO][sS])/,
  regExpSpirit: /([sS][pP][iI][rR][iI][tT] *[rR][pP])/
};

// src/resources/twitch/twitch.config.ts
var data = apiData;
var api = import_axios.default.create({
  headers: {
    "Client-ID": data.client_id,
    "Authorization": data.authorization
  }
});
var twitch_config_default = api;
var getAppAcessToken = async () => {
  try {
    const response = await import_axios.default.post("https://id.twitch.tv/oauth2/token", {
      grant_type: "client_credentials",
      client_id: data.client_id,
      client_secret: data.client_secret
    });
    console.log(response.status);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// src/resources/twitch/twitch.service.ts
var data2 = apiData;
var TwitchService = class {
  getAccessToken() {
    return getAppAcessToken();
  }
  async getGameId(game_name) {
    const res = await twitch_config_default.get(`https://api.twitch.tv/helix/games?name=${game_name}`);
    return res.data.data;
  }
  async getStreamsByGameId(game_id) {
    const res = await twitch_config_default.get(`https://api.twitch.tv/helix/streams?game_id=${game_id}`);
    const streams = res.data.data;
    return streams;
  }
  async getGtaStreams() {
    const res = await twitch_config_default.get(`https://api.twitch.tv/helix/streams?game_id=${data2.gta_game_id}&first=100`);
    const streams = res.data.data;
    return streams;
  }
  async getRdrStreams() {
    const res = await twitch_config_default.get(`https://api.twitch.tv/helix/streams?game_id=${data2.rdr_game_id}`);
    const streams = res.data.data;
    return streams;
  }
  async get21jcStreams() {
    const gtaStreams = await this.getGtaStreams();
    let streams = [];
    if (gtaStreams) {
      for (let i = 0; i < gtaStreams.length; i++) {
        if (data2.regExp21JC.test(gtaStreams[i].title)) {
          streams.push(gtaStreams[i]);
        }
      }
    }
    return streams;
  }
};

// src/resources/twitch/twitch.controller.ts
var TwitchController = (0, import_express.Router)();
var service = new TwitchService();
TwitchController.get("/access-token", async (req, res) => {
  const result = await service.getAccessToken();
  console.log(result);
  return res.status(200).json({ status: result.status, data: result.data });
});
TwitchController.get("/getGameId/:gameName", async (req, res) => {
  const result = await service.getGameId(req.params.gameName);
  return res.status(200).json({ data: result });
});
TwitchController.get("/gta-streams", async (req, res) => {
  const result = await service.getGtaStreams();
  return res.status(200).json({ data: result });
});
TwitchController.get("/rdr-streams", async (req, res) => {
  const result = await service.getRdrStreams();
  return res.status(200).json({ data: result });
});
TwitchController.get("/streams/:gameId", async (req, res) => {
  const result = await service.getStreamsByGameId(req.params.gameId);
  console.log(result);
  return res.status(200).json({ data: result });
});
TwitchController.get("/21jc-streams", async (req, res) => {
  const result = await service.get21jcStreams();
  return res.status(200).json({ data: result });
});

// src/middlewares/exceptions.handler.ts
var ExceptionsHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status && err.error) {
    return res.status(err.status).json({ error: err.error });
  }
  return res.status(500).json({ error: "Erreur interne" });
};

// src/utils/exceptions.ts
var Exception = class {
  constructor(error, status) {
    this.error = error;
    this.status = status;
  }
};
var NotFoundException = class extends Exception {
  constructor(error) {
    super(error, 404);
  }
};

// src/middlewares/unknownRoutes.handler.ts
var UnknownRoutesHandler = () => {
  throw new NotFoundException(`La resource demand\xE9e n'existe pas`);
};

// src/index.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use("/twitch", TwitchController);
app.get("/", (req, res) => res.send("\u{1F3E0}"));
app.all("*", UnknownRoutesHandler);
app.use(ExceptionsHandler);
app.listen(config.API_PORT, () => console.log("Silence, \xE7a tourne."));
