const meteo = {
  apiKey: "efc79d722ff34276ba5fbd1698d1fb26",
  richiediMeteo: function (citta) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        citta +
        "&lang=it&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.mostraMeteo(data));
    // .then((data) => console.log(data));
  },
  mostraMeteo: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".citta").innerText = "Meteo a " + name;
    document.querySelector(".temp").innerText = parseInt(temp) + " °C";
    document.querySelector(".img").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".descrizione").innerText = description;
    document.querySelector(".umidita").innerText =
      "Umidità pari al: " + humidity + "%";
    document.querySelector(".vento").innerText =
      "Velocità del vento pari a: " + speed + " %";
  },
  ricerca: function () {
    this.richiediMeteo(document.querySelector(".barra-ricerca").value);
    document.querySelector(".meteo").style.display = "block";
  },
};

document.querySelector(".bottone").addEventListener("click", function (e) {
  e.preventDefault();
  meteo.ricerca();
  document.querySelector(".barra-ricerca").value = "";
});

document
  .querySelector(".barra-ricerca")
  .addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      meteo.ricerca();
      document.querySelector(".barra-ricerca").value = "";
    }
  });

// meteo.richiediMeteo("pesaro");
// per avere i 5 giorni successivi
// api.openweathermap.org/data/2.5/forecast?q={nome città}&appid=efc79d722ff34276ba5fbd1698d1fb26
