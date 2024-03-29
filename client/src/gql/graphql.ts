/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AllCategoriesRes = {
  __typename?: 'AllCategoriesRes';
  data?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  restaurantsCount: Scalars['Int'];
  slug: Scalars['String'];
};

export type CategoryDto = {
  slug: Scalars['String'];
};

export type CategoryRes = {
  __typename?: 'CategoryRes';
  data?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateDishInput = {
  description?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['Int']>;
  restaurantId: Scalars['String'];
};

export type CreateDishRes = {
  __typename?: 'CreateDishRes';
  data?: Maybe<Dish>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderInput = {
  dishIds: Array<Scalars['String']>;
  restaurantId: Scalars['String'];
};

export type CreateOrderRes = {
  __typename?: 'CreateOrderRes';
  data?: Maybe<Order>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePaymentInput = {
  restaurantId: Scalars['String'];
  transactionId: Scalars['String'];
};

export type CreatePaymentRes = {
  __typename?: 'CreatePaymentRes';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantDto = {
  address: Scalars['String'];
  categoryName: Scalars['String'];
  img: Scalars['String'];
  name: Scalars['String'];
};

export type CreateRestaurantRes = {
  __typename?: 'CreateRestaurantRes';
  data?: Maybe<Restaurant>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateUserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateUserRes = {
  __typename?: 'CreateUserRes';
  data?: Maybe<UserWithoutPassword>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDishInput = {
  name: Scalars['String'];
  restaurantId: Scalars['String'];
};

export type DeleteDishRes = {
  __typename?: 'DeleteDishRes';
  data?: Maybe<Array<Dish>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteRestaurantDto = {
  id: Scalars['String'];
};

export type DeleteRestaurantRes = {
  __typename?: 'DeleteRestaurantRes';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Dish = {
  __typename?: 'Dish';
  description?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Scalars['String']>;
  price: Scalars['Int'];
};

export type DishInput = {
  description?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Scalars['String']>;
  price: Scalars['Int'];
};

export type EditRestaurantDto = {
  address?: InputMaybe<Scalars['String']>;
  categoryName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  img?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EditRestaurantRes = {
  __typename?: 'EditRestaurantRes';
  data?: Maybe<Restaurant>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrderRes = {
  __typename?: 'GetOrderRes';
  data?: Maybe<Order>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrdersInput = {
  status?: InputMaybe<OrderStatus>;
};

export type GetOrdersRes = {
  __typename?: 'GetOrdersRes';
  data?: Maybe<Array<Order>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetPaymentsRes = {
  __typename?: 'GetPaymentsRes';
  data: Array<Payment>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetRestaurantDto = {
  id: Scalars['String'];
};

export type GetRestaurantRes = {
  __typename?: 'GetRestaurantRes';
  data?: Maybe<Restaurant>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginRes = {
  __typename?: 'LoginRes';
  data?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type MeRes = {
  __typename?: 'MeRes';
  data?: Maybe<UserWithoutPassword>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDish: CreateDishRes;
  createOrder: CreateOrderRes;
  createPayment: CreatePaymentRes;
  createRestaurant: CreateRestaurantRes;
  createUser: CreateUserRes;
  deleteDish: DeleteDishRes;
  deleteRestaurant: DeleteRestaurantRes;
  editRestaurant: EditRestaurantRes;
  login: LoginRes;
  takeOrder: TakeOrderRes;
  updateOrder: UpdateOrderRes;
  updateProfile: UpdateProfileRes;
  verifyCode: VerifyCodRes;
};


export type MutationCreateDishArgs = {
  createDishInput: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateRestaurantArgs = {
  createRestaurantArgs: CreateRestaurantDto;
};


export type MutationCreateUserArgs = {
  createUserArgs: CreateUserDto;
};


export type MutationDeleteDishArgs = {
  deleteDishInput: DeleteDishInput;
};


export type MutationDeleteRestaurantArgs = {
  deleteRestaurantArgs: DeleteRestaurantDto;
};


export type MutationEditRestaurantArgs = {
  editRestaurantArgs: EditRestaurantDto;
};


export type MutationLoginArgs = {
  loginArgs: LoginDto;
};


export type MutationTakeOrderArgs = {
  takeOrderInput: TakeOrderInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileArgs: UpdateProfileDto;
};


export type MutationVerifyCodeArgs = {
  verifyCodeArgs: VerifyCodeDto;
};

export type Order = {
  __typename?: 'Order';
  customer: User;
  dishes: Array<Scalars['String']>;
  driver?: Maybe<User>;
  id: Scalars['String'];
  restaurant: Restaurant;
  status: OrderStatus;
  total: Scalars['Float'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp'
}

export type Payment = {
  __typename?: 'Payment';
  restaurantId: Scalars['String'];
  transactionId: Scalars['String'];
};

export type ProfileRes = {
  __typename?: 'ProfileRes';
  data?: Maybe<UserWithoutPassword>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: AllCategoriesRes;
  category: CategoryRes;
  getOrder: GetOrderRes;
  getOrders: GetOrdersRes;
  getPayments: GetPaymentsRes;
  getRestaurant: GetRestaurantRes;
  me: MeRes;
  profile: ProfileRes;
  restaurants: RestaurantsRes;
  searchRestaurants: SearchRestaurantsRes;
};


export type QueryCategoryArgs = {
  categoryArgs: CategoryDto;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrdersArgs = {
  getOrderInput: GetOrdersInput;
};


export type QueryGetRestaurantArgs = {
  getRestaurantInput: GetRestaurantDto;
};


export type QueryProfileArgs = {
  id: Scalars['String'];
};


export type QueryRestaurantsArgs = {
  restaurantsArgs?: InputMaybe<RestaurantsDto>;
};


export type QuerySearchRestaurantsArgs = {
  searchRestaurantsInput: SearchRestaurantsInput;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  category: Category;
  dishes: Array<Dish>;
  id: Scalars['String'];
  img: Scalars['String'];
  isPromoted: Scalars['Boolean'];
  name: Scalars['String'];
  owner: User;
  promotedUntil?: Maybe<Scalars['DateTime']>;
};

export type RestaurantsDto = {
  address?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  dishes?: InputMaybe<Array<DishInput>>;
  img?: InputMaybe<Scalars['String']>;
  isPromoted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  promotedUntil?: InputMaybe<Scalars['DateTime']>;
};

export type RestaurantsRes = {
  __typename?: 'RestaurantsRes';
  data?: Maybe<Array<Restaurant>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SearchRestaurantsInput = {
  query: Scalars['String'];
};

export type SearchRestaurantsRes = {
  __typename?: 'SearchRestaurantsRes';
  data?: Maybe<Array<Restaurant>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cookedOrders: Order;
  orderUpdated: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatedArgs = {
  orderId: Scalars['String'];
};

export type TakeOrderInput = {
  id: Scalars['String'];
};

export type TakeOrderRes = {
  __typename?: 'TakeOrderRes';
  data?: Maybe<Order>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateOrderInput = {
  id: Scalars['String'];
  status: OrderStatus;
};

export type UpdateOrderRes = {
  __typename?: 'UpdateOrderRes';
  data?: Maybe<Order>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateProfileDto = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileRes = {
  __typename?: 'UpdateProfileRes';
  data?: Maybe<UserWithoutPassword>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  password: Scalars['String'];
  payments: Array<Payment>;
  role: UserRole;
  verification: Verification;
};

export enum UserRole {
  Customer = 'customer',
  Delivery = 'delivery',
  Owner = 'owner'
}

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  email: Scalars['String'];
  id: Scalars['String'];
  payments: Array<Payment>;
  role: UserRole;
  verification: Verification;
};

export type Verification = {
  __typename?: 'Verification';
  code: Scalars['String'];
  isVerified: Scalars['Boolean'];
};

export type VerifyCodRes = {
  __typename?: 'VerifyCodRes';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type VerifyCodeDto = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  createUserDto: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserRes', ok: boolean, error?: string | null, data?: { __typename?: 'UserWithoutPassword', id: string, email: string, role: UserRole } | null } };

export type VerifyCodeMutationVariables = Exact<{
  verifyCodeDto: VerifyCodeDto;
}>;


export type VerifyCodeMutation = { __typename?: 'Mutation', verifyCode: { __typename?: 'VerifyCodRes', ok: boolean, error?: string | null, data?: boolean | null } };

export type LogInMutationVariables = Exact<{
  loginDto: LoginDto;
}>;


export type LogInMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', ok: boolean, error?: string | null, data?: string | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'MeRes', ok: boolean, error?: string | null, data?: { __typename?: 'UserWithoutPassword', id: string, email: string, role: UserRole, verification: { __typename?: 'Verification', isVerified: boolean }, payments: Array<{ __typename?: 'Payment', restaurantId: string }> } | null } };

export type GetRestaurantsQueryVariables = Exact<{
  input: RestaurantsDto;
}>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants: { __typename?: 'RestaurantsRes', ok: boolean, error?: string | null, data?: Array<{ __typename?: 'Restaurant', id: string, name: string, img: string, address: string, isPromoted: boolean, category: { __typename?: 'Category', id: string, name: string, slug: string, restaurantsCount: number }, owner: { __typename?: 'User', id: string, email: string }, dishes: Array<{ __typename?: 'Dish', name: string, price: number, options: Array<string> }> }> | null } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const VerifyCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyCodeDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCodeDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verifyCodeArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyCodeDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"verification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restaurantId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetRestaurantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRestaurants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestaurantsDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restaurants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"restaurantsArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"restaurantsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dishes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"options"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPromoted"}}]}}]}}]}}]} as unknown as DocumentNode<GetRestaurantsQuery, GetRestaurantsQueryVariables>;