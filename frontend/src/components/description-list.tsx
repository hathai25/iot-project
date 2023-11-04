import {
  Divider,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Fragment, ReactNode } from "react";

type DescriptionListItem = {
  term: ReactNode;
  details: ReactNode;
};

export const DescriptionList = (props: { data: DescriptionListItem[] }) => {
  const { data } = props;
  const theme = useMantineTheme();
  return (
    <Stack spacing={0} h="100%">
      {data.map((item, index) => (
        <Fragment key={index}>
          <SimpleGrid cols={2} spacing={0}>
            <Text
              weight={700}
              size="sm"
              p="xs"
              sx={(theme) => ({
                color: theme.colors.gray[7],
                backgroundColor: theme.colors.gray[1],
              })}
            >
              {item.term}
            </Text>
            <Text size="sm" p="xs" style={{ overflowWrap: "break-word" }}>
              {item.details}
            </Text>
          </SimpleGrid>
          {index < data.length - 1 && (
            <Divider sx={{ borderColor: theme.colors.gray[3] }} />
          )}
        </Fragment>
      ))}
      <SimpleGrid cols={2} spacing={0} style={{ flexGrow: 1 }}>
        <Stack
          sx={(theme) => ({
            color: theme.colors.gray[7],
            backgroundColor: theme.colors.gray[1],
          })}
        />
        <Stack />
      </SimpleGrid>
    </Stack>
  );
};
