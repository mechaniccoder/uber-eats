import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/user/schema/user.schema'
import { Category, CategoryModel } from './category/category.schema'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto'
import { EditRestaurantDto } from './dto/edit-restaurant.dto'
import { GetRestaurantDto } from './dto/get-restaurant.dto'
import { RestaurantsDto } from './dto/restaurants.dto'
import { SearchRestaurantsInput } from './dto/search-restaurants.dto'
import { RestaurantAuthorizedException, RestaurantNotFoundException } from './restaurant.exception'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: RestaurantModel,
    @InjectModel(Category.name) private categoryModel: CategoryModel,
  ) {}

  async create(authUser: User, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const categoryName = createRestaurantDto.categoryName.trim().toLowerCase()
    const categorySlug = categoryName.replace(/\s+/g, '-')

    const newRestaurant = new this.restaurantModel(createRestaurantDto)
    newRestaurant.owner = authUser

    const existingCategory = await this.categoryModel.findOne({ slug: categorySlug })
    if (existingCategory) {
      newRestaurant.category = existingCategory
    } else {
      const newCategory = await this.categoryModel.create({
        name: categoryName,
        slug: categorySlug,
      })
      newRestaurant.category = newCategory
    }

    await newRestaurant.save()

    return newRestaurant
  }

  async edit(authUser: User, editRestaurantDto: EditRestaurantDto): Promise<Restaurant> {
    const { id } = editRestaurantDto

    const aRestaurant = await this.restaurantModel.findById(id).populate('owner')

    if (!aRestaurant) throw new HttpException('Reataurant not existed', HttpStatus.BAD_REQUEST)

    if (aRestaurant.owner.id !== authUser.id) {
      throw new HttpException('Reataurant not authorized', HttpStatus.FORBIDDEN)
    }

    let category: Category = null

    if (editRestaurantDto.categoryName) {
      const categoryName = editRestaurantDto.categoryName.trim().toLowerCase()
      const categorySlug = categoryName.replace(/\s+/g, '-')

      const existingCategory = await this.categoryModel.findOne({ slug: categorySlug })
      if (existingCategory) {
        category = existingCategory
      } else {
        category = await this.categoryModel.create({ name: categoryName, slug: categorySlug })
      }
    }

    const editedRestaurant = await this.restaurantModel
      .findByIdAndUpdate(id, { ...editRestaurantDto, category: category.id }, { new: true })
      .populate('category')

    return editedRestaurant
  }

  async delete(owner: User, deleteRestaurantDto: DeleteRestaurantDto) {
    const { id: restaurantId } = deleteRestaurantDto

    const aRestaurant = await this.restaurantModel.findById(restaurantId).populate('owner')

    if (!aRestaurant) throw new RestaurantNotFoundException()

    if (aRestaurant.owner.id !== owner.id) throw new RestaurantAuthorizedException()

    await aRestaurant.delete()
  }

  async count(filter: Partial<Restaurant>): Promise<number> {
    return await this.restaurantModel.count(filter)
  }

  async find(restaurantsDto: RestaurantsDto): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel
      .find(restaurantsDto)
      .populate(['category', 'owner'])

    return restaurants
  }

  async get(getRestaurantInput: GetRestaurantDto): Promise<Restaurant> {
    const aRestaurant = await this.restaurantModel
      .findById(getRestaurantInput.id)
      .populate(['category'])
      .select('-owner')

    if (!aRestaurant) {
      throw new RestaurantNotFoundException()
    }

    return aRestaurant
  }

  async search(searchRestaurantsInput: SearchRestaurantsInput): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find(
      {
        name: new RegExp(searchRestaurantsInput.query, 'gi'),
      },
      'name',
    )
    return restaurants
  }
}
