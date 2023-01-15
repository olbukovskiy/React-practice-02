import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useState, useEffect } from "react";
import { getTrendingCocktails } from "../api/cocktail-service";

import { toast } from "react-toastify";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTrendingCocktails()
      .then((data) => {
        setCocktails(data);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>

        {cocktails.length > 0 && <CocktailsList cocktails={cocktails} />}
        {isLoading && <Loader/>}
      </Section>
    </>
  );
};
