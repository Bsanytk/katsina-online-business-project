// src/pages/Home.jsx
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Katsina Online Business - Gidan Kasuwanci</title>
        <meta
          name="description"
          content="Shafin kasuwanci mafi sauƙi da na zamani a jihar Katsina. Talla, siye da sayarwa, kasuwanci cikin sauƙi."
        />
        <meta
          name="keywords"
          content="Katsina business, online kasuwanci, Nigeria, sayar da kaya, siyayya"
        />
        <meta property="og:title" content="Katsina Online Business" />
        <meta
          property="og:description"
          content="Ƙofar kasuwanci ta yanar gizo a Katsina. Talla da siye cikin sauƙi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/logo192.png" />
        <meta property="og:url" content="https://katsinaonline.vercel.app/" />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold mb-4 text-green-700">Barka da zuwa!</h1>
        <p>Shafin kasuwanci na zamani a jihar Katsina.</p>
      </div>
    </>
  );
};

export default Home;