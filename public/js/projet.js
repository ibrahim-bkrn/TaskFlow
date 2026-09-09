function loadProjects() {
  fetch('/projets')
    .then(response => response.json())
    .then(projets => {
      const container = document.getElementById('projets-list');

      if (!projets.length) {
        container.innerHTML = '<p>Aucun projet à afficher.</p>';
        return;
      }

      container.innerHTML = projets.map(projet => `
        <div class="project-item">
          <h3>${projet.Titre}</h3>
          <p>${projet.desc_ || 'Aucune description'}</p>
          <small>${projet.dateCreation || 'Date inconnue'}</small>
          <p>Statut : ${projet.statut || 'Non défini'}</p>
          <button class="edit-btn" data-id="${projet.id_projet}">Modifier</button>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error(error);
      document.getElementById('projets-list').innerHTML = '<p>Erreur lors du chargement.</p>';
    });
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    const id = event.target.dataset.id;

    fetch('/projets/' + id)
      .then(response => response.json())
      .then(projet => {
        const data = Array.isArray(projet) ? projet[0] : projet;

        document.getElementById('projectId').value = data.id_projet;
        document.getElementById('editTitre').value = data.Titre || '';
        document.getElementById('editDesc').value = data.desc_ || '';
        document.getElementById('editDate').value = data.dateCreation || '';
        document.getElementById('editStatut').value = data.statut || 'en cours';

        document.getElementById('projectModal').style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors du chargement du projet');
      });
  }
});

document.getElementById('editProjectForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const id = document.getElementById('projectId').value;

  const payload = {
    Titre: document.getElementById('editTitre').value,
    desc_: document.getElementById('editDesc').value,
    dateCreation: document.getElementById('editDate').value,
    statut: document.getElementById('editStatut').value
  };

  fetch('/projets/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(() => {
      document.getElementById('projectModal').style.display = 'none';
      loadProjects();
    })
    .catch(error => {
      console.error(error);
      alert('Erreur lors de la modification');
    });
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('projectModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

loadProjects();