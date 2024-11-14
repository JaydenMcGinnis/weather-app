import "./style.css";
const button = document.querySelector("button");
const p = document.querySelector("p");
const img = document.querySelector("img");

async function getWeather() {
  // Fetch the weather for the searched location
  const response = fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toongabbie?unitGroup=metric&include=current&key=536XAQYZEPJ3WUPEVEM29JTYZ&contentType=json"
  );
  return (await response).json();
}

async function getGif(icon) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=CYkms1l29Rr198sIhL72zM2PZESZTWaH&s=${icon}-weather`
  );
  return (await response.json()).data.images.original.url;
}

// Set p inside div to current temp
button.addEventListener("click", () => {
  getWeather().then((response) => {
    p.textContent = `Current temp: ${response.currentConditions.temp} \u2103`;
    getGif(response.currentConditions.icon).then((response) => {
      console.log(response);
      img.src = response;
    });
  });
});
