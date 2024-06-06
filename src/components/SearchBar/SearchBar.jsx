import styles from './SearchBar.module.scss'
import {Autocomplete, Button, TextField, CircularProgress} from "@mui/material";
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
    const [loading, setLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState(null); // État pour les erreurs

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setIsCurrentLocation(true)
            setGeoLocation({
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            })
        }, (error) => {
            setError('Impossible d\'obtenir la géolocalisation. Veuillez vérifier les permissions.');
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
        if (value.length > 0) { // Valider que le champ de recherche n'est pas vide
            setLoading(true);
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des données géographiques.');
                    }
                    return response.json();
                })
                .then(json => setCities(json.results?.map(data => {
                    const {lat, lon, city, country, formatted} = data
                    return {lat, lon, city, country, formatted}
                })))
                .catch(error => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    const getData = () => {
        if (geoLocation) {
            setLoading(true);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des données météorologiques.');
                    }
                    return response.json();
                })
                .then(json => {
                    const {clouds, main, name, sys, weather, wind} = json
                    dispatch(setData({clouds, main, name, sys, weather, wind}))
                })
                .catch(error => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
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
            <div className={styles.searchContainer}>
                {error && <div className={styles.error}>{error}</div>}
                <Autocomplete className={styles.searchInput}
                              clearOnBlur={false}
                              onChange={handleAutocompleteSelect}
                              getOptionLabel={(option) => option.formatted}
                              renderInput={(params) =>
                                  <TextField onChange={handleInputChange} {...params}
                                             label={'Enter your city ...'}
                                             disabled={loading}/>}
                              options={cities || []}/>
                <Button disabled={geoLocation === undefined || isCurrentLocation === true || loading} variant="contained"
                        onClick={() => getGeoLocation()}>
                    {loading ? <CircularProgress size={24} color="inherit"/> : <PositionSvg color={'#fff'}/>}
                </Button>
            </div>
        </>
    )
}
