export const formatDateToTime = (time: number) => {
  return new Date(time).toLocaleTimeString();
};