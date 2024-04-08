import React from 'react'
import './Banner.css'

function Banner ({ large_cover_image, title, rating, runtime, genres, summary, recommends }){

    

    if(recommends.length > 0){
        return (
            <div className='banner-container'>
                <div className='banner-info'>
                    <img src={large_cover_image}/>
                    <div className='banner-details'>
                        <h1>{title}</h1>
                        <span>평점: {rating}</span>
                        <span>상영시간: {runtime}</span>
                        <span>장르: {genres.join(" ")}</span>
                        <p>{summary.length > 500 ? `${summary.slice(0, 500)}...` : summary}</p>
                        <div className='banner-recommends'>
                            {recommends && recommends.map(recommendedMovie => <img key={recommendedMovie.id} src={recommendedMovie.medium_cover_image}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        <div>상세정보 로딩...</div>
    }
    
}
export default Banner 