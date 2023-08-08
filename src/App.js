import React from 'react';
import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';


const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => { 
                setImages(data.hits)
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, [term])


  return (
    <div className='container mx-auto'>
          <ImageSearch searchText={(text) => setTerm(text)} />
          {!isLoading && images.length === 0 && <h1 className='text-6xl mx-auto text-center'>Not Found</h1>}
          {isLoading ? <h1>Loading</h1> : <div className='grid md:grid-cols-3 sm:gap-5 md:gap-4 sm:justify-center md:justify-normal'>
              {images.map(image => {
                  return (<ImageCard key={image.id} image={image} />)
              })}
          </div> }
    </div>
  )
}

export default App
