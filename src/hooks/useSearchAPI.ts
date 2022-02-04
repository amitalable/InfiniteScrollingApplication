import { useEffect, useState } from "react";
import Axios  from "axios";

type Photo ={
  "albumId": number,
  "id": number,
  "title": string,
  "url": string,
  "thumbnailUrl": string 
}

const useSearchAPI = (pageNumber: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] =  useState(false);
  const [photoLimitReached, setIsPhotoLimitReached] = useState(false);
  useEffect(()=>{
    setLoading(true);
    Axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=10`)
    .then(res=>{
      const data = [...photos,...res.data];
      setPhotos(data);
      setIsPhotoLimitReached(data.length=== 50);
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  },[pageNumber,photos])

  return {photos,loading, photoLimitReached};
};

export {useSearchAPI};
