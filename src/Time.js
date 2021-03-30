import { useState, useEffect } from "react";
import "./Time.css";
import sun from "./images/desktop/icon-sun.svg";
import moon from "./images/desktop/icon-moon.svg";

let api_time = "https://worldtimeapi.org/api/ip";
// let geo_time = "https://freegeoip.app";
const dato = "2021-03-30T22:26:48.628756+01:00";
let mydate = new Date(dato).toString().slice(0, 15).toUpperCase();

const Time = (props) => {
	const [time, setTime] = useState("16:00");
	const [abb, setAbb] = useState("LOC");
	const [day, setDay] = useState("");
	const [dayOfYear, setDayOfYear] = useState("");
	const [weekNumber, setWeekNumber] = useState("");
	const [timezone, setTimezone] = useState("");
	const [error, setError] = useState("");
	const [greeting, setGreeting] = useState("GOOD DAY");
	const [iconUrl, setIconUrl] = useState(sun);
	const [date, setDate] = useState("Tue Mar 30 2021");

	// const [ip, setIp] = useState("");
	// const [location, setLocation] = useState("");
	// const [timezone, setTimezone] = useState("");
	const [x, setx] = useState(true);

	//timer to limit api calling
	useEffect(() => {
		const interval = setInterval(() => {
			setx(!x);
		}, 20000);

		return () => clearInterval(interval);
	}, [x]);

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
				console.log(data);
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
				setDate(mydate);
			})
			.catch((err) => {
				setError(err);
				console.log("Error Reading data " + err);
			});
	}, [x, error]);

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
		mydate,
	};
};
export default Time;
