const form = document.getElementById('fetch-weather-form');
const content = document.querySelector('.content-body');
const getTemplate = (data) => {
  return `
  <div class="preloader">
    <span class="fas fa-spinner fa-spin" data-fa-transform="grow-20"></span>
  </div>            
  <div class="row align-items-center">
    <div class="col">
      <h5>
        <span class="fas fa-map-marker-alt"></span>
        ${data.location}
      </h5>
      <p class="mb-0">${data.today}</p>
    </div>
    <div class="col-sm-auto">
      <div class="d-flex align-items-center">
        <img src="https://openweathermap.org/img/wn/${data.weather.icon}@2x.png" alt="">
        <span class="temperature">${data.temperature}</span>
      </div>
    </div>
  </div>
  <div class="font-weight-bolder text-capitalize">Feels like ${data.feelsLike}. ${data.weather.description}. ${data.weather.main}</div>
  `;
};
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value;
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'flex';
    if (!address) {
      content.innerHTML = `<h3 class="font-size-lg font-weight-boder text-center text-secondary">No Address Given</h3>`;
    } else {
      fetch(`/weather?address=${address}`)
        .then((res) => {
          res.json().then((data) => {
            preloader.removeAttribute('style');
            const template = getTemplate(data);
            content.innerHTML = template;
          });
        })
        .catch((error) => {
          content.innerHTML =
            '<h3 class="font-size-lg font-weight-boder text-center text-secondary">Something went to wrong, Please try again.</h3>';
        });
    }
  });
}
