import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchForm } from '../components/SearchForm';
import { Section } from '../components/Section';
import { CocktailsList } from '../components/CocktailsList';
import { Loader } from '../components/Loader';
import { searchByName } from '../api/cocktail-service';

import { toast } from "react-toastify";

export const Cocktails = () => {
  const [searchParams] = useSearchParams();
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true)

    searchByName(query)
      .then((data) => {
        if (!data.length) {
          setError("Coctails was not found");
          return;
        }

        setCocktails(data);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  
  }, [query]);

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error);
  }, [error]);
  

  return (
    <>
      <Section>
        <h1 className='uppercase text-4xl text-gray-600 text-center'>
          Search Cocktails
        </h1>

        <SearchForm />
        {cocktails.length > 0 && <CocktailsList cocktails={cocktails} />}
        {isLoading && <Loader/>}
      </Section>
    </>
  );
};
