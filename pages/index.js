import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import countriesDatas from "../datas/all.json";
import SearchInput from "../components/SearchInput/SearchInput";
import ContriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          ></SearchInput>
        </div>
      </div>
      <ContriesTable countries={filteredCountries} />
    </Layout>
  );
}
// https://restcountries.com/v2/all
export const getStaticProps = async () => {
  const countries = await countriesDatas;
  return {
    props: {
      countries,
    },
  };
};
