import { useSuspenseQuery } from "@tanstack/react-query";
import fetch from "isomorphic-fetch";

interface Planet {
	name: string;
}

export const fetchApi = () => {
	return fetch("https://swapi.dev/api/planets/").then((response) => {
		if (!response.ok) {
			console.log(response);
			throw new Error("hiiiiii");
		}

		return response.json();
	});
	// .catch(e =>{throw e});
};

const Planets = () => {
	const { data } = useSuspenseQuery({
		queryKey: ["characters"],
		queryFn: fetchApi,
		retry: 0,
	});

	return (
		<div>
			<h1>Characters</h1>
			<ul>
				{data.results.map((planet: Planet) => (
					<li key={planet.name}>{planet.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Planets;
