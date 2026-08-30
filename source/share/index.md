---
title: 文件分享
type: share
date: 2026-08-30
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="share-container">
  <div class="share-header">
    <h2><i class="fas fa-cloud-upload-alt"></i> 文件分享</h2>
    <p>这里存放一些学习资料、笔记 PDF、代码等文件的分享链接。</p>
  </div>

  <div class="share-toolbar">
    <input type="text" id="searchBox" class="share-search" placeholder="🔍 搜索文件..." />
    <div class="share-stats" id="statsBar"></div>
  </div>

  <div class="file-list" id="fileList">
    <div class="loading-spinner">
      <i class="fas fa-spinner fa-pulse"></i> 加载中...
    </div>
  </div>

  <div class="share-footer">
    <p><i class="fas fa-info-circle"></i> 点击文件名即可下载。如需上传新文件，请将文件放入 <code>source/share/files/</code> 目录并重新部署。</p>
  </div>
</div>

<script>
(function() {
  var fileList = document.getElementById('fileList');
  var searchBox = document.getElementById('searchBox');
  var statsBar = document.getElementById('statsBar');

  var files = [%FILE_MANIFEST%];

  function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getFileIcon(name) {
    var ext = name.split('.').pop().toLowerCase();
    var icons = {
      pdf: 'fa-file-pdf', doc: 'fa-file-word', docx: 'fa-file-word',
      xls: 'fa-file-excel', xlsx: 'fa-file-excel',
      ppt: 'fa-file-powerpoint', pptx: 'fa-file-powerpoint',
      zip: 'fa-file-zipper', rar: 'fa-file-zipper', '7z': 'fa-file-zipper',
      jpg: 'fa-file-image', jpeg: 'fa-file-image', png: 'fa-file-image',
      gif: 'fa-file-image', svg: 'fa-file-image', webp: 'fa-file-image',
      mp4: 'fa-file-video', avi: 'fa-file-video', mkv: 'fa-file-video',
      mp3: 'fa-file-audio', wav: 'fa-file-audio', flac: 'fa-file-audio',
      py: 'fa-file-code', js: 'fa-file-code', cpp: 'fa-file-code',
      c: 'fa-file-code', h: 'fa-file-code', java: 'fa-file-code',
      html: 'fa-file-code', css: 'fa-file-code',
      tex: 'fa-file-lines', md: 'fa-file-lines', txt: 'fa-file-lines',
      ipynb: 'fa-file-lines',
    };
    return icons[ext] || 'fa-file';
  }

  function getIconColor(name) {
    var ext = name.split('.').pop().toLowerCase();
    var colors = {
      pdf: '#ef4444', doc: '#3b82f6', docx: '#3b82f6',
      xls: '#22c55e', xlsx: '#22c55e',
      ppt: '#f97316', pptx: '#f97316',
      zip: '#a855f7', rar: '#a855f7', '7z': '#a855f7',
      py: '#06b6d4', js: '#eab308', cpp: '#6366f1',
      ipynb: '#f97316',
    };
    return colors[ext] || '#00f2ff';
  }

  function renderFiles(filtered) {
    if (filtered.length === 0) {
      fileList.innerHTML = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>没有找到匹配的文件</p></div>';
      statsBar.innerHTML = '共 0 个文件';
      return;
    }
    statsBar.innerHTML = '共 ' + filtered.length + ' 个文件';
    var html = '';
    filtered.forEach(function(f, idx) {
      var icon = getFileIcon(f.name);
      var color = getIconColor(f.name);
      html += '<div class="file-item" style="animation-delay:' + (idx * 0.05) + 's">';
      html += '<a href="/share/files/' + encodeURIComponent(f.name) + '" download class="file-link">';
      html += '<span class="file-icon" style="color:' + color + '"><i class="fas ' + icon + '"></i></span>';
      html += '<span class="file-info">';
      html += '<span class="file-name">' + f.name + '</span>';
      if (f.desc) html += '<span class="file-desc">' + f.desc + '</span>';
      html += '</span>';
      html += '<span class="file-meta">';
      html += '<span class="file-size">' + formatSize(f.size) + '</span>';
      if (f.date) html += '<span class="file-date">' + f.date + '</span>';
      html += '</span>';
      html += '<span class="file-dl-icon"><i class="fas fa-download"></i></span>';
      html += '</a></div>';
    });
    fileList.innerHTML = html;
  }

  renderFiles(files);

  searchBox.addEventListener('input', function() {
    var q = this.value.toLowerCase().trim();
    if (!q) { renderFiles(files); return; }
    var filtered = files.filter(function(f) { return f.name.toLowerCase().indexOf(q) !== -1 || (f.desc && f.desc.toLowerCase().indexOf(q) !== -1); });
    renderFiles(filtered);
  });
})();
</script>

