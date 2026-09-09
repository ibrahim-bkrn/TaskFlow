function formatDate(value) {
  if (!value) return '';
  return String(value).slice(0, 10);
}

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
          <h3><a href="projet.html?id=${projet.id_projet}">${projet.Titre}</a></h3>
          <p>${projet.desc_ || 'Aucune description'}</p>
          <small>${projet.dateCreation || 'Date inconnue'}</small>
          <p>Statut : ${projet.statut || 'Non défini'}</p>
          <a class="button" href="projet.html?id=${projet.id_projet}">Voir les tâches</a>
          <button class="edit-btn" data-id="${projet.id_projet}">Modifier</button>
          <button class="delete-btn" data-id="${projet.id_projet}">Supprimer</button>
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
        document.getElementById('editDate').value = formatDate(data.dateCreation);
        document.getElementById('editStatut').value = data.statut || 'en cours';

        document.getElementById('projectModal').style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors du chargement du projet');
      });
  }

  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.dataset.id;
    const projectName = event.target.closest('.project-item')?.querySelector('h3')?.textContent || 'ce projet';

    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ' + projectName + ' ?');

    if (!confirmDelete) {
      return;
    }

    fetch('/projets/' + id, {
      method: 'DELETE'
    })
      .then(() => {
        loadProjects();
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors de la suppression');
      });
  }
});

document.getElementById('openAddProjectModal').addEventListener('click', function() {
  document.getElementById('addProjectForm').reset();
  document.getElementById('addProjectModal').style.display = 'block';
});

document.getElementById('addProjectForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const payload = {
    Titre: document.getElementById('addTitre').value,
    desc_: document.getElementById('addDesc').value,
    dateCreation: document.getElementById('addDate').value,
    statut: document.getElementById('addStatut').value,
    id_user: document.getElementById('addIdUser').value
  };

  fetch('/projets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(() => {
      document.getElementById('addProjectModal').style.display = 'none';
      loadProjects();
    })
    .catch(error => {
      console.error(error);
      alert("Erreur lors de l'ajout");
    });
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

document.querySelectorAll('.modal .close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

loadProjects();