import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../..'

import { isError } from '../../hook'
import { ParamsState } from '../params/types'
import { DataObjects, IItemsState } from './types'

const initialState: IItemsState = {
  items: null,
  error: null,
  loading: false,
}

export const fetchItems = createAsyncThunk<DataObjects, ParamsState, { rejectValue: string }>(
  'items/fetchItems',
  async function (params, { rejectWithValue }) {
    const {itemsPerPage, sort, search, currentPage, model} = params

    const response = await fetch(`http://212.112.102.2:5666/api/orders/researches-with-prices?page=${currentPage}&size=${itemsPerPage}&sort[0].key=${model}&sort[0].value=${sort}&code=${search}`)

    if (!response.ok) {
      return rejectWithValue('Server error!') 
    }

    const data  = response.json() 

    return data
  },
)

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    unfetchItems(state) {
      state.items = null;
      state.error = null;
      state.loading = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const selectPageNumbers = createSelector(
  (state: RootState) => state.items.items?.count,
  (state: RootState) => state.params.itemsPerPage, 
  (count, size) => {
    const pages = [];

    if (count) {

      for (let i = 1; i <= Math.ceil(count / size); i++) {
        pages.push(i)
      }
    }

    
    return pages
  }
)

export const selectItems = (state: RootState) => state.items;

export const {unfetchItems} = itemsSlice.actions

export default itemsSlice.reducer
