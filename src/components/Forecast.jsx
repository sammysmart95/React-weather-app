import React from 'react'
import Animate from './Animate'
import dayjs from 'dayjs'


const Forecast = ({ showForecast }) => {

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

    console.log(showForecast)
    return (
        <div>
            {showForecast && showForecast.length ? (
                <div className='forecast2'>
                    {showForecast.map((data, index) => (
                        <div key={index} className='second'>
                            <div className="time">{dayjs(data.dt_txt).format("h a")}</div>
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
            ) : (null)}
        </div>
    )
}

export default Forecast
