import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './slices/items/items'
import paramsSlice from './slices/params/params'


const store = configureStore({
  reducer: {
    items: itemsSlice,
    params: paramsSlice
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
