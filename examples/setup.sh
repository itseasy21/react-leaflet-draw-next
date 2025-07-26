#!/bin/bash

# React-Leaflet-Geoman Examples Setup Script
# This script helps you get started with the examples

echo "🚀 Setting up React-Leaflet-Geoman Examples..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Navigate to react-app example
cd react-app

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now run the example:"
    echo "   npm run dev"
    echo ""
    echo "The example app will open at http://localhost:3000"
    echo ""
    echo "📚 For more information, see the README.md file"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi