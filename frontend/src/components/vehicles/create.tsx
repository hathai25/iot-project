import {FormValues, VehicleForm} from "./form";
import {Button, Group, Stack} from "@mantine/core";
import {useCreateVehicle} from "./server.ts";

export const VehicleCreate = (props: {
    onSuccess: () => void;
    onCancel: () => void;
}) => {
    const {onSuccess, onCancel} = props;
    const create = useCreateVehicle();

    const onSubmit = (values: FormValues) => {
        create.mutate(values, {
            onSuccess: onSuccess
        });
    };

    return (
        <Stack>
            <VehicleForm
                onSubmit={onSubmit}
                initialValues={{
                    plate: "",
                    description: "",
                    type: "car",
                    status: "parking",
                    userID: "",
                }}
            >
                {create.isError && <div>Something went wrong</div>}
                <Group position="right">
                    <Button variant="gradient" type="submit" loading={create.isLoading}>
                        Create
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </Group>
            </VehicleForm>
        </Stack>
    );
};