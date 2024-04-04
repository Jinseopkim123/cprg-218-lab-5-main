const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibli.rest/locations', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(location => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = location.name;

      const p = document.createElement('p');
      p.textContent = 'Terrain: '+location.terrain;

      const p1 = document.createElement('p1');
      p1.textContent = 'Climate: '+location.climate;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(p1);
    });

    function filterLocations() {
      const input = document.getElementById('searchInput');
      const filter = input.value.toUpperCase();
      const cards = document.querySelectorAll('.card');
    
      cards.forEach(card => {
        const title = card.querySelector('h1').textContent.toUpperCase();
        if (title.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    document.getElementById('searchInput').addEventListener('keyup', filterLocations);

  } else {
    const errorMessage = document.createElement('error');
    errorMessage.textContent = `It's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();