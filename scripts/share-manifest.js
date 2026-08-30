/**
 * Auto-generate file manifest for /share/ page
 * Scans source/share/files/ and injects JSON array into the placeholder
 */
const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('before_post_render', function(data) {
  if (!data.type || data.type !== 'share') return data;

  const filesDir = path.join(hexo.source_dir, 'share', 'files');
  const manifest = [];

  if (fs.existsSync(filesDir)) {
    const entries = fs.readdirSync(filesDir, { withFileTypes: true });
    entries.forEach(entry => {
      if (entry.isFile()) {
        const filePath = path.join(filesDir, entry.name);
        const stat = fs.statSync(filePath);
        const nameWithoutExt = entry.name.replace(/\.[^.]+$/, '');
        const desc = nameWithoutExt.length > 20 ? nameWithoutExt.substring(0, 20) + '...' : '';
        manifest.push({
          name: entry.name,
          size: stat.size,
          desc: desc,
          date: stat.mtime.toISOString().split('T')[0]
        });
      }
    });
  }

  manifest.sort((a, b) => b.date.localeCompare(a.date));

  const jsonStr = JSON.stringify(manifest);
  data.content = data.content.replace('[%FILE_MANIFEST%]', jsonStr);

  return data;
});