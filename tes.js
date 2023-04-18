const { Message, WAParser, WebhookServer } = require("./");
// var token =
//   "EAARsFE9Vte8BAHszeZAXX5ufnHH1RzFarfAqrabNapOgnmf91MokLXZB1kilSXKZBf51GToOBQiCHHoaT6l5YWd7Vsa89ZBMFMsShx7pEkIrnEFD2pM3zO5VVZAZCLQLBaDmDmz9JtVEOmLS5VzAELr3AMfl69bexl9Vsa3TcDf4DgBXueD43G2QQunu7z0o6tjsM16LSYuAZDZD";

const webhookServer = new WebhookServer(3000, true, {
  ngrokAuthToken: "2FkOMwth9zirzLOS4bkVZFNKGmj_62MU8PAnDvXTyHXJxUexk",
});
webhookServer.on("message", (message) => {
  console.log("Received message:", message);
});

webhookServer.Verification("/webhook", "kei");

webhookServer.start();
