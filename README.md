# chatgpt-vue

使用 Vue3 + Typescript + Tailwind CSS 框架，调用 OpenAI 的 `gpt-3.5-turbo` 模型 API 实现的简单聊天对话，支持连续对话。

## 快速开始

本项目基于 `Node.js` 运行时环境，开始前请确保电脑已经正确安装它，没有安装请 [点击这里下载](https://nodejs.org/zh-cn/)。

首先进入项目根目录，执行命令初始化项目：

```bash
cp .env.example .env
npm i
```

打开 `.env` 文件，在 `VITE_API_KEY=` 后填入你的 API key，如果你还没有，已经注册用户的 [请到这里生成](https://platform.openai.com/account/api-keys)：

```ini
VITE_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

填入后 API Key 后，运行项目：

```bash
npm run dev
```

打开 http://127.0.0.1:5173/ 就可以跟 AI 聊天了！