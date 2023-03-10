# 常见问题解答 FAQ

以下收集了测试项目过程中遇到的问题，希望对你有所帮助：

## 此系统上禁止运行脚本

使用 Windows 终端工具 PowerShell 时，可能会遇到:

```bash
无法加载文件 C:\Users\DH\Desktop\cs\rename.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。

+ CategoryInfo : SecurityError: (:) []，ParentContainsErrorRecordException
+ FullyQualifiedErrorId : UnauthorizedAccess
```

这是因为 PowerShell 当前的执行策略是 Restricted（默认设置），禁止运行任何脚本文件。

**解决方案：**

使用管理员身份重新打开 PowerShell，执行以下命令修改策略即可：

```bash
set-executionpolicy remotesigned
```

## cp 不是内部或外部命令

在 Windows 中进行打包时可能会遇到命令行报错提示 `cp 不是内部或外部命令` 的问题而中断打包动作，这是因为 Windows 中复制文件的命令是 `copy`，与 Linux 中的 `cp` 不同。

**解决方案：**

使用安装 Git 时附带的 `Git Bash` 替代当前正在使用的终端工具，如果你还没有安装 Git 工具，请 [点击这里下载](https://git-scm.com/downloads) 安装。

---

以上是目前已知可能遇到的问题，如果你还碰到了其他问题，请到 Issue 中提问。
