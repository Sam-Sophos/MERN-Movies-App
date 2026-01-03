#!/bin/bash

FEATURE=${1:-"Documentation"}
DATE=$(date '+%Y-%m-%d')

echo "#### $DATE" >> DEV_LOG.md
echo "- Minimal coding day" >> DEV_LOG.md
echo "- Worked on: $FEATURE" >> DEV_LOG.md
echo "- Time spent: 10 minutes" >> DEV_LOG.md
echo "- Status: Small progress during exams" >> DEV_LOG.md
echo "" >> DEV_LOG.md

git add DEV_LOG.md
git commit -m "chore: Minor update - $FEATURE - $DATE"
git push

echo "✅ Mini commit complete!"
