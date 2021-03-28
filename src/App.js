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
let geo_time = "https://freegeoip.app";
let geo_time2 = "https://freegeoip.net/json";
let ipgeo =
	"https://api.ipgeolocation.io/ipgeo?apiKey=3172fe940fa243738d856ffabc3e5d41";

const App = (props) => {
	// console.log(props);
	const [isDaylight, setDaylight] = useState(true);
	const [imageUrl, setImageUrl] = useState("");
	const [showMore, setShowMore] = useState("true");
	const [timeClass, setTimeClass] = useState("timedisplay");
	const [moreButton, setmoreButton] = useState("time");
	// console.log("morebutton", moreButton);
	const [arrow, setarrow] = useState({ transform: "rotate(180deg)" });
	const [error1, setError1] = useState("");
	const [city, setcity] = useState("");
	const [zip, setzip] = useState("");

	const windowWidth = useWindowWidth();

	const timeInformation = Time();

	useEffect(() => {
		showMore === true
			? setarrow({ transform: "rotate(180deg)" })
			: setarrow({ transform: "rotate(0deg)" });
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

	let data1 = "";
	let data2 = "";

	// useEffect(() => {

	// 	fetch(geo_time2)
	// 	// 	{
	// 	// 	method: "GET",
	// 	// 	// cors: "no-cors",
	// 	// }
	// 	.then((res) => {
	// 		return res.json();
	// 	})
	// 	.then((data1) => {

	// 	});

	// });

	useEffect(() => {
		fetch(ipgeo)
			.then((response) => response.json())
			.then((data3) => {
				console.log(data3.city, data3.zipcode);
				setcity(data3.city);
				setzip(data3.zipcode);
			});
	}, []);

	return (
		<div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
			<div className="App-content">
				<Quote timeInformation={timeInformation} />

				<div className={moreButton}>
					<h3 className="greeting">
						<img
							className="iconsun"
							style={{ fill: "red" }}
							src={timeInformation.iconUrl}
							alt="sun"
						></img>
						{timeInformation.greeting}
					</h3>
					<h3 className="timedisplay">{timeInformation.time}</h3>

					<div className="loc">
						<div>
							<span>{timeInformation.timezone}</span>
							<span className="abb">{timeInformation.abb}</span>
						</div>
						<div className="town">
							<span className="town">{city}</span>
							<span className="zip">{zip}</span>
						</div>
					</div>

					<h3>{timeInformation.day}</h3>
					<h3>{timeInformation.dayOfYear}</h3>
					<h3>{timeInformation.weekNumber}</h3>
					<h3>{timeInformation.timezone}</h3>

					<button
						className="button1"
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
						MORE
					</button>
					<button
						className="button2"
						onClick={(ev) => {
							ev.preventDefault();
							setDaylight(!isDaylight);
						}}
					>
						Change Lighting
					</button>
				</div>

				{!showMore && (
					<div className="extra">
						<div>
							<Less
								timeInformation={timeInformation}
								isDayLight={isDaylight}
							/>
						</div>
					</div>
				)}
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
// const Geo = () => {
// 	const [error1, setError1] = useState("");
// 	return (  );

// const [error1, setError1] = useState("");
// useEffect(() => {

// 	if (error1 !== "") return;
// 	fetch(geo_time, {
// 		method: "GET",
// 		cors: "no-cors",
// 	})
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((data) => {
// 			console.log("CITY", data)
// 		})
// 		.catch((err) => {
// 			setError1(err);
// 			console.log("Error Reading data " + err);
// 		});
// }, []);
// }

export default App;
