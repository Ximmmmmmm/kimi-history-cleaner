# Kimi Cleaner — Kimi 会话批量清除助手 🧹

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Manifest](https://img.shields.io/badge/Manifest-V3-blue)
![GitHub last commit](https://img.shields.io/github/last-commit/Ximmmmmmm/kimi-history-cleaner)
![GitHub Repo stars](https://img.shields.io/github/stars/Ximmmmmmm/kimi-history-cleaner?style=social)
![GitHub forks](https://img.shields.io/github/forks/Ximmmmmmm/kimi-history-cleaner?style=social)

**中文关键词 / Keywords**: Kimi 批量删除、Kimi 会话清理、Kimi 清空记录、Kimi history cleaner、Kimi delete all chats、月之暗面 Moonshot、Kimi 浏览器插件、Chrome extension

一个基于 **Manifest V3** 的浏览器扩展，用于**一键批量删除** [Kimi 智能助手](https://www.kimi.com)（`kimi.moonshot.cn` / `www.kimi.com`）的全部历史会话。告别手动逐条删除 —— 终于可以清空 Kimi 了。

> **English**: A Manifest V3 browser extension that batch-deletes all your Kimi AI chat history with one click. Supports both `kimi.com` and `kimi.moonshot.cn`.

## ✨ 功能特点

- **一键清理**：自动勾选当前页面的全部历史会话，告别手动逐条删除。
- **智能跳转**：不在历史记录页面时，自动跳转到 `chat/history` 并开始清理。
- **自动确认**：模拟用户点击，自动处理删除确认弹窗。
- **防重复注入**：Content Script 带防重复注入保护，多次点击不会重复执行。

## 🔧 工作原理

1. 点击扩展图标 → 在弹出面板点击「批量删除所有会话」。
2. 若不在历史页，先写入 `autoDelete` 标记并跳转到 `chat/history`。
3. 页面加载后，Content Script 勾选所有会话复选框 → 点击「删除」→ 点击确认按钮完成批量删除。

## 📦 安装说明

本项目主要供个人 / 开发者使用，通过「加载已解压的扩展程序」方式安装：

1. **下载代码**：将本项目下载或 Clone 到本地文件夹。
2. **打开扩展管理页面**：
   - Chrome：地址栏输入 `chrome://extensions/`
   - Edge：地址栏输入 `edge://extensions/`
3. **开启开发者模式**：打开页面右上方的「开发人员模式」(Developer mode) 开关。
4. **加载插件**：
   - 点击左上角的「加载已解压的扩展程序」(Load unpacked)。
   - 选择包含 `manifest.json` 的本项目文件夹。

## 🚀 使用方法

1. 安装后，在浏览器工具栏找到 **Kimi Cleaner** 图标（若未显示，请在扩展拼图中点击固定）。
2. 点击图标，弹出操作窗口。
3. 点击红色的 **「批量删除所有会话」** 按钮：
   - **情况 A**：已在 Kimi「历史会话」页面 → 直接开始删除。
   - **情况 B**：在对话页或其他页面 → 自动跳转到历史页，加载完成后自动删除。

## 🗂️ 项目结构

```
├── manifest.json   # 扩展清单（Manifest V3）
├── content.js      # 注入 Kimi 页面的内容脚本，负责批量删除
├── popup.html      # 扩展弹出面板
├── popup.js        # 弹出面板逻辑（跳转 / 触发删除）
└── kimi.png        # 扩展图标
```

## ⚠️ 注意事项

- **删除不可恢复**：批量删除会永久移除会话记录，请确认后再操作。
- 仅用于清理**你自己账号**下的会话，请勿用于他人账号。
- 扩展依赖 Kimi 页面的 DOM 结构，若官方改版导致按钮选择器失效，需更新 `content.js` 中的选择器。

## 📜 许可证

本项目以 [MIT License](LICENSE) 发布。