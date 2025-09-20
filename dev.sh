#!/bin/bash

# theFlowX Local Development Server
echo "🚀 Starting theFlowX Local Development Server"
echo "============================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python not found. Please install Python to run the development server."
    exit 1
fi

# Create package.json for development
cp theflowx-package.json package.json

echo "📦 Setting up development environment..."
echo "🔍 Running tests before starting server..."

# Run tests
npm run test

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All tests passed!"
    echo "🌐 Starting local server at http://localhost:3000"
    echo ""
    echo "📝 Open your browser to: http://localhost:3000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    
    # Start the development server
    $PYTHON_CMD -m http.server 3000
else
    echo "❌ Tests failed. Please fix issues before starting development server."
    exit 1
fi