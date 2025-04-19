#!/bin/bash

# Directory containing the images
DIR="public/assets/thumbnails"

# Create a backup directory
BACKUP_DIR="${DIR}/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Convert all PNG and JPG files to WebP
for file in "$DIR"/*.{png,jpg,jpeg}; do
    if [ -f "$file" ]; then
        # Get the filename without extension
        filename=$(basename -- "$file")
        name="${filename%.*}"
        
        # Create WebP version
        cwebp -q 80 "$file" -o "$DIR/$name.webp"
        
        # Move original to backup
        mv "$file" "$BACKUP_DIR/"
        
        echo "Converted $filename to WebP"
    fi
done

echo "Conversion complete. Original files backed up to $BACKUP_DIR" 