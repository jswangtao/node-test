#!/bin/sh
cd /Users/wangtao/test/node-test/muke/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
