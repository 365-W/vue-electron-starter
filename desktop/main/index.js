const {app, BrowserWindow, Menu, MenuItem, globalShortcut} = require('electron')
const path = require('path')
const isMac = process.platform === 'darwin'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        show: false,
        webPreferences:{
            preload:path.join(__dirname, 'preload.js')
        }
    })
    // mainWindow.maximize()
    mainWindow.loadFile('static/index.html').then(() => {
        mainWindow.show()
    })
    mainWindow.on('close', () => {
        //回收BrowserWindow对象
        mainWindow = null
    })
    // 右键菜单
    const rightMenu = new Menu()
    rightMenu.append(new MenuItem({label: '后退', click() {mainWindow.webContents.goBack()}}))
    rightMenu.append(new MenuItem({label: '前进', click() {mainWindow.webContents.goForward()}}))
    rightMenu.append(new MenuItem({type: 'separator'}))
    rightMenu.append(new MenuItem({role: 'reload', label: '刷新'}))
    rightMenu.append(new MenuItem({role: 'forceReload', label: '强制刷新'}))
    rightMenu.append(new MenuItem({type: 'separator'}))
    rightMenu.append(new MenuItem({role: 'togglefullscreen', label: '切换全屏'}))
    rightMenu.append(new MenuItem({role: 'toggleDevTools', label: '开发者工具'}))
    mainWindow.webContents.on('context-menu', (e) => {
        e.preventDefault()
        rightMenu.popup({window: mainWindow})
    });
    // 自定义快捷键
    globalShortcut.register('F7', () => {
        mainWindow.webContents.toggleDevTools()
    })
    globalShortcut.register('F6', () => {
        mainWindow.webContents.reload()
    })
    // 自动打开 开发者工具
    mainWindow.webContents.toggleDevTools()
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// 设置应用顶部菜单
const topMenu = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'about', label: '关于'},
            {type: 'separator'},
            {role: 'services', label: '服务'},
            {type: 'separator'},
            {role: 'hide', label: '隐藏'},
            {role: 'hideothers', label: '隐藏其他'},
            {role: 'unhide', label: '显示'},
            {type: 'separator'},
            {role: 'quit', label: '退出'}
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: '文件',
        submenu: [
            isMac ? {role: 'close', label: '退出'} : {role: 'quit', label: '退出'}
        ]
    },
    // { role: 'editMenu' }
    {
        label: '编辑',
        submenu: [
            {role: 'undo', label: '撤销'},
            {role: 'redo', label: '还原'},
            {type: 'separator'},
            {role: 'cut', label: '剪切'},
            {role: 'copy', label: '复制'},
            {role: 'paste', label: '粘贴'},
            ...(isMac ? [
                {role: 'pasteAndMatchStyle', label: '粘贴并匹配样式'},
                {role: 'delete', label: '删除'},
                {role: 'selectAll', label: '全选'},
                {type: 'separator'},
                {
                    label: '语音',
                    submenu: [
                        {role: 'startSpeaking', label: '开始语音'},
                        {role: 'stopSpeaking', label: '停止语音'}
                    ]
                }
            ] : [
                {role: 'delete', label: '删除'},
                {type: 'separator'},
                {role: 'selectAll', label: '全选'}
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: '视图',
        submenu: [
            {role: 'reload', label: '重新加载'},
            {role: 'forceReload', label: '强制重新加载'},
            {role: 'toggleDevTools', label: '开发者工具'},
            {type: 'separator'},
            {role: 'resetZoom', label: '重置缩放'},
            {role: 'zoomIn', label: '放大'},
            {role: 'zoomOut', label: '缩小'},
            {type: 'separator'},
            {role: 'togglefullscreen', label: '切换全屏'}
        ]
    },
    // { role: 'windowMenu' }
    {
        label: '窗口',
        submenu: [
            {role: 'minimize', label: '最小化'},
            {role: 'zoom', label: '缩放'},
            ...(isMac ? [
                {type: 'separator'},
                {role: 'front', label: '置顶'},
                {type: 'separator'},
                {role: 'window', label: '窗口化'}
            ] : [
                {role: 'close', label: '关闭'}
            ])
        ]
    },
    {
        role: 'help',
        label: '帮助',
        submenu: [
            {
                label: '更多信息',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://www.baidu.com')
                }
            }
        ]
    }
]
Menu.setApplicationMenu(Menu.buildFromTemplate(topMenu))
