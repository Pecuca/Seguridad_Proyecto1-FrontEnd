import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (!app.isPackaged) {
    // Carga localhost en desarrollo (el puerto 8080 configurado en Vite/Lovable)
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, carga el archivo estático compilado.
    // Dependiendo de si es Vite puro o TanStack Start, la ruta del build puede variar.
    // Vite estándar compila a 'dist/index.html'. TanStack Start puede compilar a '.output/public' o similar.
    // Asumimos que la compilación genera un 'dist/client/index.html' o 'dist/index.html'.
    // Si falla en prod, revisa esta ruta con tu estructura de output real.
    mainWindow.loadFile(path.join(__dirname, '..', '..', 'dist', 'index.html')).catch(() => {
        mainWindow.loadFile(path.join(__dirname, '..', '..', 'dist', 'client', 'index.html'));
    });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
