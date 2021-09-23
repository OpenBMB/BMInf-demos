
## Build Setup

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev  #pc版
```

# src
```bash
# 接口
api 

# 静态资源
assets
  --- 404_images  #404
  --- logo  #logo
  nodata  #缺省图
  theme  #主题图

# 自定义组件
components

# 字体（思源黑体）
fonts  #默认系统font-weight: 400 , 加粗 500， 700

# layout
layout 
    --- components  #组件
        --- Navbar #上下布局
        --- Sidebar #左右布局
    --- mixin #混入
    --- index

# 全局插件
plugins
    --- component.js #全局组件注册
    --- element.js #element注册
    --- index.js 
    --- prototype.js #全局通用挂载

# 路由
router

#vuex
store

# 全局样式
styles
    --- common #通用
    --- element-ui.scss #全局饿了么样式
    --- handle.scss #scss变量
    --- index.scss
    --- themes.scss #主题配置文件

# 工具集
utils
    --- auth.js
    --- common.js #全局通用js方法
    --- filters.js #全局过滤器
    --- get-page-title
    --- request #axios请求封装
    --- validata.js

# 视图
views

#入口文件
main.js

# 路由拦截
permission.js

# title、布局设置
settings.js
 	--- title 修改网站title和名字
 	--- fixedHeader  layout头部是否固定在屏幕
 	--- sidebarLogo 侧边导航是否显示logo
 	--- prefix 本地存储主题、主题色、布局的前缀，防止多系统主题混乱

#开发环境地址配置
.env.development

#生产环境地址配置
.env.production
```
# theme

elementUI主题配置5种主题的源文件，用于配置修改对应的主题前缀名

# gulpfile.js

自动化构建处理ElementUI工具，用于给每个主题增加前缀名

```
npm run gulp
命令执行配置主题，生成对应的文件（记得修改该文件里的theme）
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod   #pc版
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
