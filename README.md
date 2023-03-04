# chatgpt-vue

使用 Vue3 + Typescript + Tailwind CSS 框架，调用 OpenAI 的 `gpt-3.5-turbo` 模型 API 实现的简单聊天对话，支持连续对话。

## 快速开始

本项目基于 `Node.js` 运行时环境，开始前请确保电脑已经正确安装它，没有安装请 [点击这里下载](https://nodejs.org/zh-cn/)。

首先，请进入项目根目录并执行以下命令以初始化项目：

```bash
cp .env.example .env
npm i
```

然后，打开 `.env` 文件，并在 `VITE_API_KEY=` 后填入您的 API key。已经注册但还没有 API Key 的用户可以 [前往这里生成](https://platform.openai.com/account/api-keys)：

```ini
VITE_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

填写完 API Key 后，运行该项目：

```bash
npm run dev
```

希望这能对您有所帮助。如果您还有其他问题，请随时在评论区提出，谢谢！
