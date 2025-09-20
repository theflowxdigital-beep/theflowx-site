# theFlowX.com AIDevOps Pipeline

This document explains the complete testing and deployment workflow for theFlowX.com.

## 🏗️ AIDevOps Architecture

- **Repository**: `theflowxdigital-beep/theflowx-site` on GitHub
- **Live Site**: `theflowx.com` (GoDaddy hosting)  
- **DNS**: `184.168.97.124` via GoDaddy nameservers
- **Pipeline**: Local Testing → Staging → Manual Approval → Production

## 🧪 Local Development & Testing

### Start Local Development Server:
```bash
./dev.sh
```
This will:
- Run all tests automatically
- Start server at http://localhost:3000
- Validate HTML, CSS, and JS files
- Only start if all tests pass

### Manual Testing Commands:
```bash
cp theflowx-package.json package.json
npm run test          # Run all tests
npm run test:html      # Test HTML files
npm run test:css       # Test CSS files  
npm run test:js        # Test JavaScript files
npm run build          # Build for production
```

## 🎭 Staging & Testing Pipeline

### Setup Required:
1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Add these secrets:
   - `FTP_HOST`: Your GoDaddy FTP hostname
   - `FTP_USERNAME`: Your FTP username  
   - `FTP_PASSWORD`: Your FTP password

### How it Works:
- Every push to the `main` branch triggers automatic deployment
- Files are uploaded to `/public_html/` on your hosting
- Excludes git files, node_modules, and development files

## 📤 Manual Deployment

### Using the Deploy Script:
```bash
# Set your FTP credentials
export FTP_HOST='your-ftp-host.com'
export FTP_USER='your-username'
export FTP_PASS='your-password'

# Run deployment
./deploy.sh
```

### Direct FTP Upload:
You can also manually upload files using any FTP client:
- **Host**: Your GoDaddy FTP hostname
- **Directory**: `/public_html/`
- **Files**: All HTML, CSS, JS, and asset files

## 👥 Team Collaboration Workflow

### For Team Members:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/theflowxdigital-beep/theflowx-site.git
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes** to HTML, CSS, JS files

4. **Test locally** by opening `index.html` in browser

5. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** on GitHub

7. **After approval and merge** → Site automatically deploys!

## 📁 File Structure

```
theflowx-site/
├── index.html              # Main landing page
├── about.html               # About page
├── services.html            # Services page
├── contact.html             # Contact page
├── assets/
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   ├── img/                 # Images
│   └── fonts/               # Web fonts
├── .github/workflows/       # GitHub Actions
└── DEPLOYMENT.md            # This file
```

## 🔧 Troubleshooting

### Deployment Fails:
1. Check FTP credentials in GitHub secrets
2. Verify hosting account is active
3. Check file permissions on hosting

### Site Not Updating:
1. Clear browser cache
2. Check if deployment completed successfully
3. Verify files uploaded to correct directory

### DNS Issues:
- Domain: `theflowx.com`
- Current IP: `184.168.97.124`
- Nameservers: `ns77.domaincontrol.com`, `ns78.domaincontrol.com`

## 📞 Support

For hosting issues, contact GoDaddy support.
For repository/deployment issues, create an issue on GitHub.