import React, { Component } from 'react';
import Movie from './Movie';
import Banner from './Banner';
import './App.css';

class App extends Component {
  index = 0
  prevIndex = 0 

  state = {
      loading: true,
      movies: [],
      recommends: [],
  }
  getSimilarMovies = (movies) => {
    fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movies[this.index].id}`)
    .then(res => res.json())
    .then(result => {
        const {data: {movies: recommends}} = result
        console.log(`${movies[this.index].title} 와 유사한 영화 추천: `, recommends)
        this.setState({recommends})
    })
  }
  selectRandomIndex = (movies) => {
    return Math.floor(Math.random()*movies.length)
  }
  selectRandomMovie = () => {
    const { movies } = this.state 
    do{
      this.prevIndex = this.index 
      this.index = this.selectRandomIndex(movies)
    }while(this.prevIndex === this.index)

    this.getSimilarMovies(movies)
  }
 
  componentDidMount(){
    fetch('https://yts.mx/api/v2/list_movies.json?limit=30&minimum_rating=7&sort_by=title&order_by=asc')
    .then( res => res.json())
    .then( result => {
      const {data: {movies}} = result
      console.log(movies)
      this.setState({loading: false, movies})
      this.timerID = setInterval(this.selectRandomMovie, 3000)
      this.getSimilarMovies(movies)
    })
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }
  
  render(){
    const {loading, movies, recommends} = this.state
    
    if(loading){
      return (
        <div className='loading'>
          <h1>Loading ...</h1>
        </div>
      )
    }else{
      return (
        <>
          <Banner {...movies[this.index]} recommends={recommends}/>
          <div className='movies'>
            {movies.map(movie => {
              return (
                <Movie 
                  key={movie.id}
                  title={movie.title}
                  genres={movie.genres}
                  cover={movie.medium_cover_image}
                  summary={movie.summary}
                  rating={movie.rating}
                ></Movie>

              )
            })}
          </div>
        </>
      )
    }
  }
}

export default App;