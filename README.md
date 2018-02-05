# REACT-kgmusic
react项目，基于酷狗音乐接口做的音乐播放器，使用proxy进行跨域

# 实现的功能

```
 获取新歌，榜单，歌单等数据
 
 搜索歌曲

 播放完自动切歌，上一首，下一首

 歌词滚动，拖动进度条改变数据
  
 点击收藏喜欢的歌
 
 最近听过的歌曲列表显示二十条以内的数据

```

# 目录结构
* components
    *  common/NotFound.js         报错显示页面
    *  footer/footer-nav.js       底部导航栏
    *  header/header-nav.js       头部导航栏
    *  header/header-goback.js    子页面的公共头部
* pages
    *  category              分类
    *  home                  推荐
    *  search                搜索
    *  list                  公共列表页面
    *  search                
        *  play           播放音乐页面
        *  Audio          存放播放器audio控件
    *  profile               我的
    *  songmenu              歌单
    *  list                  公共列表页面

* router          路由配置
* static/img      图片
* units
    *  Ajax       封装ajax方法
    *  Format     封装格式化等方法
* global          定义公共变量 
* server          服务器配置 


# 效果图

![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/1-1.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/1-2.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/1-3.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/2-1.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/2-2.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/3-1.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/3-2.jpg)
![](https://github.com/Ercyao/REACT-kgmusic/blob/master/img/4-1.jpg)

# 提示
npm install     安装依赖（若有些依赖还是没安装，请根据package.json文件单独安装依赖）
npm  start      运行
npm  run build  打包

# 总结
一开始写的时候，被跨域问题坑了很久，最后还是用node的express搭建简单的服务器实现地址代理来进行跨域，在解决跨域问题后，又遇到切换页面后，音乐会停止播放，后来我把装有audio控件的js单独放外面，使每个页面都有，不随路由切换，虽然这样解决了切换路由音乐听的坑，但又遇到监听的坑，后来用了定时器解决，虽然功能基本实现了，但还是有些地方需要优化下
