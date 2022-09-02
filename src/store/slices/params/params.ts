import { createSlice } from '@reduxjs/toolkit'
import { ParamsState } from './types'

const initialState: ParamsState = {
  itemsPerPage: 30,
  sort: 'desc',
  search: '',
  currentPage: 1,
  model: 'price'
}

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setSort(state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc'
    },
    setModel(state, action) {
      state.model = action.payload
    },
    setIncPage(state) {
      state.currentPage ++
    },
    setDecPage(state) {
      state.currentPage --
    }
  }
})

export const {setCurrentPage, setItemsPerPage, setSearch, setSort, setModel, setIncPage, setDecPage} = paramsSlice.actions

export default paramsSlice.reducer
