import { useState, useEffect, useCallback } from "react";

function WeatherInfo(city) {
    const [data, setData] = useState(null);
    const apikey = '30174a46074d0d5fe20d8f36b9242dd3';
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
        try {
            fetch(url)
                .then((res) => {
                    if (res.status == 404) {
                        setData(null);
                        return null;
                    }
                    return res.json();
                })
                .then((res) => setData(res))
        } catch {
            error => {
                console.error('Error fetching data:', error);
                setData(null); // Handle other types of errors
            }
        };
    }, [city]);
    return data;
}

export default WeatherInfo;