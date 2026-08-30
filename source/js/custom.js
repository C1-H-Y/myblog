(function(){
  /* Scroll Progress Bar */
  var bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00f2ff,#bc13fe);z-index:99999;transition:width 0.1s;box-shadow:0 0 8px rgba(0,242,255,0.6);';
  document.body.appendChild(bar);
  window.addEventListener('scroll',function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY/h*100) + '%' : '0%';
  });

  /* Card Fade-in Animation */
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, {threshold:0.1});

  document.querySelectorAll('.recent-post-item, .card-widget, .article-sort-item').forEach(function(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
  });

  /* Reading Time Estimation */
  var article = document.getElementById('article-container');
  if(article){
    var text = article.textContent;
    var wordCount = text.replace(/\s/g,'').length;
    var readTime = Math.max(1, Math.round(wordCount / 400));
    var metaEl = document.querySelector('.post-meta');
    if(metaEl && readTime > 0){
      var span = document.createElement('span');
      span.innerHTML = ' | <i class="fas fa-clock"></i> about ' + readTime + ' min';
      span.style.cssText = 'color:#8c9eff;font-size:0.9em;';
      metaEl.appendChild(span);
    }
  }
})();