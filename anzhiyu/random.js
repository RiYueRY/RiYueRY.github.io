var posts=["2025/05/24/从入坑到精通的理性分析/","2025/05/24/从0开始学java/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };