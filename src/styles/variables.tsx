import { useColorScheme } from "react-native-appearance";
import DarkTheme from "./DarkTheme";
import DefaultTheme from "./DefaultTheme";

export function Variables() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return {
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 14,
    FONT_SIZE_LARGE: 16,
    PRIMARY_COLOR: theme.colors.primary,
    BACKGROUND_COLOR: theme.colors.background,
    BORDER_COLOR: theme.colors.border,
    CARD_COLOR: theme.colors.card,
    SECONDARY_CARD_COLOR: theme.colors.secondaryCard,
    NOTIFICATION_COLOR: theme.colors.notification,
    TEXT_COLOR: theme.colors.text,
    GREEN_COLOR: theme.colors.green,
    RED_COLOR: theme.colors.red,
    YELLOW_COLOR: theme.colors.yellow,
  };
}

export default { Variables };

