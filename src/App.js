import React, { useState } from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "d2283662ab9b692fc4f461a95c137ff2"

const App = () => {
    const [weather, setWeather] = useState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    })
    const getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city && country) {
            setWeather({
                temperature: data.list[0].main.temp,
                city: data.list[0].name,
                country: data.list[0].sys.country,
                humidity: data.list[0].main.humidity,
                description: data.list[0].weather[0].description,
                error: ""
            })
        } else {
            setWeather({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter a valid city and country."
            })
        }
    }
    return (
        <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col title-container">
                                <Titles />
                            </div>
                            <div className="col form-container">
                                <Form getWeather={getWeather} />
                                <Weather
                                    temperature={weather.temperature}
                                    city={weather.city}
                                    country={weather.country}
                                    humidity={weather.humidity}
                                    description={weather.description}
                                    error={weather.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

