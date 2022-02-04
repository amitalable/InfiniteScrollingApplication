import {useState, useRef, useCallback} from 'react';
import './App.css';
import { useSearchAPI } from "./hooks/useSearchAPI";

const App =()=> {
  const [pageNumber,setPageNumber] = useState(1);
  const {photos,loading,photoLimitReached} = useSearchAPI(pageNumber);

  const observer = useRef<IntersectionObserver>();
  
  const lastPhotoRef = useCallback(element =>{
    if(loading) return;
    if(observer.current){
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries=>{ 
      if(entries[0].isIntersecting && !photoLimitReached){
        setPageNumber(prevPageNumber=>prevPageNumber+1);
      }
    })
    if(element) observer.current.observe(element);
  },[loading,photoLimitReached])

  return (
    <div className="App">
      <h1> Welcome to Infinite Scrolling App Using TypeScript</h1>
      <div className='photos'>
        {photos.map((photo,index)=>{
          if(photos.length === index+1){
            return(
            <div ref ={lastPhotoRef} className='card' key={index}>
            <div className='title'>
            Title: {photo.title}
            </div>
            <div className='image'>
            <span>Image:</span> <img src={photo.thumbnailUrl} alt={photo.url}/>
            </div>
        </div>);
          }
          return(<div className='card' key={index}>
            <div className='title'>
            Title: {photo.title}
            </div>
            <div className='image'>
            <span>Image-{index+1}:</span> <img src={photo.thumbnailUrl} alt={photo.url}/>
            </div>
        </div>);
        })}
      </div>
      {loading && <h5>Loading...</h5>}
    </div>
  );
}

export default App;
