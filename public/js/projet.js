fetch('/projets')
  .then(response => response.json())
  .then(projets => {
    const container = document.getElementById('projets-list');

    if (!projets.length) {
      container.innerHTML = "<p>Aucun projet à afficher.</p>";
      return;
    }

    container.innerHTML = projets.map(projet => `
      <div class="project-item">
        <h3>${projet.Titre}</h3>
        <p>${projet.desc_}</p>
        <small>${projet.dateCreation}</small>
      </div>
    `).join('');
  });