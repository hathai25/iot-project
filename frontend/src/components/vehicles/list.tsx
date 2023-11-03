import {Button, Group, Modal, Paper, Stack, Title} from "@mantine/core";
import {useListVehicle} from "./server.ts";
import {Loader} from "@/components/loader";
import {IconPlus} from "@tabler/icons-react";
import {VehicleTable} from "@/components/vehicles/table.tsx";
import {useState} from "react";
import {VehicleCreate} from "@/components/vehicles/create.tsx";
import {notifications} from "@mantine/notifications";

export const VehicleList = () => {
    const list = useListVehicle();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    return <Stack>
        <Group position="apart">
            <Title order={2}>
                Vehicle
            </Title>
            <div>
                <Button onClick={() => setOpenCreateModal(true)} variant="gradient" leftIcon={<IconPlus/>}>
                    Add
                </Button>
            </div>
        </Group>
        <Paper pos="relative" withBorder>

            {list.isError && <div>Something went wrong</div>}
            {list.isLoading && <Loader/>}
            {list.isSuccess && <VehicleTable vehicles={list.data.items}/>}
        </Paper>
        <Modal
            title={
                <Title order={2}>
                    Create Vehicle
                </Title>
            }
            opened={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
        >
            {openCreateModal && (
                <VehicleCreate
                    onCancel={() => setOpenCreateModal(false)}
                    onSuccess={() => {
                        setOpenCreateModal(false);
                        notifications.show({
                            title: "Vehicle created",
                            message: "Vehicle created successfully",
                        })
                    }}
                />
            )}
        </Modal>
    </Stack>;
}