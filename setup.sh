#!/bin/bash

# Truth Battle - Quick Setup Script
# This script helps you get started with Truth Battle quickly

set -e

echo "🎯 Truth Battle - Quick Setup"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "${BLUE}Checking Node.js version...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version is too old ($NODE_VERSION)${NC}"
    echo "Please upgrade to Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"
echo ""

# Check npm
echo -e "${BLUE}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed!${NC}"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created! Please update it with your API keys.${NC}"
    echo ""
else
    echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
    echo ""
fi

# Ask user what they want to do
echo -e "${YELLOW}What would you like to do?${NC}"
echo "1) Start development server"
echo "2) Build for production"
echo "3) Preview production build"
echo "4) Run all (install, build, preview)"
echo "5) Deploy to Vercel"
echo "6) Exit"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Starting development server...${NC}"
        echo -e "${GREEN}Open http://localhost:5173 in your browser${NC}"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo -e "${BLUE}🏗️  Building for production...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✅ Build complete! Files are in ./dist${NC}"
        ;;
    3)
        echo ""
        echo -e "${BLUE}👀 Building and previewing...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✅ Build complete! Starting preview server...${NC}"
        echo -e "${GREEN}Open http://localhost:4173 in your browser${NC}"
        echo ""
        npm run preview
        ;;
    4)
        echo ""
        echo -e "${BLUE}🔥 Running full setup...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✅ All done! Starting preview server...${NC}"
        echo -e "${GREEN}Open http://localhost:4173 in your browser${NC}"
        echo ""
        npm run preview
        ;;
    5)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
            npm i -g vercel
        fi
        vercel
        ;;
    6)
        echo ""
        echo -e "${GREEN}👋 Setup complete! Run 'npm run dev' to start developing.${NC}"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Invalid choice!${NC}"
        exit 1
        ;;
esac
