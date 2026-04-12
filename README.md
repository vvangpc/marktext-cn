<p align="center"><img src="static/logo-small.png" alt="MarkText" width="100" height="100"></p>

<h1 align="center">MarkText (中文精简版)</h1>

<div align="center">
  <strong>:high_brightness: 下一代 Markdown 编辑器 :crescent_moon:</strong><br>
  一款简单而优雅的开源 Markdown 编辑器，专注于速度与可用性。<br>
  <sub>本项目是基于原版 MarkText 深度定制的 **Windows 64位专属汉化版本**。</sub>
</div>

<br>

<div align="center">
  <!-- License -->
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/marktext/marktext.svg" alt="LICENSE">
  </a>
  <a href="https://github.com/vvangpc/marktext-cn/actions">
    <img src="https://github.com/vvangpc/marktext-cn/workflows/Build/badge.svg" alt="build">
  </a>
</div>

<br />

## 🌟 项目特色 (关于此分支)

本项目 (`vvangpc/marktext-cn`) 脱胎于备受赞誉的开源项目 MarkText。针对国内 Windows 用户的核心诉求，我们做出了以下深度定制改造：

1. **全面中文化**：深度翻译了所有的软件菜单模板（包括文件、编辑、段落、格式、视图、主题等），使用符合国人习惯的专业术语，并完美保留了系统级 Alt 快捷键功能。
2. **极简架构**：
   - 彻底卸载了 macOS (`.dmg`, `.app`) 与 Linux (`.AppImage`, `.deb`) 的打包负担。
   - 专注适配 Windows 环境，限定为 **x64 架构**（全面兼容 Win 10 / Win 11），大幅降低了构建失败率与代码冗余。
3. **现代化云编译**：完全打通并修复了 GitHub Actions 的云端环境链路，所有版本均可由云端全自动生成可用 `.exe` 和 免安装免编译的便携包。

---

## 📷 软件截图

![](docs/marktext.png?raw=true)

---

## ✨ 核心功能 (继承自原版)

- 实时预览 (WYSIWYG) 结合干净简洁的界面，带来无干扰的沉浸式写作体验。
- 支持 [CommonMark 规范](https://spec.commonmark.org/0.29/)、[GitHub Flavored Markdown 规范](https://github.github.com/gfm/) 并选择性支持 Pandoc markdown。
- 丰富的 Markdown 扩展：数学公式 (KaTeX)、Front Matter 和 Emoji 标签。
- 支持段落重构与行内样式快捷键，显著提升输入效率。
- 支持导出为高质量的 **HTML** 和 **PDF** 文件。
- 包含丰富的内置主题：**Cadmium Light**, **Material Dark** 等六款精心调校的编辑器皮肤。
- 三大沉浸编辑模式：**源码模式 (Source Code)**、**打字机模式 (Typewriter)** 和 **专注模式 (Focus)**。
- 剪贴板原图直连映射解析（直接粘贴图像）。

<h4 align="center">:smile_cat:内置编辑模式:dog:</h4>

| 源码模式 (Source Code)          | 打字机模式 (Typewriter)               | 专注模式 (Focus)               |
|:--------------------:|:------------------------:|:-------------------:|
| ![](docs/source.gif) | ![](docs/typewriter.gif) | ![](docs/focus.gif) |

---

## 📥 下载与安装

### 稳定构建版下载
由于本项目配置了全自动构建流水线，获取最新中文发行版非常简单：

1. 点击仓库上方的 **[Actions](https://github.com/vvangpc/marktext-cn/actions)** 标签页。
2. 在左侧的工作流列表中，点击最新的 `Build` 任务记录。
3. 滚动到页面底部的 **Artifacts (构建产物)** 区域。
4. **下载 `MarkText-Windows-Prebuild`**：解压后即可直接双击 `marktext-setup.exe` 进行安装，或提取免安装版本使用。

---

## 🛠️ 本地开发与构建

如果您想继续完善这款中文编辑器的源码并打包：

**1. 环境准备:**
- 操作系统：Windows (推荐 Win 10及以上)
- **Node.js**: `v16.x` (`16.20.2` 推荐)
- **Python**: `v3.11` (切勿使用 3.12 及以上版本，必须带有 `distutils`)
- **Yarn**: `^1.22`
- **C++ 编译链**: Visual Studio 2019 或 2022 (需要安装 *使用C++的桌面开发* 工作负载)

**2. 代码初始化:**
```bash
# 获取源码
git clone https://github.com/vvangpc/marktext-cn.git
cd marktext-cn

# 安装依赖
yarn install --check-files --frozen-lockfile
```

**3. 本地调试与打包:**
```bash
# 启动本地开发热更服务器
yarn run dev

# 编译并打包为 Windows .exe 文件
yarn run release:win
```

---

## 🤝 鸣谢与许可

此分支项目的构建与优化由国人社区提供。所有底层核心技术以及 UI 灵感归功于 [Jocs](https://github.com/Jocs) 及其背后的整个官方 [MarkText Contributors](https://github.com/marktext/marktext/graphs/contributors) 团队。

**授权协议**：[**MIT License**](LICENSE)
