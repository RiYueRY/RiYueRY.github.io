(function() {
  var config = window.BG_CAROUSEL_CONFIG;
  if (!config || !config.enable || !config.imgs || config.imgs.length === 0) return;
  var imgs = config.imgs;
  var interval = config.interval || 5000;
  var effect = config.effect || 'fade';
  var blur = typeof config.blur === 'number' ? config.blur : 8;
  var darken = typeof config.darken === 'number' ? config.darken : 0.3;
  var overlay = config.overlay_effect || 'none';
  var index = 0;
  var el = document.getElementById('page-header');
  var bgDiv = document.getElementById('site-info-bg-carousel');
  if (!el || !bgDiv) return;

  // 清空原内容，插入两层背景用于动画切换
  bgDiv.innerHTML = '';
  var bgA = document.createElement('div');
  var bgB = document.createElement('div');
  [bgA, bgB].forEach(function(div) {
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.zIndex = 0;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.pointerEvents = 'none';
    div.style.filter = 'blur(' + blur + 'px)';
    bgDiv.appendChild(div);
  });

  // 添加暗化遮罩
  var darkenDiv = document.createElement('div');
  darkenDiv.style.position = 'absolute';
  darkenDiv.style.top = 0;
  darkenDiv.style.left = 0;
  darkenDiv.style.width = '100%';
  darkenDiv.style.height = '100%';
  darkenDiv.style.zIndex = 1;
  darkenDiv.style.background = 'rgba(0,0,0,' + darken + ')';
  darkenDiv.style.pointerEvents = 'none';
  bgDiv.appendChild(darkenDiv);

  // 添加覆盖特效 canvas
  if (overlay && overlay !== 'none') {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = 2;
    canvas.style.pointerEvents = 'none';
    canvas.width = bgDiv.offsetWidth || window.innerWidth;
    canvas.height = bgDiv.offsetHeight || window.innerHeight;
    bgDiv.appendChild(canvas);
    function resizeCanvas() {
      canvas.width = bgDiv.offsetWidth || window.innerWidth;
      canvas.height = bgDiv.offsetHeight || window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    // 雪花特效
    if (overlay === 'snow') {
      var snowflakes = [];
      for (var i = 0; i < 60; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 1.5 + Math.random() * 2.5,
          d: 1 + Math.random() * 1.5,
          vx: Math.random() * 0.6 - 0.3
        });
      }
      function drawSnow() {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#fff';
        snowflakes.forEach(function(f) {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.restore();
        snowflakes.forEach(function(f) {
          f.y += f.d;
          f.x += f.vx;
          if (f.y > canvas.height) {
            f.y = -5;
            f.x = Math.random() * canvas.width;
          }
          if (f.x < 0) f.x = canvas.width;
          if (f.x > canvas.width) f.x = 0;
        });
        requestAnimationFrame(drawSnow);
      }
      drawSnow();
    }
    // 下雨特效
    if (overlay === 'rain') {
      var drops = [];
      for (var i = 0; i < 50; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          l: 10 + Math.random() * 10,
          vy: 4 + Math.random() * 4
        });
      }
      function drawRain() {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#aee7ff';
        ctx.lineWidth = 1.2;
        drops.forEach(function(d) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x, d.y + d.l);
          ctx.stroke();
        });
        ctx.restore();
        drops.forEach(function(d) {
          d.y += d.vy;
          if (d.y > canvas.height) {
            d.y = -10;
            d.x = Math.random() * canvas.width;
          }
        });
        requestAnimationFrame(drawRain);
      }
      drawRain();
    }
    // 星空特效
    if (overlay === 'star') {
      var stars = [];
      for (var i = 0; i < 80; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.7 + Math.random() * 1.3,
          alpha: 0.5 + Math.random() * 0.5,
          dx: Math.random() * 0.2 - 0.1,
          dy: Math.random() * 0.2 - 0.1
        });
      }
      function drawStar() {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(function(s) {
          ctx.save();
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
          ctx.fillStyle = '#fff';
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        });
        stars.forEach(function(s) {
          s.x += s.dx;
          s.y += s.dy;
          if (s.x < 0 || s.x > canvas.width) s.dx = -s.dx;
          if (s.y < 0 || s.y > canvas.height) s.dy = -s.dy;
        });
        requestAnimationFrame(drawStar);
      }
      drawStar();
    }
  }

  // 初始化样式
  function resetTransition() {
    bgA.style.transition = '';
    bgB.style.transition = '';
  }
  function setTransition(tran) {
    bgA.style.transition = tran;
    bgB.style.transition = tran;
  }

  // 初始状态
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;
  bgA.style.transform = 'none';
  bgB.style.transform = 'none';
  bgA.style.backgroundImage = 'url(' + imgs[0] + ')';

  var showingA = true;

  setInterval(function() {
    var nextIdx = (index + 1) % imgs.length;
    if (effect === 'fade') {
      setTransition('opacity 1s');
      if (showingA) {
        bgB.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgB.style.opacity = 1;
        bgA.style.opacity = 0;
      } else {
        bgA.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgA.style.opacity = 1;
        bgB.style.opacity = 0;
      }
      bgA.style.transform = 'none';
      bgB.style.transform = 'none';
      showingA = !showingA;
    } else if (effect === 'slide') {
      setTransition('transform 1s, opacity 1s');
      if (showingA) {
        bgB.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgB.style.transform = 'translateX(100%)';
        bgB.style.opacity = 1;
        void bgB.offsetWidth;
        bgA.style.transform = 'translateX(0)';
        bgB.style.transform = 'translateX(0)';
        bgA.style.opacity = 1;
        setTimeout(function() {
          bgA.style.transform = 'translateX(-100%)';
          bgA.style.opacity = 0;
        }, 10);
      } else {
        bgA.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgA.style.transform = 'translateX(100%)';
        bgA.style.opacity = 1;
        void bgA.offsetWidth;
        bgB.style.transform = 'translateX(0)';
        bgA.style.transform = 'translateX(0)';
        bgB.style.opacity = 1;
        setTimeout(function() {
          bgB.style.transform = 'translateX(-100%)';
          bgB.style.opacity = 0;
        }, 10);
      }
      showingA = !showingA;
    } else if (effect === 'zoom') {
      setTransition('transform 1s, opacity 1s');
      if (showingA) {
        bgB.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgB.style.transform = 'scale(1.2)';
        bgB.style.opacity = 0;
        void bgB.offsetWidth;
        bgB.style.opacity = 1;
        bgB.style.transform = 'scale(1)';
        bgA.style.opacity = 0;
        bgA.style.transform = 'scale(0.8)';
      } else {
        bgA.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgA.style.transform = 'scale(1.2)';
        bgA.style.opacity = 0;
        void bgA.offsetWidth;
        bgA.style.opacity = 1;
        bgA.style.transform = 'scale(1)';
        bgB.style.opacity = 0;
        bgB.style.transform = 'scale(0.8)';
      }
      showingA = !showingA;
    } else {
      // none
      resetTransition();
      if (showingA) {
        bgA.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgA.style.opacity = 1;
        bgB.style.opacity = 0;
        bgA.style.transform = 'none';
        bgB.style.transform = 'none';
      } else {
        bgB.style.backgroundImage = 'url(' + imgs[nextIdx] + ')';
        bgB.style.opacity = 1;
        bgA.style.opacity = 0;
        bgA.style.transform = 'none';
        bgB.style.transform = 'none';
      }
      showingA = !showingA;
    }
    index = nextIdx;
  }, interval);
})(); 