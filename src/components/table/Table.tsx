import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { setCurrentPage, setModel } from '../../store/slices/params/params'
import {DataObject} from '../../types/types'
import { Pagination } from '../pagination/Pagination'

import './table.scss'

type TableProps = {
  items: DataObject[]
}

const models = [
  {
    name: 'Код',
    article: 'code'
  },
  {
    name: 'Исследования',
    article: 'name'
  },
  {
    name: 'Биомат.',
    article: 'biomaterialName'
  },
  {
    name: 'Стоимость',
    article: 'price'
  },
  {
    name: 'Валюта',
    article: 'currencyName'
  },
]

export const Table: React.FC <TableProps> = ({items}) => {
  const dispatch = useAppDispatch()

  const itemsCount = useAppSelector(state => state.items.items?.count)

  const onChangeModel = (name: string) => {
    dispatch(setModel(name))
    dispatch(setCurrentPage(1))
  }

  return (
    <table className='table'>
      <thead className='table__head'>
        <tr>
          {models.map(model => 
            <th className={`table__width-${model.article}`} onClick={() => onChangeModel(model.article)} key={model.article}>{model.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => 
          <tr key={i}>
            <td className='table__width-code'>{item.code}</td>
            <td className='table__width-name'>{item.name}</td>
            <td className='table__width-biom'>{item.biomaterialName}</td>
            <td>{item.price}</td>
            <td>{item.currencyName}</td>
          </tr>  
        )}
      </tbody>
      {itemsCount ? 
        (<tbody  className='table__pagination'>
          <tr>
            <td colSpan={5}>
              <Pagination />
            </td>
          </tr>
        </tbody>) : ('')
      }

      
    </table>
  )
}
