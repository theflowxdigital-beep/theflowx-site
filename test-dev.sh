#!/bin/bash

echo "🧪 Testing theFlowX Development Setup"
echo "====================================="

# Test 1: Package.json setup
echo "📦 Test 1: Setting up package.json..."
cp theflowx-package.json package.json
if [ $? -eq 0 ]; then
    echo "✅ Package.json setup successful"
else
    echo "❌ Package.json setup failed"
    exit 1
fi

# Test 2: Run tests
echo ""
echo "🔍 Test 2: Running test suite..."
npm run test
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed"
    exit 1
fi

# Test 3: Check if Python server can start
echo ""
echo "🌐 Test 3: Testing Python server..."
python3 -m http.server 3001 --directory . &
SERVER_PID=$!
sleep 2

# Test if server responds
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Local server works!"
    echo "🌐 theFlowX website is accessible at http://localhost:3001"
else
    echo "❌ Server test failed"
fi

# Clean up
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 Development environment is ready!"
echo "💡 Run './dev.sh' to start development server"
echo "📝 Server will run at http://localhost:3000"