import { useState, useEffect } from "react";
import "./App.css";
import Time from "./Time";
import Quote from "./Quote";
import Less from "./Less";
import mobileBackgDay from "./images/mobile/bg-image-daytime.jpg";
import desktopBackgDay from "./images/desktop/bg-image-daytime.jpg";
import mobileBackgNight from "./images/mobile/bg-image-nighttime.jpg";
import desktopBackgNight from "./images/desktop/bg-image-nighttime.jpg";
import uparrow from "./images/desktop/icon-arrow-up.svg";
// import downarrow from "./images/desktop/arrow-down.svg";
// let geo_time = "https://freegeoip.app";
// let geo_time2 = "https://freegeoip.net/json";
let ipgeo =
	"https://api.ipgeolocation.io/ipgeo?apiKey=0f6d2831fba64e428c27b1bad0aa7b74";

const App = (props) => {
	const [isDaylight, setDaylight] = useState(true);
	const [imageUrl, setImageUrl] = useState("");
	const [showMore, setShowMore] = useState("true");
	const [timeClass, setTimeClass] = useState("timedisplay");
	const [moreButton, setmoreButton] = useState("time");
	const [arrow, setarrow] = useState({ transform: "rotate(180deg)" });
	// const [error1, setError1] = useState("");
	const [city, setcity] = useState("");
	const [zip, setzip] = useState("");
	const [arrowword, setarrowword] = useState("");
	const [stateof, setstateof] = useState("");
	const [latitude, setlatitude] = useState("");
	const [longitude, setlongitude] = useState("");
	const [ipis, setipis] = useState("");
	const [flag, setflag] = useState("");
	const [telcode, settelcode] = useState("");
	// const [extra1, setextra1] = useState({});
	const windowWidth = useWindowWidth();
	const timeInformation = Time();
	const [apilatitude, setapilatitude] = useState("25.0");
	const [apilongitude, setapilongitude] = useState("51.0");
	const [weatherdesc, setweatherdesc] = useState("CLOUDY IT IS");

	useEffect(() => {
		showMore === true
			? setarrow({ transform: "rotate(180deg)" })
			: setarrow({ transform: "rotate(0deg)" });
	}, [showMore]);

	useEffect(() => {
		const daylightGreetings = [
			"GOOD DAY",
			"GOOD MORNING",
			"GOOD AFTERNOON",
		];

		if (daylightGreetings.includes(timeInformation.greeting)) {
			setDaylight(true);
		} else {
			setDaylight(false);
		}
	}, [timeInformation.greeting]);

	useEffect(() => {
		showMore === true ? setarrowword("MORE") : setarrowword("LESS");
	}, [showMore]);

	// console.log("arrow", arrow);

	useEffect(() => {
		if (windowWidth >= 600 && isDaylight) {
			setImageUrl(desktopBackgDay);
		} else if (windowWidth >= 600 && !isDaylight) {
			setImageUrl(desktopBackgNight);
		} else if (windowWidth < 600 && isDaylight) {
			setImageUrl(mobileBackgDay);
		} else if (windowWidth < 600 && !isDaylight) {
			setImageUrl(mobileBackgNight);
		}
	}, [windowWidth, isDaylight]);

	// let data1 = "";
	// let data2 = "";

	useEffect(() => {
		fetch(ipgeo)
			.then((response) => response.json())
			.then((data3) => {
				// console.log(data3);
				setcity(data3.city);
				setzip(data3.zipcode);
				setstateof(data3.state_prov);
				setflag(data3.country_flag);
				setlatitude(data3.latitude);
				setlongitude(data3.longitude);
				setipis(data3.ip);
				settelcode(data3.calling_code);
			});
	}, []);

	let extra4 = {
		latitude: { latitude },
		longitude: { longitude },
		ipis: { ipis },
		telcode: { telcode },
	};
	useEffect(() => {
		setapilatitude(latitude);
		setapilongitude(longitude);
	}, [ipis]);

	let getWeather = () => {
		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${apilatitude}&lon=${apilongitude}&exclude=daily&appid=c60f10b5181836e23315494bb81bb16e`
		)
			.then((response) => {
				if (response.status >= 200 && response.status <= 299) {
					return response.json();
				} else {
					throw Error(response.statusText);
				}
			})
			.then((data4) => {
				setweatherdesc(
					`${data4.hourly[4].weather[0].description} LATER`
				);
				// console.log("object", data4.hourly[4].weather[0].description);
			})
			.catch((error) => {
				// Handle the error
				console.log(error);
			});
	};

	useEffect(() => {
		console.log(getWeather());
	}, [apilatitude]);

	return (
		<div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
			<div className="App-content">
				<Quote timeInformation={timeInformation} />
				<div className="height1">
					<div className={moreButton}>
						<div className="greeting">
							<button
								className="button2"
								color="gray"
								onClick={(ev) => {
									ev.preventDefault();
									setDaylight(!isDaylight);
								}}
							>
								Change Lighting
							</button>
							<img
								className="iconsun"
								style={{ fill: "red" }}
								src={timeInformation.iconUrl}
								alt="sun"
							/>
							<span className="greet">
								{timeInformation.greeting}
							</span>
							<div className="weather">{weatherdesc}</div>
						</div>
						<h3 className="timedisplay">{timeInformation.time}</h3>

						<div className="loc">
							<div>
								<span>{city}</span>
								<span className="abb">
									{timeInformation.abb}
								</span>
							</div>
							<div className="town">
								<span className="town">{stateof}</span>
								<span className="zip">{zip}</span>
								<span>
									<img
										className="flag"
										src={flag}
										alt="flag"
									></img>
								</span>
							</div>
						</div>

						{/* <h3>{timeInformation.day}</h3>
					<h3>{timeInformation.dayOfYear}</h3>
					<h3>{timeInformation.weekNumber}</h3>
					<h3>{timeInformation.timezone}</h3> */}

						<button
							className="button1"
							color="gray"
							style={{ cursor: "pointer" }}
							onClick={(ev) => {
								ev.preventDefault();
								setShowMore(!showMore);
								timeClass === "timedisplay"
									? setTimeClass("timedisplay2")
									: setTimeClass("timedisplay");
								moreButton === "time"
									? setmoreButton("time2")
									: setmoreButton("time");
							}}
						>
							<img
								className="arrow"
								style={arrow}
								src={uparrow}
								alt="arrow"
							></img>
							{arrowword}
						</button>
					</div>
				</div>

				{!showMore && (
					<div className="extra">
						<Less
							timeInformation={timeInformation}
							isDayLight={isDaylight}
							extra={extra4}
						/>
					</div>
				)}
					<div className="date"> {timeInformation.mydate} </div>
				
				
			</div>
		</div>
	);
};

const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	return windowWidth;
};

export default App;
