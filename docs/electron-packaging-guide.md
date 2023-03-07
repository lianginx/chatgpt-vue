# 项目打包指南

使用 Electron + Electron-builder 进行打包，以下是项目打包指南：

## 快速开始

全局安装 yarn 包管理器，不想安装或已经安装的朋友可以跳过此步骤：

```bash
npm i -G yarn
yarn -v
```

终端输出 yarn 版本，表示安装成功！

```bash
❯ yarn -v
1.22.19
```

不想安装 yarn 包管理器请自行修改根目录 `package.json` 文件 `scripts` 脚本：

```json
{
  "scripts": {
    "e:dev": "npm run build && cp -r electron/. dist && cd dist && npm i && npm run dev",
    "e:build": "npm run build && cp -r electron/. dist && cd dist && npm i && npm run build"
  },
}
```

安装或修改完成后，进入项目根目录开始调试/打包：

```bash
yarn e:dev    # 开发调试
yarn e:build  # 打包
```

或者

```bash
npm run e:dev    # 开发调试
npm run e:build  # 打包
```

Electron-builer 会将项目打包成 dmg、exe 等可执行文件，输出到 `/electron-dist`。
