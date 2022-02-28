# !/bin/bash
# Usage: ./gen_graphics.sh -b background_color -i icon_img_path
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
    echo "Usage: ./gen_graphics.sh -b background_color -i icon_img_path"
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
mkdir icons/android/drawable-xxxhdpi/
mkdir icons/android/drawable-xxhdpi/
mkdir icons/android/drawable-xhdpi/
mkdir icons/android/drawable-hdpi/
mkdir icons/android/drawable-mdpi/
mkdir icons/android/drawable-ldpi/

imgName="${IMG%.*}";
convert $IMG -resize 192x192 icons/android/drawable-xxxhdpi/$imgName.png
convert $IMG -resize 144x144 icons/android/drawable-xxhdpi/$imgName.png
convert $IMG -resize 96x96 icons/android/drawable-xhdpi/$imgName.png
convert $IMG -resize 72x72 icons/android/drawable-hdpi/$imgName.png
convert $IMG -resize 48x48 icons/android/drawable-mdpi/$imgName.png
convert $IMG -resize 36x36 icons/android/drawable-ldpi/$imgName.png

echo "MAKING IOS ICONS"
convert $IMG -resize 20x20! icons/ios/$imgName.png-20.png
convert $IMG -resize 22x22! icons/ios/$imgName.png-22.png
convert $IMG -resize 29x29! icons/ios/$imgName.png-29.png
convert $IMG -resize 40x40! icons/ios/$imgName.png-40.png
convert $IMG -resize 44x44! icons/ios/$imgName.png-44.png
convert $IMG -resize 48x48! icons/ios/$imgName.png-48.png
convert $IMG -resize 55x55! icons/ios/$imgName.png-55.png
convert $IMG -resize 58x58! icons/ios/$imgName.png-58.png
convert $IMG -resize 60x60! icons/ios/$imgName.png-60.png
convert $IMG -resize 66x66! icons/ios/$imgName.png-66.png
convert $IMG -resize 76x76! icons/ios/$imgName.png-76.png
convert $IMG -resize 80x80! icons/ios/$imgName.png-80.png
convert $IMG -resize 87x87! icons/ios/$imgName.png-87.png
convert $IMG -resize 88x88! icons/ios/$imgName.png-88.png
convert $IMG -resize 120x120! icons/ios/$imgName.png-120.png
convert $IMG -resize 152x152! icons/ios/$imgName.png-152.png
convert $IMG -resize 167x167! icons/ios/$imgName.png-167.png
convert $IMG -resize 172x172! icons/ios/$imgName.png-172.png
convert $IMG -resize 180x180! icons/ios/$imgName.png-180.png
convert $IMG -resize 196x196! icons/ios/$imgName.png-196.png
convert $IMG -resize 1024x1024! icons/ios/$imgName.png-1024.png

COLOR_GREEN='\033[0;32m'
COLOR_DEFAULT='\033[0m'
echo -e "${COLOR_GREEN}FINISHED${COLOR_DEFAULT}"
exit 0
