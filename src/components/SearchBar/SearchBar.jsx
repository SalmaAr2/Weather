import styles from './SearchBar.module.scss'
import {Autocomplete, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {resetData, setData} from "../../features/weather/WeatherSlice";
import PositionSvg from "../Svgs/PositionSvg";

//npm install @mui/material @emotion/react @emotion/styled : Pour installer les dépendances nécessaires à l'utilisation de Material-UI (MUI) avec Emotion pour le stylisme 

export const SearchBar = () => {
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    const dispatch = useDispatch()
    const [cities, setCities] = useState([])//stocker les valeurs
    const [unity] = useState('metric')//unité
    const [geoLocation, setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setIsCurrentLocation] = useState(false)
    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setIsCurrentLocation(true)
            setGeoLocation({
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            })
        })
    }
    useEffect(() => {
        getGeoLocation()
    }, []);
    useEffect(() => {
        getData()
    }, [geoLocation]);

    const handleInputChange = (e) => { //quand j ecris sur search si j ecris C ca donne casablanca
        const {value} = e.currentTarget
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
            .then(response => response.json())
            .then(json => setCities(json.results?.map(data => {
                const {lat, lon, city, country, formatted} = data
                return {lat, lon, city, country, formatted}
            })))
    }
    const getData = () => {
        if (geoLocation) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    const {clouds, main, name, sys, weather, wind} = json
                    dispatch(setData({clouds, main, name, sys, weather, wind}))
                })
        }
    }
    const handleAutocompleteSelect = (e, value) => {
        if (value !== null) { //si on click sur x(close)
            const {lon, lat} = value
            setIsCurrentLocation(false)
            setGeoLocation({
                lon,
                lat,
            })

        } else {
            dispatch(resetData())
        }

    }
    return (
        <>
            <div
                className={styles.searchContainer}>
                <Autocomplete className={styles.searchInput}
                              clearOnBlur={false}
                              onChange={handleAutocompleteSelect}
                              getOptionLabel={(option) => option.formatted}
                              renderInput={(params) =>
                                  <TextField onChange={handleInputChange} {...params}
                                             label={'Enter your city ...'}/>}
                              options={cities || []}/>

                <Button disabled={geoLocation === undefined || isCurrentLocation === true} variant="contained"
                        onClick={() => getGeoLocation()}><PositionSvg color={'#fff'}/></Button>
            </div>
        </>
    )
}