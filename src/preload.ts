// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
  getStoreValue: (key: any) => ipcRenderer.invoke("getStoreValue", key),
  setStoreValue: (key: any, value: any) => ipcRenderer.invoke("setStoreValue", key, value),
  hasStoreValue: (key: any) => ipcRenderer.invoke("hasStoreValue", key)
})
