#!/bin/bash

SUBJECT=${1:-"Exams"}
DATE=$(date '+%Y-%m-%d')

echo "#### $DATE" >> DEV_LOG.md
echo "- Quick commit during $SUBJECT preparation" >> DEV_LOG.md
echo "- Study status: In progress" >> DEV_LOG.md
echo "- Next exam: Tomorrow" >> DEV_LOG.md
echo "" >> DEV_LOG.md

git add DEV_LOG.md
git commit -m "docs: Exam day update - $SUBJECT - $DATE"
git push

echo "✅ Commit pushed! Now back to $SUBJECT."
echo "⏰ Time spent: 15 seconds"
