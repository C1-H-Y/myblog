#!/bin/bash
set -e

echo "========================================="
echo "  Allen's Blog - 一键部署脚本"
echo "========================================="

# 1. 本地构建
echo ""
echo "[1/4] 清理旧文件..."
npx hexo clean

echo ""
echo "[2/4] 构建网站..."
npx hexo generate

# 2. 提交源码
echo ""
echo "[3/4] 推送源码到 main 分支..."
git add -A
git commit -m "update: $(date '+%Y-%m-%d %H:%M')" || echo "  (没有新改动，跳过 commit)"
git push origin main

# 3. 部署到 gh-pages
echo ""
echo "[4/4] 部署到 gh-pages 分支..."
git checkout --orphan gh-pages-tmp
git rm -rf . 2>/dev/null
find . -not -path './public/*' -not -name 'public' -not -name '.git' -mindepth 1 -delete 2>/dev/null
cp -r public/* . 2>/dev/null
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "  (没有新改动)"
git push origin gh-pages-tmp:gh-pages --force

# 4. 切回 main
git checkout main
git branch -D gh-pages-tmp 2>/dev/null

echo ""
echo "========================================="
echo "  部署完成！"
echo "  访问: https://c1-h-y.github.io/myblog/"
echo "========================================="