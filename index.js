const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')
var ffprobe = require('ffprobe-static');

ffmpeg.setFfprobePath(ffprobe.path);
const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
  webPreferences: {
        nodeIntegration: true
      }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path)=>{
  ffmpeg.ffprobe(path,(err, metadata)=>{
    console.log('Video duration is:', metadata.format.duration);
  });
});
