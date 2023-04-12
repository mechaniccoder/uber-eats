/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation CreateUser($createUserDto: CreateUserDto!) {\n    createUser(createUserArgs: $createUserDto) {\n      ok\n      error\n      data {\n        id\n        email\n        role\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation VerifyCode($verifyCodeDto: VerifyCodeDto!) {\n    verifyCode(verifyCodeArgs: $verifyCodeDto) {\n      ok\n      error\n      data\n    }\n  }\n": types.VerifyCodeDocument,
    "\n  mutation LogIn($loginDto: LoginDto!) {\n    login(loginArgs: $loginDto) {\n      ok\n      error\n      data\n    }\n  }\n": types.LogInDocument,
    "\n  query GetMe {\n    me {\n      ok\n      error\n      data {\n        id\n        email\n        role\n        verification {\n          isVerified\n        }\n        payments {\n          restaurantId\n        }\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  query GetRestaurants($input: RestaurantsDto!) {\n    restaurants(restaurantsArgs: $input) {\n      ok\n      error\n      data {\n        id\n        name\n        img\n        address\n        category {\n            id\n            name\n            slug\n            restaurantsCount\n        }\n        owner {\n            id\n            email\n        }\n        dishes {\n            name\n            price\n            options\n        }\n        isPromoted\n      }\n    }\n  }\n": types.GetRestaurantsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($createUserDto: CreateUserDto!) {\n    createUser(createUserArgs: $createUserDto) {\n      ok\n      error\n      data {\n        id\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserDto: CreateUserDto!) {\n    createUser(createUserArgs: $createUserDto) {\n      ok\n      error\n      data {\n        id\n        email\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyCode($verifyCodeDto: VerifyCodeDto!) {\n    verifyCode(verifyCodeArgs: $verifyCodeDto) {\n      ok\n      error\n      data\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyCode($verifyCodeDto: VerifyCodeDto!) {\n    verifyCode(verifyCodeArgs: $verifyCodeDto) {\n      ok\n      error\n      data\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogIn($loginDto: LoginDto!) {\n    login(loginArgs: $loginDto) {\n      ok\n      error\n      data\n    }\n  }\n"): (typeof documents)["\n  mutation LogIn($loginDto: LoginDto!) {\n    login(loginArgs: $loginDto) {\n      ok\n      error\n      data\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    me {\n      ok\n      error\n      data {\n        id\n        email\n        role\n        verification {\n          isVerified\n        }\n        payments {\n          restaurantId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      ok\n      error\n      data {\n        id\n        email\n        role\n        verification {\n          isVerified\n        }\n        payments {\n          restaurantId\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRestaurants($input: RestaurantsDto!) {\n    restaurants(restaurantsArgs: $input) {\n      ok\n      error\n      data {\n        id\n        name\n        img\n        address\n        category {\n            id\n            name\n            slug\n            restaurantsCount\n        }\n        owner {\n            id\n            email\n        }\n        dishes {\n            name\n            price\n            options\n        }\n        isPromoted\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRestaurants($input: RestaurantsDto!) {\n    restaurants(restaurantsArgs: $input) {\n      ok\n      error\n      data {\n        id\n        name\n        img\n        address\n        category {\n            id\n            name\n            slug\n            restaurantsCount\n        }\n        owner {\n            id\n            email\n        }\n        dishes {\n            name\n            price\n            options\n        }\n        isPromoted\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;