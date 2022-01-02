import { InputType, OmitType } from '@nestjs/graphql'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, [], InputType) {}
