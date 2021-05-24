import "./App.css";
import React, { useState, useEffect } from "react";
import Api from "./Api";
import Quote from "./Quote";
// import Time from "./Time";
import { DateTime } from "luxon";
let dt = DateTime.now();
const fulltime = dt.toLocaleString(DateTime.DATETIME_MED);
const red = dt.toHTTP();
const twenty = dt.toLocaleString(DateTime.TIME_SIMPLE);
const twentysec = dt.toLocaleString(DateTime.TIME_WITH_SECONDS);
// console.log("24", twenty);
// console.log("24sec", twentysec);
// console.log("RED", red);
let now = DateTime.now();
let later = DateTime.local(2020, 10, 12);
console.log("FULLTIME", fulltime, now, later);
console.log("dt",dt)
function App() {
	const url =
		"https://api.ipgeolocation.io/ipgeo?apiKey=3172fe940fa243738d856ffabc3e5d41&ip=82.4.16.6";

	const [result, error, isLoading] = Api(url);
	useEffect(() => {
		// console.log("FROM HOOK", result, isLoading);
	}, []);

	const timezone = "America/New_York";
	const [time, setTime] = useState(DateTime.local().setZone(timezone));
	console.log("T I M E", time);

	const LocalTime = (timezone) => {
		setInterval(() => {
			setTime(DateTime.local().setZone(timezone));
		}, 1000);
	};

	if (result !== null) {
		LocalTime(result.time_zone.name);
	}

	let hour = time.c.hour;
	// console.log("HOUR", hour);
	if (hour < 7) {
		// console.log("less then 7");
	}
	if (hour > 7 && hour < 12) {
		// console.log("more then 7 and less then 12");
	}
	if (hour > 12 && hour < 17) {
		// console.log("more then 12 and less then 17");
	}
	if (hour > 17 && hour < 22) {
		// console.log("more then 17 and less then 22");
	}
	if (hour > 22) {
		// console.log("more then 22");
	}
	let secondtime = time.c.second;
	if (secondtime < 10) {
		secondtime = "0" + secondtime;
		// console.log("secondtime", secondtime);
	}

	let minutetime = time.c.minute;
	if (minutetime < 10) {
		minutetime = "0" + minutetime;
		// console.log("minutetime", minutetime);
	}

	let hourtime = time.c.hour;
	if (hourtime < 10) {
		hourtime = "0" + hourtime;
		// console.log("secondtime", hourtime);
	}

	if (isLoading) return <h2>Loading...</h2>;
	return (
		<div className="App">
			It's this time :{error && <p>Error: {error}</p>}
			{result && (
				<div>
					<h2>
						<ul>
							<p>{time.DATETIME_FULL}</p>
							<p>{time.c.hour}</p>
							<p>{time.c.minute}</p>
							<p>{secondtime}</p>
							<p>{time.daysInMonth}</p>
							<p>{time.day}</p>
							<p>{time.weekday}</p>
							<p>{time.weekInWeekYear}</p>
							<p>{time.year}</p>

							<li>{result.city}</li>
							<li>{result.country_capital}</li>
							<img src={result.country_flag} alt="flag" />

							<li>{result.region_name}</li>
							<li>{result.time_zone.name} </li>
							<li>{result.time_zone.current_time}</li>
							<li>{result.zipcode}</li>
						</ul>
					</h2>

					<hr />
					<Quote />
					 
				</div>
			)}
		</div>
	);
}

export default App;

// , it's currently in More Less Current timezone Day of the year Day of
// the week Week number

// console.log("NOW", now, now.c.hour, now.c.minute, now.zoneName);
// let rezoned = now.setZone("America/Los_Angeles");
// console.log("rezoneLA", rezoned.toString());
// rezoned.c.hour, rezoned.c.minute)

// var now = DateTime.local().setZone("America/New_York");
