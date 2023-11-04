import {
    Stack,
    Text,
    TextInput,
     Select, Avatar, Group,
} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {forwardRef, ReactNode} from "react";
import {CreateVehicleProps, useListUser} from "./server";

export type FormValues = CreateVehicleProps;

type UserSelectItem = {
    id: string;
    name: string;
    email: string;
    avatar: string;
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    email: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({image, label, email, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image}/>
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" opacity={0.65}>
                        {email}
                    </Text>
                </div>
            </Group>
        </div>
    ),
);

export const VehicleForm = (props: {
    initialValues: FormValues;
    onSubmit: (values: FormValues) => void;
    children?: ReactNode;
}) => {
    const {initialValues, onSubmit, children} = props;
    const users = useListUser().data?.items
    const form = useForm<FormValues>({
        initialValues,
        validate: {
            plate: isNotEmpty("Required"),
            description: isNotEmpty("Required"),
            type: isNotEmpty("Required"),
            status: isNotEmpty("Required"),
            userID: isNotEmpty("Required"),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    label={"Plate"}
                    {...form.getInputProps("plate")}
                    withAsterisk
                />
                <TextInput
                    label={"Description"}
                    {...form.getInputProps("description")}
                    withAsterisk
                />
                <Select
                    label={"Type"}
                    data={[
                        {
                            value: "car",
                            label: "Car",
                        },
                        {
                            value: "motorbike",
                            label: "Motorbike",
                        }
                    ]}
                    {...form.getInputProps("type")}
                    withAsterisk
                />
                <Select
                    label={"Status"}
                    data={[
                        {
                            value: "parking",
                            label: "Parking",
                        },
                        {
                            value: "away",
                            label: "Away",
                        }
                    ]}
                    {...form.getInputProps("status")}
                    withAsterisk
                />
                {users && <Select
                  label={"Owner"}
                  itemComponent={SelectItem}
                  data={users.map((user: UserSelectItem) => ({
                      value: user.id,
                      label: user.name,
                      image: user.avatar,
                      email: user.email,
                  }))}
                  {...form.getInputProps("userID")}
                  withAsterisk
                />}
                {children}
            </Stack>
        </form>
    );
};

export const VehicleDeleteForm = (props: {
    onSubmit: () => void;
    children: ReactNode;
}) => {
    const {onSubmit, children} = props;
    const form = useForm();
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Text>
                    Are you sure you want to delete this vehicle?
                </Text>
                {children}
            </Stack>
        </form>
    );
};