#!/bin/bash

# Test GoDaddy CLI Connection
export PATH="$HOME/bin:$PATH"

echo "🔍 Testing GoDaddy CLI connection..."
echo ""

# Test if credentials are configured
if [ ! -f ~/.config/godaddy/credentials.json ]; then
    echo "❌ Credentials file not found!"
    echo "Please edit ~/.config/godaddy/credentials.json with your API keys"
    exit 1
fi

# Check if credentials are still template values
if grep -q "YOUR_GODADDY_API_KEY_HERE" ~/.config/godaddy/credentials.json; then
    echo "❌ Please update your API credentials in:"
    echo "   ~/.config/godaddy/credentials.json"
    echo ""
    echo "Replace 'YOUR_GODADDY_API_KEY_HERE' and 'YOUR_GODADDY_API_SECRET_HERE'"
    echo "with your actual GoDaddy API key and secret from:"
    echo "https://developer.godaddy.com/keys"
    exit 1
fi

echo "✅ Credentials file found"

# Test listing domains
echo "📋 Testing domain listing..."
godaddy domains list

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! GoDaddy CLI is working correctly"
    echo ""
    echo "Available commands:"
    echo "  godaddy domains list              - List your domains"
    echo "  godaddy domains search example.com  - Check domain availability"
    echo "  godaddy records list --domain your-domain.com  - List DNS records"
    echo "  godaddy records add --domain your-domain.com --type A --name www --value 1.2.3.4"
else
    echo ""
    echo "❌ Connection failed. Please check your API credentials."
fi