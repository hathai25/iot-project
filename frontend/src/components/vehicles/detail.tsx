import {DescriptionList} from "@/components/description-list.tsx";
import {Vehicle} from "./server.ts";
import {VehicleParkingStatus} from "@/components/vehicles/table.tsx";
import {Button, Paper, Stack} from "@mantine/core";

export const VehicleDetail = (props: { vehicle: Vehicle, onCancel: () => void }) => {
    const { vehicle, onCancel } = props;
    return (
        <Stack>
            <Paper withBorder>

        <DescriptionList data={[
            {
                term: "Plate",
                details: vehicle.plate
            },
            {
                term: "Status",
                details: <VehicleParkingStatus status={vehicle.status}/>
            },
            {
                term: "Description",
                details: vehicle.description
            },
            {
                term: "Type",
                details: vehicle.type[0].toUpperCase() + vehicle.type.slice(1)
            }
        ]}
        />
            </Paper>
                <Button variant="gradient"  onClick={onCancel}>
                    Ok
                </Button>
        </Stack>
    )
}