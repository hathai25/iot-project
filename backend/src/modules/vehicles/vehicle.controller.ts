import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { VehicleService } from "./vehicle.service";
import { VehicleEntity } from "./vehicle.entity";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { UpdateVehicleDto } from "./dtos/update-vehicle.dto";
import { UpdateParkingStatusVehicleDto } from "./dtos";
import { VehicleFilterDto } from "./dtos/vehicle-filter.dto";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get("/all")
  @ApiOkResponse({ description: "Get all vehicles" })
  async findAll() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Get vehicle by id", type: VehicleEntity })
  async findOne(@Param("id") id: string) {
    return this.vehicleService.getVehicle(id);
  }

  @Get("me/:id")
  @ApiOkResponse({ description: "Get vehicle by user ID", type: VehicleEntity })
  async findByUser(@Param("id") id: string) {
    return this.vehicleService.getVehicleByUserID(id);
  }

  @Get("plate/:plate")
  @ApiOkResponse({ description: "Get vehicle by plate", type: VehicleEntity })
  async findByPlate(@Param("plate") plate: string) {
    return this.vehicleService.getVehicleByPlate(plate);
  }

  @Get()
  @ApiOkResponse({ description: "Get vehicles by filter" })
  async findFilter(@Body() vehicleFilterDto: VehicleFilterDto) {
    return this.vehicleService.getVehicles(vehicleFilterDto);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create vehicle", type: VehicleEntity })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Put(":id")
  @ApiOkResponse({ description: "Update vehicle", type: VehicleEntity })
  async update(
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Put("/park/:id")
  @ApiOkResponse({
    description: "Update vehicle parking status",
    type: VehicleEntity,
  })
  async updateParkingStatus(
    @Param("id") id: string,
    @Body() updateParkingStatusVehicleDto: UpdateParkingStatusVehicleDto
  ) {
    return this.vehicleService.updateParkingStatusVehicle(
      id,
      updateParkingStatusVehicleDto
    );
  }
}
