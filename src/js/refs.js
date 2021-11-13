export const getRefs = () => {
  return {
    temperatureDescription: document.querySelector('.temperature-description'),
    temmperatureDegree: document.querySelector(`.temperature-degree`),
    locationTimezone: document.querySelector(`.location-timezone`),
    icon: document.querySelector(`.icon`),
    iconSkycon: document.querySelector(`#icon1`),
    body: document.querySelector('body'),
  };
};