<style>
.share-container { max-width: 900px; margin: 0 auto; padding: 0 10px; }
.share-header { text-align: center; margin-bottom: 30px; padding: 30px 20px; background: linear-gradient(135deg, rgba(0,242,255,0.08), rgba(188,19,254,0.08)); border-radius: 16px; border: 1px solid rgba(0,242,255,0.15); }
.share-header h2 { font-size: 1.8em; margin-bottom: 10px; color: #00f2ff; text-shadow: 0 0 15px rgba(0,242,255,0.3); }
.share-header p { color: #9ca3af; font-size: 0.95em; }
.share-toolbar { margin-bottom: 20px; display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
.share-search { flex: 1; min-width: 200px; padding: 12px 18px; background: rgba(15,15,25,0.9); border: 1px solid rgba(0,242,255,0.2); border-radius: 10px; color: #e0e0e0; font-size: 0.95em; outline: none; transition: all 0.3s; }
.share-search:focus { border-color: #00f2ff; box-shadow: 0 0 12px rgba(0,242,255,0.15); }
.share-stats { color: #6b7280; font-size: 0.85em; white-space: nowrap; }
.file-list { display: flex; flex-direction: column; gap: 2px; }
.file-item { animation: fileSlideIn 0.4s ease forwards; opacity: 0; }
@keyframes fileSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.file-link { display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: rgba(15,15,25,0.7); border: 1px solid rgba(0,242,255,0.08); border-radius: 10px; text-decoration: none !important; transition: all 0.25s ease; color: #d1d5db !important; text-shadow: none !important; }
.file-link:hover { background: rgba(0,242,255,0.06); border-color: rgba(0,242,255,0.25); transform: translateX(4px); box-shadow: 0 0 20px rgba(0,242,255,0.08); color: #e0e0e0 !important; }
.file-icon { font-size: 1.6em; width: 42px; text-align: center; flex-shrink: 0; }
.file-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.file-name { font-weight: 600; font-size: 0.95em; color: #e0e0e0; word-break: break-all; }
.file-desc { font-size: 0.8em; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.file-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
.file-size { font-size: 0.82em; color: #00f2ff; font-weight: 500; }
.file-date { font-size: 0.72em; color: #6b7280; }
.file-dl-icon { font-size: 1.1em; color: #6b7280; transition: color 0.2s; }
.file-link:hover .file-dl-icon { color: #bc13fe; }
.loading-spinner { text-align: center; padding: 40px; color: #6b7280; font-size: 1.1em; }
.empty-state { text-align: center; padding: 50px 20px; color: #6b7280; }
.empty-state i { font-size: 3em; margin-bottom: 15px; display: block; color: #374151; }
.share-footer { margin-top: 30px; padding: 16px 20px; background: rgba(15,15,25,0.6); border-radius: 10px; border: 1px solid rgba(0,242,255,0.08); text-align: center; color: #6b7280; font-size: 0.85em; }
.share-footer code { background: rgba(0,242,255,0.1) !important; color: #00f2ff !important; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
@media (max-width: 600px) { .file-meta { display: none; } .file-dl-icon { font-size: 0.9em; } .file-link { padding: 12px 14px; gap: 10px; } }
</style>