import { Model } from 'mongoose'

export type MockedModel<T = Model<any>> = Partial<Record<keyof T, jest.Mock>>
