# 使用教程

## ce -V
查看版本信息，同时会输出 CONFIG_PATH 路径可以在里面添加自己的命令

这里以 window 电脑为例，下面执行 ce e log 就能够快捷的打印 log 命令。

```
{
  "commands": [
    {   
        "shortName": "log",
        "command": "powershell -Command \"git log --oneline\"",
        "description": "简洁的 git log 命令"
    },
  ]
}
```



## ce list

列出所有配置的命令，可以选择已执行

## ce e [命令]

执行命令, 命令为配置文件中的 shortName

```
ce e log
```
# 开发原因

电脑本身自带了别名工具，入手成本我觉得还有点高，一方面是不同操作系统使用方式不一样，另一方面填写的配置信息不够直观。而我我经常有多个电脑切换的场景，重新去配置这个别名就觉得很麻烦。因此开发这个代替一下，只需要保证我的配置文件便于切换即可