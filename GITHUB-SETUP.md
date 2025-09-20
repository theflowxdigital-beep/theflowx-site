# GitHub Repository Setup for theFlowX AIDevOps

This guide shows you how to set up manual approval for production deployments.

## 🔐 Step 1: Set up Repository Secrets (COMPLETED)

You've already added these secrets:
- `FTP_HOST`: `theflowx.com`
- `FTP_USERNAME`: `claudecode@theflowx.com`  
- `FTP_PASSWORD`: `Sunith@007`

## 🛡️ Step 2: Set up Production Environment Protection

To require manual approval before production deployment:

### A. Create Production Environment:
1. Go to: https://github.com/theflowxdigital-beep/theflowx-site/settings/environments
2. Click **"New environment"**
3. Name: `production`
4. Click **"Configure environment"**

### B. Add Protection Rules:
1. ✅ Check **"Required reviewers"**
2. Add yourself as a required reviewer
3. ✅ Check **"Wait timer"** → Set to **1 minute** (minimum)
4. Click **"Save protection rules"**

## 📋 Step 3: How the Pipeline Works

### When you make changes:

#### 1. **Testing Stage** (Automatic)
- ✅ Validates HTML structure
- ✅ Checks CSS/JS files
- ✅ Runs build process
- ✅ Must pass before proceeding

#### 2. **Pull Request** (Staging)
- 🧪 Creates staging environment
- 🔍 Ready for testing
- 👥 Team can review changes

#### 3. **Production Deployment** (Manual Approval)
- ⏸️  **PAUSES** and waits for your approval
- 📧 Sends notification email
- 🛡️  You must click **"Approve and deploy"**
- 🚀 Only then deploys to theflowx.com

## 🎯 Quick Commands

### Local Testing:
```bash
./dev.sh  # Test & run local server
```

### Deploy Process:
1. Make changes locally
2. Test with `./dev.sh`
3. Commit and push to GitHub
4. **Wait for email notification**
5. **Approve deployment manually**
6. 🎉 Goes live on theflowx.com!

## 🚨 Safety Features

- ❌ **No automatic production deployment**
- ✅ **All tests must pass first**
- ✅ **Manual approval required**
- ✅ **Full rollback capability**
- ✅ **Deploy notifications**

Your production site is now protected! 🛡️