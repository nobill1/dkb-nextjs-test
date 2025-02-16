import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Head from 'next/head'
import Header from '../Components/Header'
import { useEffect, useState } from 'react'
import { moviesApi } from '../services/api'
import IMovie from '../types/IMovie'
import Category from '../Components/Category'
import SearchResult from './SearchResult'
import MovieCard from '../Components/MovieCard'

const Home: NextPage = () => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [results, setResults] = useState<IMovie[]>([]);

  useEffect(() => {
    setLoading(true);
    moviesApi.then((res) => {
      const movies = res.data.movies;
      setMovies(movies)
      let arr: string[] = []
      movies.map((movie: any) => {
        movie.genres.map((e: string) => arr.push(e)) // get all movies categories from movies list
      })
      setCategories(Array.from(new Set(arr))); // remove repeating movie categories from movie list
      setLoading(false)
    }).catch(error => console.log(error)
    )
  }, [])

function categoryFilter(category: string) {
  let categoryArray: IMovie[] = []
  movies.map(movie => {
    if (movie.genres.includes(category)) {
      categoryArray.push(movie) // going through movies if movie has category name, stores movie to category
    }
  })
  return categoryArray;
}

return (
  <div className="bg-[#acacac]">
    <Head>
      <title>Wookie Movies</title>
    </Head>
    <Header setsearchTerm={setsearchTerm} setResults={setResults} setLoading={setLoading} />    
    {
      loading ? <div className="h-screen w-screen flex justify-center items-center pt-20">
        <svg className="h-10 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.22 53">
          <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
            <path d="M31,26.37,6.56,24.12,26.35,38.59l-.47,1.24L0,37.24l.42-1.11,24.21,2.55L4.91,24.24l.49-1.31,24.37,2.24L9.89,11l.42-1.11L31.46,25.06Z" />
            <path d="M41.41,19.65a8.31,8.31,0,0,1-3.39.7,7.65,7.65,0,0,1-3.22-.76A9.11,9.11,0,0,1,32,17.48,11.73,11.73,0,0,1,30,14.18,11.26,11.26,0,0,1,29,10.41,8.81,8.81,0,0,1,29.44,7a7.63,7.63,0,0,1,1.69-2.83,8.37,8.37,0,0,1,2.85-2,8.49,8.49,0,0,1,3.4-.7,7.7,7.7,0,0,1,3.2.75,8.93,8.93,0,0,1,2.77,2.07A11.51,11.51,0,0,1,45.41,7.6a11.52,11.52,0,0,1,.94,3.78,8.82,8.82,0,0,1-.41,3.47,7.52,7.52,0,0,1-1.68,2.84A8.23,8.23,0,0,1,41.41,19.65Zm-.39-.9a6.66,6.66,0,0,0,3-2.44,7.27,7.27,0,0,0,1.18-3.76,10.37,10.37,0,0,0-.9-4.48,10,10,0,0,0-2.6-3.73,7.25,7.25,0,0,0-3.5-1.72,6.71,6.71,0,0,0-3.85.47,6.78,6.78,0,0,0-3,2.44,7.49,7.49,0,0,0-1.19,3.73,9.88,9.88,0,0,0,.89,4.45,10.12,10.12,0,0,0,2.6,3.76,7.23,7.23,0,0,0,3.53,1.75A6.6,6.6,0,0,0,41,18.75Z" />
            <path d="M56.31,18.63a8.45,8.45,0,0,1-3.1-1.55,7.63,7.63,0,0,1-2.05-2.59,9,9,0,0,1-.88-3.37,11.71,11.71,0,0,1,.41-3.88,11.48,11.48,0,0,1,1.6-3.54,8.71,8.71,0,0,1,2.45-2.43A7.68,7.68,0,0,1,57.82.09a8.78,8.78,0,0,1,6.55,1.78,7.52,7.52,0,0,1,2.06,2.56,9,9,0,0,1,.89,3.35,11.42,11.42,0,0,1-.41,3.86,11.65,11.65,0,0,1-1.6,3.55,9.18,9.18,0,0,1-2.46,2.47,7.57,7.57,0,0,1-3.08,1.2A8.38,8.38,0,0,1,56.31,18.63Zm.26-.95a6.65,6.65,0,0,0,3.88-.05,7.33,7.33,0,0,0,3.24-2.22,10.07,10.07,0,0,0,2.07-4.09A9.87,9.87,0,0,0,66,6.79a7.29,7.29,0,0,0-1.69-3.52,7,7,0,0,0-7.2-1.95A7.32,7.32,0,0,0,53.9,3.5a10.2,10.2,0,0,0-2.06,4.05,10.32,10.32,0,0,0-.27,4.57,7.29,7.29,0,0,0,1.68,3.56A6.6,6.6,0,0,0,56.57,17.68Z" />
            <path d="M65.5,22.66l-.77-.91L84,5.61l.76.91L72.68,16.64l13.25,1.91,1,1.15L73.45,17.78,73.32,32l-1.06-1.26.1-13.83Z" />
            <path d="M72.61,34.26l-.35-1.13,17.46-5.49.36,1.13ZM94.34,28.2a1.34,1.34,0,0,1-1.59-1.88,1.25,1.25,0,0,1,.79-.65,1.19,1.19,0,0,1,1,.09,1.49,1.49,0,0,1,.58,1.82A1.22,1.22,0,0,1,94.34,28.2Z" />
            <path d="M72.88,43.89a7.63,7.63,0,0,1,1.78-4.1,8,8,0,0,1,3.77-2.41,12,12,0,0,1,5.2-.33,10.33,10.33,0,0,1,4.58,1.68A8.38,8.38,0,0,1,91.11,42a7.15,7.15,0,0,1,.66,4.25,7.5,7.5,0,0,1-1.14,3.21,7.11,7.11,0,0,1-2.31,2.22,9,9,0,0,1-3.27,1.17,12.35,12.35,0,0,1-4-.07L83.1,37.54l1,.13-1.91,14a9.24,9.24,0,0,0,6-1.16,5.89,5.89,0,0,0,2.68-4.42,6.07,6.07,0,0,0-.58-3.66,7.19,7.19,0,0,0-2.56-2.82,9.67,9.67,0,0,0-4.15-1.46,11.54,11.54,0,0,0-4.71.22,6.86,6.86,0,0,0-3.36,2A6.55,6.55,0,0,0,73.85,44a6.66,6.66,0,0,0,.88,4.62,6.59,6.59,0,0,0,3.74,2.75l-.15,1.15a7.63,7.63,0,0,1-5.44-8.65Z" />
          </g>
          </g></svg>
      </div> : (searchTerm.length > 0) ? <div className="customHeight container mx-auto pt-20 px-4 min-h-screen pb-28"><SearchResult results={results} setsearchTerm={setsearchTerm} searchTerm={searchTerm} setResults={setResults} /></div> :
        <div className="customHeight pt-20 container mx-auto px-4">
          {categories.map(e => {
            let categoryMovies = categoryFilter(e);

            return <Category categoryMovies={categoryMovies} key={e} name={e} />
          })}
        </div>
    }
  </div>
)
}

export default Home