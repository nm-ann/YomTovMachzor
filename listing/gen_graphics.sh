# !/bin/bash
# Usage: ./gen_graphics.sh -c background_color -i icon_img_path
while getopts "i:c:" OPTION
do
    case $OPTION in
    c)
        COLOR=$OPTARG
        ;;
    i)
        IMG=$OPTARG
        ;;
    esac
done
if [ -z $IMG ]; then
    echo "Usage: ./gen_graphics.sh -c background_color -i icon_img_path"
    exit 1
fi
if [ -z $COLOR ]; then
    COLOR="\#deb744"
fi

# echo "CREATING BACKGROUND IMAGES"
convert -size 1080x2160 xc:$COLOR screenshots/background_android.png 
convert -size 1284x2778 xc:$COLOR screenshots/background_iphone_big.png 
convert -size 1242x2208 xc:$COLOR screenshots/background_iphone_small.png
convert -size 2048x2732 xc:$COLOR screenshots/background_ipad.png

echo "Generating 5.5 inch iPhone screenshots"
for file in screenshots/ios/*_iphone.png;
do ext="${file##*.}"; filename="${file%.*}";
cp "$file" "${filename}_small.${ext}";
mv "$file" "${filename}_big.${ext}";
done

echo "CREATING SCREENSHOTS"
cd screenshots
fastlane frameit
cd ..

echo "MAKING ANDROID ICONS"
mkdir icons
mkdir icons/android
mkdir icons/ios
mkdir icons/android/mipmap-xxxhdpi/
mkdir icons/android/mipmap-xxhdpi/
mkdir icons/android/mipmap-xhdpi/
mkdir icons/android/mipmap-hdpi/
mkdir icons/android/mipmap-mdpi/
mkdir icons/android/mipmap-ldpi/

imgName="${IMG%.*}";
convert -size 192x192 xc:Black -fill White -draw 'circle 96 96 96 1' -alpha Copy mask192.png
convert $IMG -resize 192x192 icons/android/mipmap-xxxhdpi/ic_launcher.png
convert icons/android/mipmap-xxxhdpi/ic_launcher.png -gravity Center mask192.png -compose CopyOpacity -composite -trim icons/android/mipmap-xxxhdpi/ic_launcher_round.png
convert -size 144x144 xc:Black -fill White -draw 'circle 72 72 72 1' -alpha Copy mask144.png
convert $IMG -resize 144x144 icons/android/mipmap-xxhdpi/ic_launcher.png
convert icons/android/mipmap-xxhdpi/ic_launcher.png -gravity Center mask144.png -compose CopyOpacity -composite -trim icons/android/mipmap-xxhdpi/ic_launcher_round.png
convert -size 96x96 xc:Black -fill White -draw 'circle 48 48 48 1' -alpha Copy mask96.png
convert $IMG -resize 96x96 icons/android/mipmap-xhdpi/ic_launcher.png
convert icons/android/mipmap-xhdpi/ic_launcher.png -gravity Center mask96.png -compose CopyOpacity -composite -trim icons/android/mipmap-xhdpi/ic_launcher_round.png
convert -size 72x72 xc:Black -fill White -draw 'circle 36 36 36 1' -alpha Copy mask72.png
convert $IMG -resize 72x72 icons/android/mipmap-hdpi/ic_launcher.png
convert icons/android/mipmap-hdpi/ic_launcher.png -gravity Center mask72.png -compose CopyOpacity -composite -trim icons/android/mipmap-hdpi/ic_launcher_round.png
convert -size 48x48 xc:Black -fill White -draw 'circle 24 24 24 1' -alpha Copy mask48.png
convert $IMG -resize 48x48 icons/android/mipmap-mdpi/ic_launcher.png
convert icons/android/mipmap-mdpi/ic_launcher.png -gravity Center mask48.png -compose CopyOpacity -composite -trim icons/android/mipmap-mdpi/ic_launcher_round.png
convert -size 36x36 xc:Black -fill White -draw 'circle 18 18 18 1' -alpha Copy mask36.png
convert $IMG -resize 36x36 icons/android/mipmap-ldpi/ic_launcher.png
convert icons/android/mipmap-ldpi/ic_launcher.png -gravity Center mask36.png -compose CopyOpacity -composite -trim icons/android/mipmap-ldpi/ic_launcher_round.png

cp -r icons/android/* ../android/app/src/main/res/

echo "MAKING IOS ICONS"
convert $IMG -resize 20x20! icons/ios/$imgName-20.png
convert $IMG -resize 22x22! icons/ios/$imgName-22.png
convert $IMG -resize 29x29! icons/ios/$imgName-29.png
convert $IMG -resize 40x40! icons/ios/$imgName-40.png
convert $IMG -resize 44x44! icons/ios/$imgName-44.png
convert $IMG -resize 48x48! icons/ios/$imgName-48.png
convert $IMG -resize 55x55! icons/ios/$imgName-55.png
convert $IMG -resize 58x58! icons/ios/$imgName-58.png
convert $IMG -resize 60x60! icons/ios/$imgName-60.png
convert $IMG -resize 66x66! icons/ios/$imgName-66.png
convert $IMG -resize 76x76! icons/ios/$imgName-76.png
convert $IMG -resize 80x80! icons/ios/$imgName-80.png
convert $IMG -resize 87x87! icons/ios/$imgName-87.png
convert $IMG -resize 88x88! icons/ios/$imgName-88.png
convert $IMG -resize 120x120! icons/ios/$imgName-120.png
convert $IMG -resize 152x152! icons/ios/$imgName-152.png
convert $IMG -resize 167x167! icons/ios/$imgName167.png
convert $IMG -resize 172x172! icons/ios/$imgName-172.png
convert $IMG -resize 180x180! icons/ios/$imgName-180.png
convert $IMG -resize 196x196! icons/ios/$imgName-196.png
convert $IMG -resize 1024x1024! icons/ios/$imgName-1024.png

COLOR_GREEN='\033[0;32m'
COLOR_DEFAULT='\033[0m'
echo -e "${COLOR_GREEN}FINISHED${COLOR_DEFAULT}"
exit 0
