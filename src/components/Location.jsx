import React, { useState, useEffect } from 'react'

import Animate from './Animate'

const Location = ({ results, outcome, setShowIndex, showIndex }) => {


    const [todayForecast, setTodatForecast] = useState(null)
    const [state, setState] = useState(null)


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
            // console.log(chunkArrayInGroups(newArray, 8));
        }
    }, [outcome])

    useEffect(() => {
        console.log(state)
    }, [state])

    const chunkArrayInGroups = (arr, size) => {
        let newArr = [];
        var i = 0;
        while (i < arr.length) {
            newArr.push(arr.slice(i, i + size));
            i += size;
        }
        return newArr;
    }



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
                <div className='future'>
                    <div className='forcast' >
                        {todayForecast && todayForecast.length ? (
                            <div className='days'>
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
                        ) : (false)}
                    </div>
                    {state && state.length ? (
                        <div className='forecastD'>
                            <div className='forcast'>
                                <div className='second'>
                                    <div >
                                        {dayBuilder(new Date(state[0][0].dt_txt))} {new Date(state[0][0].dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((state[0][0].main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((state[0][0].main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {state[0][0].weather[0].main}
                                    </div>

                                </div>
                            </div>
                            <div className='forcast'>
                                <div className='third'>
                                    <div >
                                        {dayBuilder(new Date(state[1][0].dt_txt))} {new Date(state[1][0].dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((state[1][0].main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((state[1][0].main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {state[1][0].weather[0].main}
                                    </div>
                                </div>
                            </div>
                            <div className='forcast'>
                                <div className='forth'>
                                    <div >
                                        {dayBuilder(new Date(state[2][0].dt_txt))} {new Date(state[2][0].dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((state[2][0].main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((state[2][0].main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {state[2][0].weather[0].main}
                                    </div>
                                </div>
                            </div>
                            <div className='forcast'>
                                <div className='fifth'>
                                    <div >
                                        {dayBuilder(new Date(state[3][0].dt_txt))} {new Date(state[3][0].dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((state[3][0].main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((state[3][0].main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {state[3][0].weather[0].main}
                                    </div>
                                </div>
                            </div>
                            <div className='forcast'>
                                <div className='sixth'>
                                    <div >
                                        {dayBuilder(new Date(state[4][0].dt_txt))} {new Date(state[4][0].dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((state[4][0].main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((state[4][0].main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {state[4][0].weather[0].main}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (false)}
                </div>
                {/*========= Childern forecast ======*/}
                {todayForecast && todayForecast.length ? (
                    <div className={`otherD `}>
                        {todayForecast.map((data, i) => (
                            <div key={i} className='first'>
                                <div >
                                    {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                </div>
                                <div className='temp'>
                                    <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                    <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                </div>
                                <div>
                                    {data.weather[0].main}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (false)}
                {state && state.length ? (
                    <div>
                        <div className='forecast2'>
                            {state[0].map((data, index) => (
                                <div key={index} className='second'>
                                    <div >
                                        {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {data.weather[0].main}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='forecast3'>
                            {state[1].map((data, index) => (
                                <div key={index} className='third'>
                                    <div >
                                        {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {data.weather[0].main}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='forecast4'>
                            {state[2].map((data, index) => (
                                <div key={index} className='forth'>
                                    <div >
                                        {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {data.weather[0].main}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='forecast5'>
                            {state[3].map((data, index) => (
                                <div key={index} className='fifth'>
                                    <div >
                                        {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {data.weather[0].main}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='forecast6'>
                            {state[4].map((data, index) => (
                                <div key={index} className='sixth'>
                                    <div >
                                        {dayBuilder(new Date(data.dt_txt))} {new Date(data.dt_txt).getDate()}
                                    </div>
                                    <div className='temp'>
                                        <p> <Animate value={Math.round((data.main.temp) - 273)} />&#176;</p>
                                        <p className='feels-like'> <Animate value={Math.round((data.main.feels_like) - 273)} />&#176;</p>
                                    </div>
                                    <div>
                                        {data.weather[0].main}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (false)}
            </div>
        </section>
    )
}

export default Location;
