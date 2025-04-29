/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0A84FF'; // iOS-style vibrant blue
const tintColorDark = '#0A84FF'; // Keep same for consistency

export const Colors = {
  light: {
    text: '#1C1C1E',
    background: '#F9F9FB',
    tint: tintColorLight,
    icon: '#3C3C43',
    tabIconDefault: '#C7C7CC',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F2F2F7',
    background: '#1C1C1E',
    tint: tintColorDark,
    icon: '#9FA3A9',
    tabIconDefault: '#5E5E5E',
    tabIconSelected: tintColorDark,
  },
};
