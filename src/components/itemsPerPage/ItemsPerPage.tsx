import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { setItemsPerPage } from '../../store/slices/params/params'

import './itemsPerPage.scss'

export const ItemsPerPage = () => {
  const sizes = [30, 40, 50]

  const defaultValue = useAppSelector(state => state.params.itemsPerPage)

  const dispatch = useAppDispatch()

  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPage(e.target.value))
  }
  return (
    <select defaultValue={defaultValue} onChange={onChangeOption} className='select'>
      {sizes.map(size => 
        <option key={size} value={size}>{size}</option>  
      )}
    </select>
  )
}
