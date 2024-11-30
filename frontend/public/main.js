const { app, BrowserWindow, Menu, MenuItem, Tray } = require("electron");
const menu = require("./utils/menu");
const fs = require("fs");
app.disableHardwareAcceleration();
const mainMenu = Menu.buildFromTemplate(menu);
const contextMenu = Menu.buildFromTemplate([
  {
    role: "editMenu",
  },
  { label: "Item 2" },
]);
let tray;
const createTray = function () {
  tray = new Tray("./trayTemplate@2x.png");
};
const createWindow = () => {
  let win = new BrowserWindow({
    minHeight: 600,
    minWidth: 600,
    width: 800,
    height: 600,
    // show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("../index.html");
  win.webContents.openDevTools();
  win.webContents.on("did-finish-load", (e) => console.log(win.getTitle()));

  win.on("closed", () => {
    win = null;
  });
};
// app.on("ready", createWindow);
app.on("ready", createWindow);
