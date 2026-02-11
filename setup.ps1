Write-Host "Starting Valentine Love Project Setup..."

# Ensure correct folder
if (!(Test-Path "app")) {
    Write-Error "Run this script inside the valentine-love folder."
    exit 1
}

# Fix empty or broken package.json
if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" -Raw
    if ($pkg.Trim().Length -eq 0) {
        Remove-Item "package.json"
    }
}

# Initialize npm
if (!(Test-Path "package.json")) {
    npm init -y
}

# Install dependencies
npm install next react react-dom
npm install framer-motion
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer typescript

# Write tailwind.config.js
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
"@
Set-Content -Path "tailwind.config.js" -Value $tailwindConfig

# Write postcss.config.js
$postcssConfig = @"
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
"@
Set-Content -Path "postcss.config.js" -Value $postcssConfig

# Ensure globals.css exists
if (!(Test-Path "app/globals.css")) {
    New-Item -Path "app/globals.css" -ItemType File | Out-Null
}

# Write globals.css (Tailwind v4)
$globalsCss = @"
@import "tailwindcss";
"@
Set-Content -Path "app/globals.css" -Value $globalsCss

Write-Host "Setup complete."
Write-Host "Run: npm run dev"
Write-Host "Open: http://localhost:3000"
