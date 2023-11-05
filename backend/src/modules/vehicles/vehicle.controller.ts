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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get("/all")
  @UseGuards(JwtAdminGuard)
  @ApiOkResponse({ description: "Get all vehicles" })
  async findAll() {
    const vehicles = await this.vehicleService.getAllVehicles();
    return arrDataToRespone(VehicleWithUserDetailDto)(
      vehicles,
      vehicles.length
    );
  }

  @Get(":id")
  @UseGuards(JwtAdminGuard)
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

  @Get("plate/:plate")
  @UseGuards(JwtAdminGuard)
  @ApiOkResponse({ description: "Get vehicle by plate", type: VehicleEntity })
  async findByPlate(@Param("plate") plate: string) {
    return this.vehicleService.getVehicleByPlate(plate);
  }

  @Get()
  @UseGuards(JwtAdminGuard)
  @ApiOkResponse({ description: "Get vehicles by filter" })
  async findFilter(@Body() vehicleFilterDto: VehicleFilterDto) {
    const vehicles = await this.vehicleService.getVehicles(vehicleFilterDto);
    return arrDataToRespone(VehicleDto)(vehicles, vehicles.length);
  }

  @Post("/create")
  @UseGuards(JwtAdminGuard)
  @ApiCreatedResponse({ description: "Create vehicle", type: VehicleEntity })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Put("/update/:id")
  @UseGuards(JwtAdminGuard)
  @ApiOkResponse({ description: "Update vehicle", type: VehicleEntity })
  async update(
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Put("/park/:id")
  @UseGuards(JwtAdminGuard, JwtAuthGuard)
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

  @Delete("delete/:id")
  @UseGuards(JwtAdminGuard)
  @ApiOkResponse({ description: "Delete vehicle by Id" })
  async deleteVehicle(@Param("id") id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
