import { useState, useEffect } from "react";
const url1 = "https://type.fit/api/quotes";

const Quote = (props) => {
	// console.log("QUOTEPROPS", props);
	const [result1, setResult1] = useState(null);

	useEffect(() => {
		fetch(url1)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setResult1(data);
				// console.log("DATAquote", data);
			});
	}, [props.timeInformation.x]);
	console.log("QUOTE DEP",props.timeInformation.x)

	let randomNo = Math.floor(Math.random() * 99);

	return (
		<div>
			<div className="quote">"{result1 && result1[randomNo].text}"</div>
			<div className="author">{result1 && result1[randomNo].author}</div>
		</div>
	);
};
export default Quote;

// [props.timeInformation.x]
