export const getDate = () => {
  let rawDate = new Date();
  const day = rawDate.getUTCDate();
  const month = rawDate.getUTCMonth() + 1;
  const year = rawDate.getUTCFullYear();
  return `${day}.${month}.${year}`;
};
export const getTime = () => {
  let rawDate = new Date();
  const hours = rawDate.getUTCHours();
  const minutes = rawDate.getUTCMinutes();
  const seconds = rawDate.getUTCSeconds();
  return `${hours}:${minutes}`;
};
