// Taken from https://stackoverflow.com/questions/47683591/react-native-different-styles-applied-on-orientation-change
import { Dimensions } from 'react-native';
/**
 * Returns true if the screen is in portrait mode
 */
export function isPortrait() {
    const dim = Dimensions.get('window');
    return dim.height >= dim.width;
}

/**
 * Returns true of the screen is in landscape mode
 */
export function isLandscape() {
    const dim = Dimensions.get('window');
    return dim.width >= dim.height;
}
