var posts=["2025/05/02/Fate系列观看指南-从入门到入土/","2025/05/01/从0开始学java/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };