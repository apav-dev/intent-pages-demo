import * as React from "react";
import GoogleMapReact from 'google-map-react';
import { useDocument } from "../hooks/useDocument";
import { MapPin } from "lucide-react";

const StaticMap = () => {
  const document = useDocument<any>();
  const { yextDisplayCoordinate, name, address } = document;

  const defaultProps = {
    center: {
      lat:  yextDisplayCoordinate.latitude ?? 39.8283,
      lng: yextDisplayCoordinate.longitude ?? -98.5795
    },
    zoom: 15
  };

  const MapMarker = () => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
      {address && 
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${name} ${address.line1} ${address.city} ${address.region} ${address.postalCode}`} target="_blank">
          <svg 
            className="mapPin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={'black'} 
          >
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </a>
      }
    </div>
  );


  return (
    <>
      {(yextDisplayCoordinate && YEXT_PUBLIC_MAPS_API_KEY) &&
        <div className="mt-20 space-y-6">
          <div style={{ height: '500px', width: '100%'}} >
            <GoogleMapReact
              bootstrapURLKeys={{ key: `${YEXT_PUBLIC_MAPS_API_KEY}` }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <MapMarker/>
            </GoogleMapReact>
          </div>
        </div>
      }
    </>
  );
};

export default StaticMap;