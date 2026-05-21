import { contextBridge } from 'electron';

// Aquí puedes exponer de forma segura APIs de Node al proceso de renderizado (React)
contextBridge.exposeInMainWorld('electronAPI', {
  // ejemplo: myAction: () => ipcRenderer.invoke('my-action')
});
