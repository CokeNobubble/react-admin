# React18+vite的后台管理

# 后台对应 nest-admin-react

## git提交规范

    feat 增加新功能
    fix 修复问题/BUG
    style 代码风格相关无影响运行结果的
    perf 优化/性能提升
    refactor 重构
    revert 撤销修改
    test 测试相关
    docs 文档/注释
    chore 依赖更新/脚手架配置修改等
    workflow 工作流改进
    ci 持续集成
    types 类型定义文件更改
    wip 开发中

## 路由

    现在采用动态渲染路由(后端返回对应的路由表)，前端返回处理后生成Tree结构进行动态渲染
    对应多级路由的情况，也就是routes数组中父级路由有children的情况，目前仍需要在对应的组件下去写Outlet路由出口这个组件,
    这个问应该在后续会得到优化，具体应该是在处理树结构的时候在有children属性的路由下去拼接Outlet这个组件

## 功能模块

### 路由管理

#### 路由模块添加

    添加路由的path title icon component permission 父级路由
    添加路由需要更新图标--->链接 https://www.iconfont.cn
    对于图标 可以先搞一些图标去选择
    添加路由成功后，需要在项目文件夹views目录下去创建对应的路由组件

#### 路由模块删除

#### 路由模块修改

### 部门管理

    部门添加 部门删除 部门名称修改 部门查询
