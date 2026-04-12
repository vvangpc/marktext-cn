// NOTE: This are mutable fields that may change at runtime.

export const CUT = {
  label: '剪切',
  id: 'cutMenuItem',
  role: 'cut'
}

export const COPY = {
  label: '复制',
  id: 'copyMenuItem',
  role: 'copy'
}

export const PASTE = {
  label: '粘贴',
  id: 'pasteMenuItem',
  role: 'paste'
}

export const COPY_AS_MARKDOWN = {
  label: '复制为Markdown',
  id: 'copyAsMarkdownMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-copy-as-markdown')
  }
}

export const COPY_AS_HTML = {
  label: '复制为HTML',
  id: 'copyAsHtmlMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-copy-as-html')
  }
}

export const PASTE_AS_PLAIN_TEXT = {
  label: '粘贴为纯文本',
  id: 'pasteAsPlainTextMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-paste-as-plain-text')
  }
}

export const INSERT_BEFORE = {
  label: '在前面插入段落',
  id: 'insertParagraphBeforeMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-insert-paragraph', 'before')
  }
}

export const INSERT_AFTER = {
  label: '在后面插入段落',
  id: 'insertParagraphAfterMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-insert-paragraph', 'after')
  }
}

export const SEPARATOR = {
  type: 'separator'
}
