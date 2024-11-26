import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  findAll(@Query('name') name?: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Validation Failed' })
  @Post()
  create(@Body() data: createUserDto): User {
    return this.usersService.create(data);
  }
}
