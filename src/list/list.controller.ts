import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserInfo } from 'src/util/user-info.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FindListDto } from './dto/find-list.dto';
import { MemberGuard } from 'src/auth/guards/member-auth.guard';

@UseGuards(JwtAuthGuard)
@UseGuards(MemberGuard)
@ApiTags('list')
@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  /**
   * 리스트 생성
   * @param createListDto
   * @returns
   */
  @Post('')
  async createList(
    @UserInfo() user: User,
    @Body() createListDto: CreateListDto,
  ) {
    return await this.listService.createList(user, createListDto);
  }

  /**
   * 리스트 조회
   * @param findListDto
   * @returns
   */
  @Get('')
  async findAllList(@UserInfo() user: User, @Query() findListDto: FindListDto) {
    return this.listService.findAllList(user, findListDto);
  }

  /**
   * 리스트 순서 변경
   * @param updateOrderDto
   * @returns
   */
  @Patch('listOrders')
  async updateListOrder(
    @UserInfo() user: User,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.listService.updateListOrder(user, updateOrderDto);
  }

  /**
   * 리스트 이름 수정
   * @param createListDto
   * @returns
   */
  @Patch(':id')
  async updateList(
    @Param('id') id: string,
    @UserInfo() user: User,
    @Body() createListDto: CreateListDto,
  ) {
    return await this.listService.updateList(+id, user, createListDto);
  }

  /**
   * 리스트 삭제
   * @returns
   */
  @Delete(':id')
  async removeList(@Param('id') id: string, @UserInfo() user: User) {
    return await this.listService.removeList(+id, user);
  }
}
