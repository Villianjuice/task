import {useState} from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri';

import { useAppDispatch } from '../../store/hook'
import { setSearch } from '../../store/slices/params/params'

import './search.scss'

export const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useAppDispatch()

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    dispatch(setSearch(e.target.value))
  }
  const onClearValue = () => {
    dispatch(setSearch(''))
    setSearchValue('')
  }
  return (
    <>
      <input className='search' type="text" placeholder='Поиск по коду ...' value={searchValue} onChange={onChangeValue}/>
      <button className='search__btn' onClick={onClearValue}>
        <RiDeleteBack2Line />
      </button>
    </>
  )
}
