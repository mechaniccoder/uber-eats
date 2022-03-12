import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Category, CategoryModel } from './category.schema'

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: CategoryModel) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({})
  }
}
