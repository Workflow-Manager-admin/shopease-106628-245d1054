#!/bin/bash
cd /home/kavia/workspace/code-generation/shopease-106628-245d1054/shopease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

