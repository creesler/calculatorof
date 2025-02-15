# Create a directory for the tools if it doesn't exist
$toolsDir = "tools"
if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir
}

# Download libwebp
$webpUrl = "https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-windows-x64.zip"
$zipPath = "$toolsDir\libwebp.zip"
$extractPath = "$toolsDir\libwebp"

# Download the zip file
Invoke-WebRequest -Uri $webpUrl -OutFile $zipPath

# Extract the zip file
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

# Find cwebp.exe in the extracted files
$cwebpPath = Get-ChildItem -Path $extractPath -Recurse -Filter "cwebp.exe" | Select-Object -First 1 -ExpandProperty FullName

# Convert SVG to WebP
$inputFile = "public/images/decimal-formula.svg"
$outputFile = "public/images/decimal-formula.webp"

# Run the conversion
& $cwebpPath $inputFile -o $outputFile

# Clean up
Remove-Item $zipPath
Write-Host "Conversion complete! WebP file saved to: $outputFile" 