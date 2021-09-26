import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { fetchEvent, fetchRestRooms, fetchCountryInfo } from "../API/fetch-data"
import GoogleMapReact from 'google-map-react';
import toilet from "../assets/toilet.png"

const Marker = ({ text }) => {
    return <img src={toilet} alt="toilet" />
};

function ContentPage(props) {
    const [event, setEvent] = useState({})
    const [restRoom, setRestRoom] = useState([])
    const [countryInfo, setCountryInfo] = useState({})
    const [showInfo, setShowInfo] = useState(false)
    const [showRestRooms, setShowRestRooms] = useState(false)
    // eslint-disable-next-line
    const [map, setMap] = useState({
        center: {
            lat: 40.72481399999999,
            lng: -73.9446679
        },
        zoom: 11
    })
    const params = queryString.parse(window.location.search)
    useEffect(() => {
        (async () => {
            try {
                setEvent(await fetchEvent(params.id))
                setRestRoom(await fetchRestRooms())
            }
            catch (e) {
                console.log(e.message)
            }
        })()
    }, [params.id])

    useEffect(() => {
        (async () => {
            try {
                setCountryInfo(await fetchCountryInfo(event?.venue?.country))
            }
            catch (e) {
                console.log(e.message)
            }
        })()
    }, [event])

    const getMapOptions = (maps) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };

    return (
        <div>
            {
                Object.keys(event).length === 0 && event.constructor === Object ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        <div className="map h-60 w-full">
                            <img className="w-full h-full object-cover"  src={event.performers[0].image} alt="bg" />
                        </div>
                        <div className="info">
                            <h1 className="text-2xl ml-4 mt-6 mb-3">{event.title}</h1>
                            <div className="mb-3 ml-4">
                                <h1 className="text-lg font-bold">performers</h1>
                                {
                                    event.performers.map(({ name }, i) => {
                                        return !i ? <span key={i} className="font-medium text-sm">{name},</span> : <span key={i} className="font-medium text-sm">{name}</span>
                                    })
                                }
                            </div>
                            <div className="mb-3 ml-4">
                                <h1 className="text-lg font-bold">Type</h1>
                                <p className="font-medium text-sm">concert</p>
                            </div>
                            <div className="mb-3 ml-4">
                                <h1 className="text-lg font-bold">Ticket price</h1>
                                <p className="font-medium text-sm">${event.stats.median_price}</p>
                            </div>
                            <div className="mb-3 ml-4">
                                <h1 className="text-lg font-bold">Address</h1>
                                <p className="font-medium text-sm"><span>{event.venue.address}</span>,<span>{event.venue.city}</span>,<span>{event.venue.country}</span></p>
                            </div>
                            <div className="mb-3 ml-4">
                                <button onClick={(e) => {
                                    setShowRestRooms(!showRestRooms)
                                    setShowInfo(false)
                                }} className="btns cursor-pointer mr-2 text-sm px-2 py-1 rounded-full border">Restrooms</button>
                                <button onClick={(e) => {
                                    setShowInfo(!showInfo)
                                    setShowRestRooms(false)
                                }} className="btns cursor-pointer text-sm px-2 py-1 rounded-full border">Know more about country</button>
                            </div>
                            {
                                //    Object.keys(countryInfo).length === 0 && countryInfo.constructor === Object && (
                                 showInfo && (
                                    <div className="info-card p-6 w-_80 mx-auto rounded-lg ">
                                        <p className="mb-3">{countryInfo?.names.full}</p>
                                        <p className="text-sm font-medium">{countryInfo?.currency.name}</p>
                                        <p className="text-sm font-medium"><span>{countryInfo?.currency.symbol}</span><span>{countryInfo?.currency.code}</span></p>
                                        <p className="text-sm font-medium">Language: {countryInfo?.language[0].language}</p>
                                        <div className="mt-3">
                                            <p className="text-sm font-medium">calling code: <span>+{countryInfo?.telephone.calling_code}</span></p>
                                            <p className="text-sm font-medium">Ambulance: <span>{countryInfo?.telephone.ambulance}</span></p>
                                            <p className="text-sm font-medium">Police: <span>{countryInfo?.telephone.police}</span></p>
                                            <p className="text-sm font-medium">Fire: <span>{countryInfo?.telephone.fire}</span></p>
                                        </div>
                                        <p className="text-sm font-medium">{countryInfo?.timezone.name}</p>
                                    </div>
                                )
                                //    )
                            }
                            {
                                //    Object.keys(countryInfo).length === 0 && countryInfo.constructor === Object && (
                                    showRestRooms && (
                                    <div className="info-card  w-_80 h-56 mx-auto rounded-lg ">
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                                            defaultCenter={map.center}
                                            defaultZoom={map.zoom}
                                            options={getMapOptions}
                                        >
                                            {
                                                restRoom.length && (
                                                    restRoom.map(({ latitude, longitude },i) => {
                                                        return (
                                                            <Marker
                                                                key={i}
                                                                lat={latitude}
                                                                lng={longitude}
                                                            />
                                                        )
                                                    })
                                                )
                                            }
                                        </GoogleMapReact>
                                    </div>
                                )
                                //    )
                            }
                            <div className="w-40 h-12 mt-10 mx-auto bg-yellow-500 rounded-lg mb-8 text-white">
                                <a className="w-full h-full flex items-center justify-center" href={event.venue.url}>Buy ticket</a>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ContentPage;