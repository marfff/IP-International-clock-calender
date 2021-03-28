import { useState, useEffect } from "react";
import "./Time.css";
import sun from "./images/desktop/icon-sun.svg";
import moon from "./images/desktop/icon-moon.svg";

let api_time = "https://worldtimeapi.org/api/ip";
// let geo_time = "https://freegeoip.app";

const Time = (props) => {
	const [time, setTime] = useState("16:00");
	const [abb, setAbb] = useState("LOC");
	const [day, setDay] = useState("");
	const [dayOfYear, setDayOfYear] = useState("");
	const [weekNumber, setWeekNumber] = useState("");
	const [timezone, setTimezone] = useState("");
	const [error, setError] = useState("");
	const [greeting, setGreeting] = useState("GOOD DAYY");
	const [iconUrl, setIconUrl] = useState(sun);

	// const [ip, setIp] = useState("");
	// const [location, setLocation] = useState("");
	// const [timezone, setTimezone] = useState("");
	const [x, setx] = useState(true);

	//timer to limit api calling
	useEffect(() => {
		setInterval(() => {
			setx(x);
			// console.log(x);
			setx(false);
		}, 60000);
		clearInterval();
	}, []);

	// console.log(x);

	let makeGreeting = (timer5) => {
		let greeting1 = "";
		let hour = timer5.slice(0, 2);
		if (hour > "12" && hour < "18") {
			greeting1 = "GOOD AFTERNOON";
			setIconUrl(sun);
			return greeting1;
		}
		if (hour > "18" && hour < "23") {
			greeting1 = "GOOD NIGHT";
			setIconUrl(moon);
			// console.log("MOON",moon)
			return greeting1;
		}
		if (hour < "12" && hour > "07") {
			greeting1 = "GOOD MORNING";
			setIconUrl(sun);
			return greeting1;
		} else {
			greeting1 = "GOOD NIGHT";
			setIconUrl(moon);
		}
		return greeting1;
	};

	useEffect(() => {
		if (error !== "") return;
		fetch(api_time, {
			method: "GET",
			cors: "no-cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// console.log(data);
				let timer = data.datetime
					.toString()
					.split("T")[1]
					.split(".")[0];
				let timer2 = timer.split(":");
				let timer3 = timer2[0];
				let timer4 = timer2[1];
				let timer5 = `${timer3}:${timer4}`;
				setTime(timer5);
				setAbb(data.abbreviation);
				setDay(data.day_of_week);
				setDayOfYear(data.day_of_year);
				setWeekNumber(data.week_number);
				setTimezone(data.timezone);
				setGreeting(makeGreeting(timer5));
			})
			.catch((err) => {
				setError(err);
				console.log("Error Reading data " + err);
			});
	}, [x]);

	return {
		time,
		abb,
		day,
		dayOfYear,
		weekNumber,
		timezone,
		greeting,
		x,
		iconUrl,
	};

	// return (
	// 	<div className="time">
	// 		<h3>TIME IS-{time}</h3>
	// 		<h3>ABB IS-{abb}</h3>
	// 		<h3>DAY OF WEEK IS-{day}</h3>
	// 		<h3>DAY OF YEAR IS-{dayOfYear}</h3>
	// 		<h3>WEEK NUMBER IS-{weekNumber}</h3>
	// 		<h3>TIMEZONE IS-{timezone}</h3>
	// 	</div>
	// );
};
export default Time;

//UNUSED CODE
// useEffect(() => {
// 	fetch(geo_time)
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((data) => {
// 			console.log("GEOTIME", data);
// 		})
// 		.catch((err) => {
// 			// Do something for an error here
// 			console.log("Error Reading data " + err);
// 		});
// }, []);

// https://freegeoip.app

// {"abbreviation":"GMT","client_ip":"82.4.16.6","datetime":"2021-03-21T20:17:29.718325+00:00","day_of_week":0,"day_of_year":80,"dst":false,"dst_from":null,"dst_offset":0,"dst_until":null,"raw_offset":0,"timezone":"Europe/London","unixtime":1616357849,"utc_datetime":"2021-03-21T20:17:29.718325+00:00","utc_offset":"+00:00","week_number":11}

// {"ip":"82.4.16.6","country_code":"GB","country_name":"United Kingdom","region_code":"ENG","region_name":"England","city":"Fleet","zip_code":"GU13","time_zone":"Europe/London","latitude":51.2833,"longitude":-0.8333,"metro_code":0}

// useEffect((timenow = "") => {
// 	fetch(geo_time)
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((data) => {
//             timenow = data.datetime.toString().split("T")[1].split(".")[0];
//             data = data.datetime.toString().split("T")[1].split(".")[0];
// 			setTime(data);
// 		});
// 	console.log("TIMENOW2", timenow);
// });

// useEffect((locationnow = "") => {
// 	fetch(api_time)
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((data) => {
// 			setResult3(data);
// 			location = data.datetime.toString().split("T")[1].split(".")[0];
// 			setTime(timenow);
// 		});
// 	console.log("TIMENOW2", timenow);
// });
