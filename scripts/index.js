window.addEventListener('DOMContentLoaded', function() {

  const mainElement = document.getElementById('main');
  const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const pageElement = document.getElementById('page');

  let pageNumber = 1;

  function loadPeople(url) {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (resultsPage) {
        const html = resultsPage.results
          .map(function (result) {
            return `
              <article>
                <h2>${result.name}</h2>
                <table>
                  <tr>
                    <td>
                      <strong>Estatura</strong>
                    </td>
                    <td>${Number(result.height) / 100} m</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Peso</strong>
                    </td>
                    <td>${result.mass} kg</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Género</strong>
                    </td>
                    <td class="text-capitalize">${result.gender}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Año de nacimiento</strong>
                    </td>
                    <td class="text-capitalize">${result.birth_year}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Color de piel</strong>
                    </td>
                    <td class="text-capitalize">${result.skin_color}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Color de ojos</strong>
                    </td>
                    <td class="text-capitalize">${result.eye_color}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Color de cabello</strong>
                    </td>
                    <td class="text-capitalize">${result.hair_color}</td>
                  </tr>
                </table>
              </article>
            `;
          });
        mainElement.innerHTML = html.join('');

        pageElement.innerHTML = pageNumber;

        if (resultsPage.previous == null) {
          previousButton.disabled = true;
          previousButton.onclick = null;
        } else {
          previousButton.disabled = false;
          previousButton.onclick = function() {
            pageNumber = pageNumber - 1;
            loadPeople(resultsPage.previous);
          };
        }

        if (resultsPage.next == null) {
          nextButton.disabled = true;
          nextButton.onclick = null;
        } else {
          nextButton.disabled = false;
          nextButton.onclick = function() {
            pageNumber = pageNumber + 1;
            loadPeople(resultsPage.next);
          };
        }

      });
  }

  loadPeople('https://swapi.dev/api/people/');

});
