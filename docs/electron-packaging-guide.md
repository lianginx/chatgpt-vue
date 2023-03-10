# 项目打包指南

使用 Electron + Electron-builder 进行打包，以下是项目打包指南：

## 快速开始

进入项目根目录开始调试/打包：

```bash
yarn e:dev    # 开发调试
yarn e:build  # 打包
```

或者

```bash
npm run ne:dev    # 开发调试
npm run ne:build  # 打包
```

Electron-builer 会将项目打包成 dmg、exe 等可执行文件，输出到 `/electron-dist`。

如果你打包时遇到一些问题，请到 [常见问题解答 FAQ](FAQ.md) 查看是否已有解决方案，没有找到你的问题请到 Issue 提交。
