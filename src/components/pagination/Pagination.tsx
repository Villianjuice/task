import {useMemo} from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { selectPageNumbers } from '../../store/slices/items/items';
import { setCurrentPage, setDecPage, setIncPage } from '../../store/slices/params/params';
import { ItemsPerPage } from '../itemsPerPage/ItemsPerPage';

import './pagination.scss'

export const Pagination = () => {
  const pages = useAppSelector(selectPageNumbers)
  const {currentPage} = useAppSelector(state => state.params)
  const count = useAppSelector(state => state.items.items?.count)

  const dispatch = useAppDispatch()

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const activePageClass = (page: number) => {
    return currentPage === page ? 'pagination__btn-active' : 'pagination__btn'
  }
  

  const pagesMax =  useMemo(() => {
    return Math.max(...pages)
  }, [pages]) 

  const onIncPage = () => {
    if (currentPage < pagesMax) {
      dispatch(setIncPage())
    }
  }

  const onDecPage = () => {
    if (currentPage > 1) {
      dispatch(setDecPage())
    }
  }
  
    return (
    <div className='pagination'>
      <span>{`Page ${currentPage} of ${pagesMax} (${count} items)`}</span>
      <ItemsPerPage />
     
        <IconContext.Provider
          value={{ color: 'grey', size: '14px'  }} >
          <button  onClick={onDecPage}><BsArrowLeftSquare style={{ margin: '3px 8px 0' }}/></button>
          <ul >
            {pages.map(page => 
              <li key={page}>
                <button className={activePageClass(page)} onClick={() => onChangePage(page)}>{page}</button>  
              </li>  
            )}
            </ul>
          <button onClick={onIncPage}><BsArrowRightSquare style={{ margin: '3px 8px 0' }} /></button>
      </IconContext.Provider>
        

      
    </div>
  )
}
