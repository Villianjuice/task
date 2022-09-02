import { useAppDispatch, useAppSelector } from '../../store/hook'
import { setCurrentPage, setSort } from '../../store/slices/params/params'
import './sort.scss'

export const Sort = () => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(state => state.params.sort)

  const spanClassName = sort === 'desc' ? 'desc' : ''

  const onToggleSort = () => {
    dispatch(setSort())
    dispatch(setCurrentPage(1))
  } 
  return (
    <button onClick={onToggleSort} className='sort'>Сортировка<span className={spanClassName}>⇡</span></button>
  )
}
