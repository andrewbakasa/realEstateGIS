import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MarkerListingItem from './MarkerListingItem';

function MarkerItem({item,highlightedId, setCenter}) {
    const [selectedListing,setSelectedListing]=useState();
    if (highlightedId==item.id){
      setCenter(item.coordinates)
   }
  return (
    <div>
        <MarkerF
            position={item.coordinates}
            onClick={()=>setSelectedListing(item)}
            icon={{
                url:highlightedId === item.id ? "/home-color.svg" : "/home-solid.svg",
                scaledSize:{
                    width:30,
                    height:30
                }
            }}
            // className={highlightedId === item.id ? "marker-active" : ""}
        >
          {selectedListing &&  <OverlayView
            position={selectedListing.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div>
                    <MarkerListingItem 
                    closeHandler={()=>setSelectedListing(null)}
                    item={selectedListing} />
                </div>

            </OverlayView>}

        </MarkerF>
    </div>
  )
}

export default MarkerItem