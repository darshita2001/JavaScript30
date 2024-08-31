document.addEventListener("DOMContentLoaded", () => {
  const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  getData();

  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");

  searchInput.addEventListener("input", displayMatches);

  const cities = [];

  async function fetchData() {
    try {
      const response = await fetch(endpoint);
      //   console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP Error :- Status ${response.status}`);
      }

      const data = response.json();

      return data;
    } catch (error) {
      console.error("Error :- ", error);
      // Handle the error or provide fallback data
      return null;
    }
  }

  async function getData() {
    try {
      const data = await fetchData();
      cities.push(...data);
    } catch (error) {
      console.error(`Error while fetching data :- ${error}`);
    }
  }

  function displayMatches() {
    const data = searchWord(this.value);

    const html = data
      .map((place) => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );
        const stateName = place.state.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );

        return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
      })
      .join("");

    suggestions.innerHTML = html;
  }

  function searchWord(wordToSearch) {
    const data = cities.filter((place) => {
      const regex = new RegExp(wordToSearch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
    const defaultMessage = [
      { city: "no match city", state: "no match state", population: "/" },
    ];
    return data.length === 0 ? defaultMessage : data;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});
