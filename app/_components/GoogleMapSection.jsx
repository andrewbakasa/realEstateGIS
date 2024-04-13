import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';
import { list } from 'postcss';
import { Library } from 'lucide-react';
import Listing from './Listing';
import { toast } from 'sonner';
//import { cookies } from 'next/headers';
const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius:10
  };
  

function GoogleMapSection({coordinates,listing,highlightedId }) {
     
   
  let cent= {
    lat: 40.730610,
    lng: -73.935242
  }

  if (listing?.length > 0) {
    cent={
      lat:listing[0]?.lat,
      lng:listing[0]?.lng
    }
  }


  
  //if(coordinates){cent=coordinates}
  console.log(listing)
  const [center,setCenter]=useState(cent)
  /*useEffect(()=>{
    if (listing?.length > 0) {
      cent={
        lat:listing[0]?.lat,
        lng:listing[0]?.lng
      }
      setCenter(cent)
    }},[])
   */ 
  /*if (listing?.length > 0) {
    cent={
      lat:listing[0]?.lat,
      lng:listing[0]?.lng
    }
    setCenter(cent)
  }*/
    toast.message(`${coordinates?.lat}${listing[0]?.lat} ${cent?.lat?.toLocaleString}`)
  
    const [map, setMap] = useState(null)
    //   const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
    //   })
    useEffect(()=>{
      coordinates&&setCenter(coordinates)
    },[coordinates])
     
    useEffect(() => {
        if (map) {
          
            map.setZoom(10);
        }
    }, [map]);
      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
       
      }, [])
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
  return (
    <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={map=>setMap(map)}
        
        onUnmount={onUnmount}
        gestureHandling="greedy"
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {listing.map((item,index)=>(
            <MarkerItem
                key={index}
                item={item}
                highlightedId={highlightedId}
                setCenter={setCenter}
            />
        ))}
      </GoogleMap>
    </div>
  )
}

export default GoogleMapSection