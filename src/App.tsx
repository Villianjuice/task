import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hook';
import { fetchItems, selectItems, unfetchItems } from './store/slices/items/items';

import './scss/App.scss'
import { Params, Table } from './components';

function App() {
  const dispatch = useAppDispatch()
  const {items, error, loading} = useAppSelector(selectItems)
  const {itemsPerPage, search, sort, currentPage, model} = useAppSelector(state => state.params)

  useEffect(() => {
    dispatch(fetchItems({itemsPerPage, search, sort, currentPage, model}))
    return () => {
      dispatch(unfetchItems())
    }
  }, [dispatch, itemsPerPage, search, sort, currentPage, model])
  
  return (
    <div className="App">
      <Params />
      {items && 
          <Table items={items.dataObjects} /> 
      }
      {loading && <h2>Loading ...</h2>}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default App;
