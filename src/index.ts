import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

console.log("Hello from main");

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const store = new Store();

if (!store.has("model")) {
  store.set("model", "gemma:2b");
}
console.log("Selected model - ", store.get("model"));

if (!store.has("api_address")) {
  store.set("api_address", "localhost:11434");
}
console.log("Api address - ", store.get("api_address"));

if (!store.has("chat_list")) {
  store.set("chat_list", []);
}
console.log("Chat list - ", store.get("chat_list"));

ipcMain.handle("getStoreValue", (event, key) => {
  const store = new Store();
  return store.get(key);
});

ipcMain.handle("setStoreValue", (event, key, value) => {
  const store = new Store();
  return store.set(key, value);
});

ipcMain.handle("hasStoreValue", (event, key) => {
  const store = new Store();
  return store.has(key);
});
