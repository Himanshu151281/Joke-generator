import { useState, useEffect } from "react";

export default function Joke() {
  let [joke, setJoke] = useState({ setup: "", punchline: "" });
  let [isLoading, setIsLoading] = useState(false);

  async function getNewJoke() {
    setIsLoading(true);
    try {
      const URL = "https://official-joke-api.appspot.com/random_joke";
      let res = await fetch(URL);
      let data = await res.json();
    //   console.log(data.setup);
    //   console.log(data.punchline);
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Oops! Failed to fetch a joke. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getNewJoke();
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-2xl">
          <div>
            <h1 className="text-3xl text-purple-800 font-bold text-center pb-12">
              Joke Generator
            </h1>
          </div>
          <div className="space-y-4">
            <div className="text-center min-h-[4rem] pb-4" aria-live="polite">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <p>{joke.setup}</p>
                  <p>{joke.punchline}</p>
                </>
              )}
            </div>
            <button
              onClick={getNewJoke}
              disabled={isLoading}
              className="w-full text-white p-2 rounded-md hover:scale-105 transform transition duration-200 ease-in-out bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {isLoading ? "Fetching Joke..." : "Get Another Joke"}
            </button>
          </div>
          {/* <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
          <button onClick={getNewJoke}>Generate Joke</button> */}
        </div>
      </div>
    </>
  );
}
