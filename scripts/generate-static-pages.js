import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist!');
  process.exit(1);
}

const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in dist directory!');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// List of static routes to create for direct static hosting (like GitHub Pages)
const staticFiles = [
  'services.html',
  'about.html',
  'contact.html',
  'projects.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'web-development.html',
  'seo.html',
  'google-business-profile.html',
  'services/index.html',
  'services/web-development/index.html',
  'services/seo/index.html',
  'services/google-business-profile/index.html',
  'projects/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy-policy/index.html',
  'terms-and-conditions/index.html',
];

for (const relPath of staticFiles) {
  const targetPath = path.join(distDir, relPath);
  const targetDir = path.dirname(targetPath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(targetPath, indexHtml, 'utf8');
}

console.log(`Successfully generated ${staticFiles.length} static HTML pages for GitHub Pages in dist/`);
