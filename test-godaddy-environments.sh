#!/bin/bash

# Test GoDaddy API in both Production and OTE environments
KEY="h1eA767h2DXK_CCYKHgyBb9nGtNQ8cTqNQw"
SECRET="4pUaniJMxbH59Wk8PzzY3D"

echo "🔍 Testing GoDaddy API environments..."
echo ""

echo "📋 Testing PRODUCTION environment..."
PROD_RESPONSE=$(curl -s -X GET "https://api.godaddy.com/v1/domains/available?domain=test12345.com" -H "Authorization: sso-key $KEY:$SECRET")
echo "Production response: $PROD_RESPONSE"
echo ""

echo "📋 Testing OTE (Test) environment..."
OTE_RESPONSE=$(curl -s -X GET "https://api.ote-godaddy.com/v1/domains/available?domain=test12345.com" -H "Authorization: sso-key $KEY:$SECRET")
echo "OTE response: $OTE_RESPONSE"
echo ""

# Test a simpler endpoint that might work
echo "📋 Testing domain availability (simpler endpoint)..."
SIMPLE_RESPONSE=$(curl -s -X GET "https://api.godaddy.com/v1/domains/available?domain=definitely-not-available-google.com" -H "Authorization: sso-key $KEY:$SECRET")
echo "Simple test response: $SIMPLE_RESPONSE"
echo ""

echo "📋 Analysis:"
if [[ $PROD_RESPONSE == *"ACCESS_DENIED"* ]]; then
    echo "❌ Production: Access denied - account requirements not met"
elif [[ $PROD_RESPONSE == *"available"* ]]; then
    echo "✅ Production: Working correctly!"
fi

if [[ $OTE_RESPONSE == *"UNABLE_TO_AUTHENTICATE"* ]]; then
    echo "❌ OTE: Authentication failed - key might be production-only"
elif [[ $OTE_RESPONSE == *"available"* ]]; then
    echo "✅ OTE: Working correctly!"
fi

echo ""
echo "🎯 Next Steps Based on Documentation:"
echo "1. Fund a 'Good as Gold' account in your GoDaddy account"
echo "2. Verify your account meets API access criteria"
echo "3. Consider creating OTE (test) environment keys first"
echo "4. Check for any account verification requirements"