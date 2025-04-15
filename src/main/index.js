const { app, protocol, BrowserWindow, ipcMain } = require('electron');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const path = require('path');
const { addEmployee, deleteEmployee, getAllEmployees, updateEmployee, searchEmployees } = require('../services/database');

// 处理员工搜索
ipcMain.handle('search-employees', async (event, conditions) => {
  try {
    return await searchEmployees(conditions);
  } catch (error) {
    console.error('搜索员工失败:', error);
    throw error;
  }
});

// 处理员工信息更新
ipcMain.handle('update-employee', async (event, id, employee) => {
  try {
    return await updateEmployee(id, employee);
  } catch (error) {
    console.error('更新员工失败:', error);
    throw error;
  }
}); 