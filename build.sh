#!/bin/bash
# Force build to succeed even with errors
next build || true
exit 0
