const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      "externals": ['xlsx'],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        "appId": "com.electron.demo",
        "productName": "人事管理系统",
        "directories": {
          "output": "dist_electron4"
        },
        // "files": [
          // "dist/**/*",
          // "node_modules/**/*",
          // "background.js",
          // "package.json"
        // ],
        "win": {
          "target": [
           {
            "target":"nsis",
            "arch":"x64"
           }
          ],
          "icon": "public/icon.ico"
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true,
          "createDesktopShortcut": true,
          "createStartMenuShortcut": true,
          "shortcutName": "人事管理系统"
        },
        "extraResources": [
          {
            "from": "src/services/database.js",
            "to": "services/database.js"
          }
        ]
      },
      nodeIntegration: true,
      contextIsolation: false
    }
  }
})
