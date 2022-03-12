import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CategoryNotFoundException } from './category.exception'
import { Category, CategoryModel } from './category.schema'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: CategoryModel) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({})
  }

  async findBySlug(categoryDto: CategoryDto): Promise<Category> {
    const aCategory = this.categoryModel.findOne(categoryDto)

    if (!aCategory) throw new CategoryNotFoundException()

    return aCategory
  }
}
