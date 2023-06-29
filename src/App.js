import React from 'react';
import {Collection} from './Collection';
import './index.scss';
const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [category, setCategory] = React.useState(0)
  const [isLoading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(0)
  const [collections, setCollections] = React.useState([])
  React.useEffect(() => {
    const cat = category ? `category=${category}` : ' '
    setLoading(true)
    fetch(`https://649c32ab048075719237abfb.mockapi.io/photos/photos?page=${page}&limit=3&${cat}`)
    .then(res => res.json())
    .then(json => {
      setCollections(json);
    })
    .catch(err => {
      console.warn(err);
      alert("Ошибка при получении фотографий");
    })
    .finally(setLoading(false))
  }, [category, page])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => 
          <li 
          onClick={()=>setCategory(i)}
          className={category === i ? 'active': ''} 
          key={obj.name}>{obj.name}</li>)}
        </ul>
        <input value={search} onChange={e => setSearch(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? <h2>Content is loading</h2> : 
          collections.filter(obj => obj.name.toLowerCase().includes(search.toLowerCase()))
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))
        }
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => <li onClick={() => setPage(i+1)} className={page === i+1 ? 'active':''}>{i+1}</li>)}
      </ul>
    </div>
  );
}

export default App;
