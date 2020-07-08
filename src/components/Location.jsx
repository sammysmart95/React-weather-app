import React, { useState, useEffect } from 'react'
import Animate from './Animate'
import Forecast from './Forecast'

const Location = ({ results, outcome }) => {


    const [todayForecast, setTodatForecast] = useState(null)
    const [state, setState] = useState(null)
    const [showForecast, setShowForecast] = useState({
        forecast: null,
        addClassName: false
    });


    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const dayBuilder = (d) => {
        let days = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thur",
            "Fri",
            "Sat",
        ];
        let dayName = days[d.getDay()];

        return dayName
    }

    useEffect(() => {
        let todayWeather = outcome?.list?.filter(data => new Date(data?.dt_txt).getDate() === new Date().getDate())
        setTodatForecast(todayWeather)

        let newArray = outcome?.list?.filter(data => new Date(data?.dt_txt).getDate() > new Date().getDate())
        if (Array.isArray(newArray)) {
            setState(chunkArrayInGroups(newArray, 8))
        }
    }, [outcome])

    const chunkArrayInGroups = (arr, size) => {
        let newArr = [];
        var i = 0;
        while (i < arr.length) {
            newArr.push(arr.slice(i, i + size));
            i += size;
        }
        return newArr;
    }

    // useEffect(() => {
    // }, [addClassName])

    const onShowForecast = (data, index) => {
        setShowForecast(prevState => ({
            ...prevState,
            forecast: data,
            addClassName: index
        }))
    };

    return (
        <section className='location-weather'>
            <div className="current-weather">
                <div className='location'>
                    <div className='location-name'>{results.name}, {results.sys.country}</div>
                    <div className='location-date'>{dateBuilder(new Date())}</div>
                </div>
                <div className='weather'>
                    <div className='temperature'>
                        <div className='temp'>
                            <Animate value={Math.round((results.main.temp) - 273)} />
                        </div>
                        <div className='celsius'>&#8451;</div>
                        {/* <div className='fahrenheit'>&#8457;</div> */}
                    </div>
                    <div className='weath'>{results.weather[0].main}</div>
                </div>
                <div className='others'>
                    <div className='details'>
                        <p className='text'>Feels Like <Animate value={Math.round((results.main.feels_like) - 273)} />&#176;</p>
                        <p className='text'>Humidity <Animate value={Math.round(results.main.humidity)} /> %</p>
                        <p className='text'>Wind <Animate value={Math.round(results.wind.speed)} /> kmph</p>
                    </div>
                    <div className='details'>
                        <p className='text'>Pressure <Animate value={Math.round(results.main.pressure)} /> mmhg</p>
                        <p className='text'>Visibility <Animate value={Math.round(results.visibility / 1000)} /> km</p>

                    </div>
                </div>
            </div>
            <div className="future-weather">
                <div className='future' >
                    {todayForecast && todayForecast.length ? (
                        <div className={`forcast ${showForecast.addClassName === todayForecast[0] ? "click" : null} `} onClick={() => onShowForecast(todayForecast, todayForecast[0])}  >
                            <div className={`days `} >
                                {/* {console.log(addClassName)} */}
                                <div >
                                    {dayBuilder(new Date(todayForecast[0].dt_txt))} {new Date(todayForecast[0].dt_txt).getDate()}
                                </div>
                                <div className='temp'>
                                    <p> <Animate value={Math.round((todayForecast[0].main.temp) - 273)} />&#176;</p>
                                    <p className='feels-like'> <Animate value={Math.round((todayForecast[0].main.feels_like) - 273)} />&#176;</p>
                                </div>
                                <div>
                                    {todayForecast[0].weather[0].main}
                                </div>
                            </div>
                        </div>
                    ) : (null)}
                    {state && state.length ? (
                        <div className='forecastD' >
                            {state.map((data, index) => (
                                <div key={index} className={`forcast ${showForecast.addClassName === index ? "click" : null}`} onClick={() => onShowForecast(data, index)}>
                                    <div className={`second `}>
                                        <div >
                                            {dayBuilder(new Date(data[0].dt_txt))} {new Date(data[0].dt_txt).getDate()}
                                        </div>
                                        <div className='temp'>
                                            <p> <Animate value={Math.round((data[0].main.temp) - 273)} />&#176;</p>
                                            <p className='feels-like'> <Animate value={Math.round((data[0].main.feels_like) - 273)} />&#176;</p>
                                        </div>
                                        <div>
                                            {data[0].weather[0].main}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (null)}
                </div>
                {/*========= Child forecast ======*/}
                <Forecast showForecast={showForecast} />
            </div>
        </section >
    )
}

export default Location;
