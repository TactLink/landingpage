# Cloudinary Setup for Persistent File Storage

## 🎯 **Problem**
Your uploaded files (logos, images) are missing after Render restarts because they're stored locally and get lost when the container restarts.

## 🚀 **Solution: Cloudinary**
Cloudinary provides free cloud storage for images and files. This will make your uploads persistent.

## 📋 **Setup Steps**

### **1. Create Cloudinary Account**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your credentials from the dashboard

### **2. Get Your Cloudinary Credentials**
In your Cloudinary dashboard, you'll find:
- **Cloud Name** (e.g., `myapp`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdefghijklmnop`)

### **3. Add Environment Variables to Render**
Add these to your Render dashboard → Environment → Environment Variables:

```
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### **4. Deploy**
After adding the environment variables, deploy your application.

## ✅ **What This Fixes**

- **Persistent Files**: Uploaded files will survive Render restarts
- **Missing Logos**: Your logos and images will always be available
- **Cloud Storage**: Files are stored in the cloud, not locally
- **CDN**: Fast global delivery of your images

## 🔍 **Verification**

After deployment:
1. **Upload a new image** in Strapi admin
2. **Check the URL**: Should be a Cloudinary URL
3. **Restart Render**: Files should still be accessible
4. **Re-upload existing logos**: They'll be stored in Cloudinary

## 🎯 **Result**

Your uploaded files will now be persistent and survive Render restarts! 🎉 