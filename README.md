# chatgpt-vue

使用 Vue3 + Typescript + Tailwind CSS 框架，调用 OpenAI 的 `gpt-3.5-turbo` 模型 API 实现的简单聊天对话，支持连续对话。

## 快速开始

在开始之前，请确保您已正确安装 Node.js 运行时环境。如果您还没有安装 Node.js，请 [点击这里下载](https://nodejs.org/zh-cn/)。

使用 ChatGPT 需要先申请 API Key，已注册但还没有 API Key 的用户可以 [前往这里生成](https://platform.openai.com/account/api-keys)。

准备就绪后，进入项目根目录执行以下命令运行项目：

```bash
npm i
npm run dev
```

或者

```bash
yarn
yarn dev
```

运行成功时通常显示（请以具体为准）：

```bash
VITE v3.2.5  ready in 294 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

按住 `Ctrl` 或 `command` 单机 Local 链接，在浏览器中打开项目，然后在页面底部输入框中填入您的 API Key，然后点击保存，即可开始使用！

如果想要更改 API Key，点击页面右上角 `设置`，重新输入并保存即可。

如果你想要打包在本地运行，[查看这里](/docs/electron-packaging-guide.md)。

希望这能对您有所帮助。如果您还有其他问题，请随时在评论区提出，谢谢！
