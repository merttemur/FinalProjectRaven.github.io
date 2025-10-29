# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy the RAVEN website to GitHub Pages at `https://merttemur.github.io/FinalProjectRaven.github.io/`

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- The project files in the current directory

## 🎯 Deployment Steps

### Option 1: Command Line (Recommended)

1. **Initialize Git Repository**
   ```bash
   cd "C:\Users\mert-\OneDrive\Masaüstü\FınalProject"
   git init
   ```

2. **Add All Files**
   ```bash
   git add .
   ```

3. **Create Initial Commit**
   ```bash
   git commit -m "Initial commit: RAVEN GPS-Independent Navigation website"
   ```

4. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/merttemur/FinalProjectRaven.github.io.git
   ```

5. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

6. **Enable GitHub Pages**
   - Go to: https://github.com/merttemur/FinalProjectRaven.github.io/settings/pages
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**
   - Wait 1-2 minutes for deployment

7. **Access Your Website**
   - Your site will be live at: `https://merttemur.github.io/FinalProjectRaven.github.io/`

### Option 2: GitHub Desktop (Easier for Beginners)

1. **Download GitHub Desktop**
   - Visit: https://desktop.github.com/
   - Install and sign in with your GitHub account

2. **Add Repository**
   - Click **File** → **Add local repository**
   - Choose the project folder: `C:\Users\mert-\OneDrive\Masaüstü\FınalProject`
   - If prompted to create a repository, click **Create repository**

3. **Publish to GitHub**
   - Click **Publish repository**
   - Name: `FinalProjectRaven.github.io`
   - Uncheck "Keep this code private" if you want it public
   - Click **Publish repository**

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

5. **Done!**
   - Your website will be live at: `https://merttemur.github.io/FinalProjectRaven.github.io/`

### Option 3: GitHub Web Interface (Upload Files)

1. **Create Repository on GitHub**
   - Go to: https://github.com/new
   - Name: `FinalProjectRaven.github.io`
   - Make it public
   - Click **Create repository**

2. **Upload Files**
   - Click **uploading an existing file**
   - Drag and drop all project files
   - Commit changes

3. **Enable GitHub Pages**
   - Go to **Settings** → **Pages**
   - Select **main** branch and **/ (root)**
   - Click **Save**

## ✅ Verification

After deployment, check if your site is live:

1. Visit: `https://merttemur.github.io/FinalProjectRaven.github.io/`
2. You should see the RAVEN homepage with animations
3. Test navigation by clicking menu items
4. Check mobile responsiveness by resizing browser

## 🔧 Troubleshooting

### Issue: 404 Error After Deployment
**Solution:** Wait 2-5 minutes. GitHub Pages needs time to build.

### Issue: Styles Not Loading
**Solution:**
- Check that `styles.css` and `script.js` are in the same folder as `index.html`
- Clear browser cache (Ctrl + Shift + R)

### Issue: Repository Not Found
**Solution:**
- Make sure the repository is public
- Check the repository name matches exactly

### Issue: Changes Not Showing
**Solution:**
- Push your changes: `git push`
- Clear browser cache
- Wait a few minutes for GitHub Pages to rebuild

## 📝 Making Updates

To update your website after initial deployment:

```bash
# Make your changes to the files
# Then commit and push:

git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically rebuild your site (usually takes 1-2 minutes).

## 🌐 Custom Domain (Optional)

If you want to use a custom domain:

1. Buy a domain from any domain registrar
2. Create a file named `CNAME` in your project root
3. Add your domain to the file (e.g., `raven.yourdomain.com`)
4. Configure DNS settings at your domain registrar:
   - Type: CNAME
   - Name: raven (or @)
   - Value: merttemur.github.io

## 📊 Site Analytics (Optional)

To add Google Analytics:

1. Get a tracking code from Google Analytics
2. Add it to the `<head>` section of `index.html`

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS. Your site will be accessible via:
- ✅ `https://merttemur.github.io/FinalProjectRaven.github.io/` (secure)
- ⚠️ `http://merttemur.github.io/FinalProjectRaven.github.io/` (redirects to HTTPS)

## 🎨 Performance Tips

Your site is already optimized with:
- ✅ Minified CSS animations
- ✅ Debounced scroll events
- ✅ Lazy loading ready
- ✅ Hardware-accelerated animations
- ✅ Responsive images support

## 📱 Testing

Test your site on:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile devices (iOS, Android)
- ✅ Different screen sizes
- ✅ Slow internet connections

## 🆘 Need Help?

- **GitHub Pages Documentation:** https://docs.github.com/en/pages
- **Git Documentation:** https://git-scm.com/doc
- **GitHub Community:** https://github.community/

## ✨ Success!

Congratulations! Your RAVEN website is now live and accessible to the world!

Share your project:
- 🔗 Direct link: `https://merttemur.github.io/FinalProjectRaven.github.io/`
- 📱 QR Code: Generate at https://www.qr-code-generator.com/
- 🐦 Social Media: Share with #RAVEN #DroneNavigation #TechInnovation

---

**Happy Deploying! 🚀**

*RAVEN Team - TED University*
