import {useSuspenseQuery} from "@tanstack/react-query";
import fetch from "isomorphic-fetch";
export const fetchApi = () => {
    return fetch("https://swapi.dev/api/people/")
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        throw new Error('hiiiiii')
      }

      return response.json()
    })
    // .catch(e =>{throw e});
  };
  

const Characters = () => {
    const {data} = useSuspenseQuery({
        queryKey: ['characters'],
        queryFn: fetchApi,
        retry: 0,
    })

    return (
        <div>
        <h1>Characters</h1>
            <ul>
                {data.results.map((character: any) => (
                    <li key={character.name}>{character.name}</li>
                ))}
            </ul>
        </div>
    ) 
}

export default Characters