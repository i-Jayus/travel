# 我的旅行日记 | Travel Journal

一个基于 GitHub Pages + Leaflet.js 的个人旅行博客，用交互式世界地图记录每一次旅行的足迹与故事。

## ✨ 功能特性

- 🗺️ **交互式世界地图**：基于 Leaflet.js，支持缩放、拖拽
- 📍 **地点标记**：出发地、中转城市、旅行目的地，不同颜色区分
- ✈️ **航线展示**：去程（实线）、返程（虚线）、境内移动，一目了然
- 📝 **旅行日记**：每篇旅行独立页面，支持图文混排
- 📱 **响应式设计**：手机、平板、电脑都能完美浏览
- 🏷️ **标签系统**：按地点、主题分类旅行

## 📁 项目结构

```
旅行记/
├── index.html          # 首页（世界地图 + 旅行列表）
├── uae-2024.html       # 阿联酋之旅（2024年12月）
├── css/
│   └── style.css        # 全局样式
├── js/
│   └── main.js          # 地图逻辑与数据配置
├── images/              # 图片文件夹（旅行照片放这里）
└── README.md            # 说明文档
```

## 🚀 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 仓库名建议：`你的用户名.github.io`（例如 `zhangsan.github.io`）
   - 这样网站地址就是 `https://你的用户名.github.io`
   - 如果用其他名字，地址就是 `https://你的用户名.github.io/仓库名`
4. 选择 `Public`，点击创建

### 第二步：上传文件

在本地项目目录（`G:\旅行记`）打开终端，执行：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "init: 我的旅行博客"

# 重命名分支为 main
git branch -M main

# 关联远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送
git push -u origin main
```

### 第三步：开启 GitHub Pages

1. 进入仓库页面 → 点击 `Settings`
2. 左侧菜单找到 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. `Branch` 选择 `main`，文件夹选择 `/ (root)`
5. 点击 `Save`
6. 等待 1-2 分钟，页面上方会显示你的网站地址

### 第四步：访问网站

打开你的网站地址，就能看到旅行博客了！

## ✏️ 如何添加新的旅行

### 1. 添加地点和航线（地图上显示）

编辑 `js/main.js`，在 `locations` 数组中添加新地点：

```javascript
{
    id: 'tokyo',           // 唯一标识
    name: '东京',           // 中文名
    nameEn: 'Tokyo',       // 英文名
    lat: 35.6762,          // 纬度
    lng: 139.6503,         // 经度
    type: 'destination',   // origin(出发地) / transit(中转) / destination(目的地)
    description: '日本首都，樱花与美食之都',
    date: '2025.04',
    link: 'japan-2025.html'  // 对应的文章页面（可选）
}
```

在 `routes` 数组中添加航线：

```javascript
{
    id: 'route-1',
    from: 'shenzhen',      // 出发地 id
    to: 'tokyo',            // 目的地 id
    type: 'outbound',       // outbound(去程) / return(返程) / domestic(境内)
    description: '深圳 → 东京（去程）'
}
```

### 2. 创建文章页面

1. 复制 `uae-2024.html`，重命名为新的文件名（例如 `japan-2025.html`）
2. 修改页面标题、文章标题、日期、标签
3. 替换正文内容
4. 在 `index.html` 的旅行列表中添加新的卡片

### 3. 添加图片

1. 把照片放到 `images/` 文件夹
2. 在文章中用 `<img src="images/照片名.jpg" alt="描述">` 插入
3. 或者替换文章中的 `<div class="image-placeholder">` 占位符

## 🔧 本地预览

直接用浏览器打开 `index.html` 即可预览。

如果遇到地图加载问题，可以用本地服务器：

```bash
# Python
python -m http.server 8000

# 或 Node.js
npx serve
```

然后访问 `http://localhost:8000`

## 🎨 自定义样式

编辑 `css/style.css` 中的 CSS 变量即可修改主题色：

```css
:root {
    --primary: #1a2744;    /* 主色调（深蓝） */
    --accent: #d4a853;     /* 强调色（金色） */
    --bg: #fafaf7;          /* 背景色 */
}
```

## 📝 注意事项

- 图片建议压缩后再上传，单张不超过 500KB，避免网站加载慢
- GitHub Pages 仓库容量建议不超过 1GB
- 如果国内访问慢，可以考虑用 Cloudflare CDN 加速
- 每次修改后 `git push`，网站会自动更新（约 1 分钟生效）

## 📄  License

个人项目，仅供记录旅行使用。
