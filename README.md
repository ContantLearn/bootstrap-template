#boostrap-cli 构建的模板文件

###自定义问答内容
修改meta.js的prompts对象的问答内容，格式完全遵循inquirer.js，prompts对象的key值是模板动态生成的判断依据

比如：
```
prompts: {
        echarts: {
                    type: "confirm",
                    default: false,
                    message: "Use Echarts"
        }
}
```
如上设置后，在生成项目的时候会询问Use Echarts，并且你可以在template文件夹下的任意位置使用如下代码进行逻辑判断:
```
{{#if echarts}}
        "echarts": "^4.0.4",
{{/if}}
```
然后cli会根据用户的输入去动态生成模板。
