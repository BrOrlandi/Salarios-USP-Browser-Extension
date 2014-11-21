
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "http://www.icmc.usp.br/Portal/Pessoas/*",
  contentStyleFile: data.url("styles.css"),
  contentScriptFile: [data.url("jquery-2.1.1.min.js"), data.url("contentscript.js")]
});