import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function TimeComponent() {
    const [presentTime, setPresentTime] = useState(Date.now());

    useEffect(() => {
        let intervalID;
        intervalID = setInterval(() => {
            setPresentTime(Date.now());
        }, 1000);
        return () => clearInterval(intervalID);
    }, []);
    return <span>{dayjs(presentTime).format("ddd, MMM DD, h:mm:ss a")}</span>;
}
