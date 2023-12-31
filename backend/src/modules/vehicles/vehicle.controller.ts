import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { VehicleService } from "./vehicle.service";
import { VehicleEntity } from "./vehicle.entity";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { UpdateVehicleDto } from "./dtos/update-vehicle.dto";
import {
  UpdateParkingStatusVehicleDto,
  VehicleDto,
  VehicleWithUserDetailDto,
} from "./dtos";
import { VehicleFilterDto } from "./dtos/vehicle-filter.dto";
import { arrDataToRespone } from "src/common/respone/util";
import { dataToRespone } from "src/common/respone/util";
import { JwtAdminGuard } from "../admin/guards";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(JwtAdminGuard)
  @Get("/list/all")
  @ApiOkResponse({ description: "Get all vehicles" })
  async findAll() {
    const vehicles = await this.vehicleService.getAllVehicles();
    return arrDataToRespone(VehicleWithUserDetailDto)(
      vehicles,
      vehicles.length
    );
  }

  @UseGuards(JwtAdminGuard)
  @Get(":id")
  @ApiOkResponse({ description: "Get vehicle by id", type: VehicleEntity })
  async findOne(@Param("id") id: string) {
    const data = await this.vehicleService.getVehicle(id);

    return dataToRespone(VehicleDto)(data);
  }

  @Get("me/:id")
  @ApiOkResponse({ description: "Get vehicle by user ID", type: VehicleEntity })
  async findByUser(@Param("id") id: string) {
    const vehicles = await this.vehicleService.getVehicleByUserID(id);
    return arrDataToRespone(VehicleWithUserDetailDto)(
      vehicles,
      vehicles.length
    );
  }

  @UseGuards(JwtAdminGuard)
  @Get("plate/:plate")
  @ApiOkResponse({ description: "Get vehicle by plate", type: VehicleEntity })
  async findByPlate(@Param("plate") plate: string) {
    return this.vehicleService.getVehicleByPlate(plate);
  }

  @UseGuards(JwtAdminGuard)
  @Get()
  @ApiOkResponse({ description: "Get vehicles by filter" })
  async findFilter(@Body() vehicleFilterDto: VehicleFilterDto) {
    const vehicles = await this.vehicleService.getVehicles(vehicleFilterDto);
    return arrDataToRespone(VehicleDto)(vehicles, vehicles.length);
  }

  @UseGuards(JwtAdminGuard)
  @Post("/create")
  @ApiCreatedResponse({ description: "Create vehicle", type: VehicleEntity })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @UseGuards(JwtAdminGuard)
  @Put("/update/:id")
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

  @UseGuards(JwtAdminGuard)
  @Delete("delete/:id")
  @ApiOkResponse({ description: "Delete vehicle by Id" })
  async deleteVehicle(@Param("id") id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
