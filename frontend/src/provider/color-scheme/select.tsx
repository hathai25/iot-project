import {
    ActionIcon,
    useMantineColorScheme,
} from "@mantine/core";
import {IconSun, IconMoonStars} from "@tabler/icons-react";


export const ColorSchemeSelect = (): JSX.Element => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            radius="xl"
        >
            {dark ? <IconSun size="1.2rem"/> : <IconMoonStars size="1.2rem"/>}
        </ActionIcon>
    );
};
