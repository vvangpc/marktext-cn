import * as actions from '../actions/view'

export default function (keybindings) {
  const viewMenu = {
    label: '视图(&V)',
    submenu: [{
      label: '命令面板...',
      accelerator: keybindings.getAccelerator('view.command-palette'),
      click (menuItem, focusedWindow) {
        actions.showCommandPalette(focusedWindow)
      }
    }, {
      type: 'separator'
    }, {
      id: 'sourceCodeModeMenuItem',
      label: '源码模式',
      accelerator: keybindings.getAccelerator('view.source-code-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleSourceCodeMode(focusedWindow)
      }
    }, {
      id: 'typewriterModeMenuItem',
      label: '打字机模式',
      accelerator: keybindings.getAccelerator('view.typewriter-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleTypewriterMode(focusedWindow)
      }
    }, {
      id: 'focusModeMenuItem',
      label: '聚焦模式',
      accelerator: keybindings.getAccelerator('view.focus-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleFocusMode(focusedWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: '显示侧边栏',
      id: 'sideBarMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-sidebar'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleSidebar(focusedWindow)
      }
    }, {
      label: '显示标签栏',
      id: 'tabBarMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-tabbar'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleTabBar(focusedWindow)
      }
    }, {
      label: '切换大纲视图',
      id: 'tocMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-toc'),
      click (_, focusedWindow) {
        actions.showTableOfContents(focusedWindow)
      }
    }, {
      label: '重新加载图片',
      accelerator: keybindings.getAccelerator('view.reload-images'),
      click (item, focusedWindow) {
        actions.reloadImageCache(focusedWindow)
      }
    }]
  }

  if (global.MARKTEXT_DEBUG) {
    viewMenu.submenu.push({
      type: 'separator'
    })
    viewMenu.submenu.push({
      label: '显示开发者工具',
      accelerator: keybindings.getAccelerator('view.toggle-dev-tools'),
      click (item, win) {
        actions.debugToggleDevTools(win)
      }
    })
    viewMenu.submenu.push({
      label: '重新加载窗口',
      accelerator: keybindings.getAccelerator('view.dev-reload'),
      click (item, focusedWindow) {
        actions.debugReloadWindow(focusedWindow)
      }
    })
  }

  return viewMenu
}
