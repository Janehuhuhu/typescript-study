## 装饰器

[装饰器](https://jelly.jd.com/article/6163d8bac3f2f4019154ee94)
[装饰器视频教程](https://www.bilibili.com/video/BV1UU4y1K7Np?p=17)


注意点：

- 装饰器为实验属性，使用前需配置：
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  },
}
```

- 应用场景，可用于对类属性、方法、访问器、类、函数参数做统一处理
- 多种装饰器不可脱离类使用，即只能用于类的方法、属性等
- 执行顺序： `ts` 规范规定装饰器工厂函数从上至下开始执行，装饰器函数从下至上开始执行

