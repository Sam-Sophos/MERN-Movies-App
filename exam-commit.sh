#!/bin/bash

SUBJECT=${1:-"Exams"}
YEAR="2026"
MONTH=$(date '+%m')
DAY=$(date '+%d')
DATE="${YEAR}-${MONTH}-${DAY}"

echo "#### $DATE" >> DEV_LOG.md
echo "- Exam day: $SUBJECT" >> DEV_LOG.md
echo "- Quick commit during study break" >> DEV_LOG.md
echo "- Time: 2 minutes" >> DEV_LOG.md
echo "" >> DEV_LOG.md

git add DEV_LOG.md
git commit -m "docs: Exam day - $SUBJECT - $DATE"
git push

echo "✅ Exam day commit for $DATE"
