#!/bin/bash
set -e

echo "========================================="
echo "  Allen's Blog - 一键部署"
echo "========================================="

echo ""
echo "[1/3] 构建网站..."
npx hexo clean
npx hexo generate

echo ""
echo "[2/3] 推送源码..."
git add -A
git commit -m "update: $(date '+%Y-%m-%d %H:%M')" || echo "  (skip)"
git push origin main

echo ""
echo "[3/3] 部署 gh-pages..."
TMPDIR="../myblog-deploy-tmp"
rm -rf "$TMPDIR"
mkdir -p "$TMPDIR"
cp -r public/* "$TMPDIR/"
cd "$TMPDIR"
git init
git checkout -b gh-pages
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git remote add origin https://github.com/C1-H-Y/myblog.git
git push origin gh-pages --force
cd - > /dev/null
rm -rf "$TMPDIR"

echo ""
echo "done! https://c1-h-y.github.io/myblog/"