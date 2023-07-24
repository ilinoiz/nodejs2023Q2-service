import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const user = this.usersService.getById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const result = this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.usersService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
