'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'
const { addEmployee, deleteEmployee, getAllEmployees, updateEmployee, searchEmployees } = require('./services/database');

// 设置数据库路径
let dbPath;
if (isDevelopment) {
  dbPath = path.join(app.getPath('userData'), 'hrms.db');
} else {
  // 在生产环境中，数据库文件应该放在用户数据目录
  dbPath = path.join(app.getPath('userData'), 'hrms.db');
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 处理员工添加
ipcMain.handle('add-employee', async (event, employee) => {
  try {
    return await addEmployee(employee);
  } catch (error) {
    console.error('添加员工失败:', error);
    throw error;
  }
});

// 处理员工删除
ipcMain.handle('delete-employee', async (event, id) => {
  try {
    return await deleteEmployee(id);
  } catch (error) {
    console.error('删除员工失败:', error);
    throw error;
  }
});

// 处理获取所有员工
ipcMain.handle('get-all-employees', async () => {
  try {
    return await getAllEmployees();
  } catch (error) {
    console.error('获取员工列表失败:', error);
    throw error;
  }
});

// 处理员工更新
ipcMain.handle('update-employee', async (event, id, employee) => {
  try {
    return await updateEmployee(id, employee);
  } catch (error) {
    console.error('更新员工失败:', error);
    throw error;
  }
});

// 处理员工搜索
ipcMain.handle('search-employees', async (event, conditions) => {
  try {
    return await searchEmployees(conditions);
  } catch (error) {
    console.error('搜索员工失败:', error);
    throw error;
  }
});

// 处理保存Excel文件
ipcMain.handle('save-excel-file', async (event, { buffer, defaultPath }) => {
  try {
    const { filePath } = await dialog.showSaveDialog({
      title: '保存Excel文件',
      defaultPath: defaultPath,
      filters: [
        { name: 'Excel文件', extensions: ['xlsx'] }
      ]
    });

    if (filePath) {
      const fs = require('fs');
      fs.writeFileSync(filePath, Buffer.from(buffer));
      return filePath;
    }
    return null;
  } catch (error) {
    console.error('保存Excel文件失败:', error);
    throw error;
  }
});

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      
      // Required for Electron forge
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    // win.loadURL('http://localhost:8080/#/')
    // win.loadFile(path.join(__dirname, '../dist_electron/index.html'))
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
