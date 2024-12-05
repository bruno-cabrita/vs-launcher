import { contextBridge, ipcRenderer } from "electron"
import { electronAPI } from "@electron-toolkit/preload"

// Custom APIs for renderer
const api = {
  testLocalApi: (testData: string): Promise<{ directory: string; files: string[]; test: string }> => ipcRenderer.invoke("test-local-api", testData),
  getConfig: (): Promise<ConfigType> => ipcRenderer.invoke("get-config"),
  saveConfig: (configJson: ConfigType): Promise<boolean> => ipcRenderer.invoke("save-config", configJson)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type ApiType = typeof api
