import React from "react";
import cx from "clsx";
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "../cssModules/themeToggle.modules.css";
import { THEMES } from "../utils/constants";

export const ThemeToggleButton = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(`${THEMES.DARK}`, { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === `${THEMES.LIGHT}` ? `${THEMES.DARK}` : `${THEMES.LIGHT}`)}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};
