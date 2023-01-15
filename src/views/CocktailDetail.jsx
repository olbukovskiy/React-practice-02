import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useState, useEffect } from "react";
// import id from "date-fns/esm/locale/id/index.js";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { cocktailId } = useParams();
  const location = useLocation();

  const backLinkHref = location.state?.from ?? routes.HOME;

  useEffect(() => {
    if (!cocktailId) {
      return;
    }

    getCocktailDetail(cocktailId)
      .then((data) => {

        console.log(data)
        setCocktail(data);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cocktailId]);

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error);
  }, [error]);

  return (
    <Section>
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        CocktailDetail
      </h1>
      <GoBackBtn path={backLinkHref} />
      {cocktail && <CocktailInfo {...cocktail} />}
      {isLoading && <Loader/>}
    </Section>
  );
};
