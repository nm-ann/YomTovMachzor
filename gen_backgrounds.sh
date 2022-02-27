 #!/bin/bash
convert -size 1080x2160 xc:\#deb744 listing/screenshots/background_android.png 
convert -size 1284x2778 xc:\#deb744 listing/screenshots/background_iphone_big.png 
convert -size 1242x2208 xc:\#deb744 listing/screenshots/background_iphone_small.png
convert -size 2048x2732 xc:\#deb744 listing/screenshots/background_ipad.png

for file in listing/screenshots/ios/*_iphone.png;
do ext="${file##*.}"; filename="${file%.*}";
cp "$file" "${filename}_small.${ext}";
mv "$file" "${filename}_big.${ext}";
done
listing/screenshots/ios/*_iphone listing/screenshots/ios/iphone_small

# cd listing/screenshots
# fastlane frameit
# cd ../..