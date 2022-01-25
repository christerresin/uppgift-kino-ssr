import fetch from "node-fetch";

const API_BASEURL = "https://lernia-kino-cms.herokuapp.com/api";

const trimData = async (screening) => {
  console.log(screening);

  const movieTitle = await addMovieTitle(screening);
  return {
    id: screening.id,
    ...screening.attributes,
  };
};

const filterOldScreenings = (screenings, todaysDate) => {
  const upcomingScreenings = screenings.filter((screening) => {
    if (Date.parse(screening.start_time) > Date.parse(todaysDate)) {
      return screening;
    }
  });
  return upcomingScreenings;
};

const filterNextFiveDaysScreenings = (screenings, futureDate) => {
  const filteredScreenings = screenings.filter((screening) => {
    if (Date.parse(screening.start_time) < Date.parse(futureDate)) {
      return screening;
    }
  });
  return filteredScreenings;
};

const sortScreeningsByDate = (screenings) => {
  const sortedScreenings = screenings.sort((a, b) => {
    const keyA = new Date(a.start_time);
    const keyB = new Date(b.start_time);
    // Comparing the two dates
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  });

  return sortedScreenings;
};

const addMovieTitle = async (screening) => {
  const movieId = screening.id;
  const dataBuff = await fetch(API_BASEURL + `/movies/${movieId}`);
  const data = await dataBuff.json();
  const movieData = await data.data;
  const movieTitle = movieData.attributes.title;
  return movieTitle;
};

const filterByUpomingScreenings = (arr, days) => {
  const todaysDate = new Date();
  const ms = new Date().getTime() + 86400000 * days;
  const futureDate = new Date(ms);

  const filteredByOldScreenings = filterOldScreenings(arr, todaysDate);

  const filteredByFutureScreenings = filterNextFiveDaysScreenings(
    filteredByOldScreenings,
    futureDate
  );

  const sortedAndFilteredScreenings = sortScreeningsByDate(
    filteredByFutureScreenings
  );

  return sortedAndFilteredScreenings.splice(0, 10);
};

const getUpcomingScreenings = async () => {
  const dataBuff = await fetch(API_BASEURL + "/screenings");
  const data = await dataBuff.json();
  const screeningsData = await data.data;

  const trimedData = screeningsData.map((screening) => trimData(screening));
  return filterByUpomingScreenings(trimedData, 5);
};

export default getUpcomingScreenings;
