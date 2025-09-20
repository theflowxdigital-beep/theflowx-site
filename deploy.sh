#!/bin/bash

# Manual Deployment Script for theFlowX.com
# This script uploads your local files to GoDaddy hosting

echo "🚀 theFlowX.com Deployment Script"
echo "=================================="

# Check if FTP credentials are set
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo "❌ FTP credentials not set!"
    echo ""
    echo "Please set these environment variables:"
    echo "  export FTP_HOST='your-ftp-host.com'"
    echo "  export FTP_USER='your-username'"
    echo "  export FTP_PASS='your-password'"
    echo ""
    echo "Or edit this script to include your credentials directly."
    exit 1
fi

echo "📋 Deployment Configuration:"
echo "  Host: $FTP_HOST"
echo "  User: $FTP_USER"
echo "  Target: /public_html/"
echo ""

# Create a temporary file list for deployment
echo "📁 Preparing files for upload..."
TEMP_LIST=$(mktemp)

# Include main website files, exclude unnecessary files
find . -type f \
  ! -path "./.git/*" \
  ! -path "./node_modules/*" \
  ! -path "./bmad-method/*" \
  ! -path "./.github/*" \
  ! -name "*.sh" \
  ! -name "package*.json" \
  ! -name "README.md" \
  ! -name ".DS_Store" \
  > "$TEMP_LIST"

echo "📤 Files to upload:"
cat "$TEMP_LIST"
echo ""

read -p "Continue with deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    rm "$TEMP_LIST"
    exit 1
fi

echo "🔄 Starting FTP upload..."

# Using curl for FTP upload (you can also use lftp or other FTP clients)
while IFS= read -r file; do
    if [ -f "$file" ]; then
        # Remove leading ./ from path
        remote_path=${file#./}
        remote_dir=$(dirname "$remote_path")
        
        echo "Uploading: $file -> /public_html/$remote_path"
        
        # Create directory structure if needed
        if [ "$remote_dir" != "." ]; then
            curl -s --ftp-create-dirs -T "$file" "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/public_html/$remote_path"
        else
            curl -s -T "$file" "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/public_html/$remote_path"
        fi
        
        if [ $? -eq 0 ]; then
            echo "  ✅ Success"
        else
            echo "  ❌ Failed"
        fi
    fi
done < "$TEMP_LIST"

rm "$TEMP_LIST"

echo ""
echo "🎉 Deployment completed!"
echo "🌐 Your site should be live at: https://theflowx.com"
echo ""
echo "💡 Tip: You can also use the GitHub Actions workflow"
echo "   by pushing changes to the main branch."