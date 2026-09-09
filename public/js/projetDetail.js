const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

let currentTask = null;

function formatDateTimeLocal(value) {
  if (!value) return '';
  return String(value).slice(0, 16);
}

function loadProject() {
  fetch('/projets/' + projectId)
    .then(response => response.json())
    .then(projet => {
      const data = Array.isArray(projet) ? projet[0] : projet;
      document.getElementById('projet-titre').textContent = data?.Titre || 'Projet';
      document.getElementById('projet-desc').textContent = data?.desc_ || '';
    })
    .catch(error => console.error(error));
}

function loadTaches() {
  fetch('/taches')
    .then(response => response.json())
    .then(taches => {
      const container = document.getElementById('taches-list');
      const projetTaches = taches.filter(t => String(t.id_projet) === String(projectId));

      if (!projetTaches.length) {
        container.innerHTML = '<p>Aucune tâche à afficher.</p>';
        return;
      }

      container.innerHTML = projetTaches.map(tache => `
        <div class="project-item">
          <h3>${tache.Titre}</h3>
          <p>${tache.Description || 'Aucune description'}</p>
          <small>Échéance : ${tache.dateLimite || 'Non définie'}</small>
          <p>Priorité : ${tache.Priorite || 'Non définie'}</p>
          <p>Statut : ${tache.Statut || 'Non défini'}</p>
          <button class="edit-btn" data-id="${tache.Id_Tache}">Modifier</button>
          <button class="delete-btn" data-id="${tache.Id_Tache}">Supprimer</button>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error(error);
      document.getElementById('taches-list').innerHTML = '<p>Erreur lors du chargement.</p>';
    });
}

document.getElementById('openAddTaskModal').addEventListener('click', function() {
  document.getElementById('addTaskForm').reset();
  document.getElementById('addTaskModal').style.display = 'block';
});

document.getElementById('addTaskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const payload = {
    Titre: document.getElementById('addTitre').value,
    Description: document.getElementById('addDescription').value,
    dateLimite: document.getElementById('addDateLimite').value,
    Priorite: document.getElementById('addPriorite').value,
    Statut: document.getElementById('addStatut').value,
    id_projet: projectId,
    id_user: document.getElementById('addIdUser').value
  };

  fetch('/taches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(() => {
      document.getElementById('addTaskModal').style.display = 'none';
      loadTaches();
    })
    .catch(error => {
      console.error(error);
      alert("Erreur lors de l'ajout");
    });
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    const id = event.target.dataset.id;

    fetch('/taches/' + id)
      .then(response => response.json())
      .then(tache => {
        const data = Array.isArray(tache) ? tache[0] : tache;
        currentTask = data;

        document.getElementById('taskId').value = data.Id_Tache;
        document.getElementById('editTitre').value = data.Titre || '';
        document.getElementById('editDescription').value = data.Description || '';
        document.getElementById('editDateLimite').value = formatDateTimeLocal(data.dateLimite);
        document.getElementById('editPriorite').value = data.Priorite || 'Moyen';
        document.getElementById('editStatut').value = data.Statut || 'à faire';

        document.getElementById('editTaskModal').style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors du chargement de la tâche');
      });
  }

  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.dataset.id;
    const taskName = event.target.closest('.project-item')?.querySelector('h3')?.textContent || 'cette tâche';

    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ' + taskName + ' ?');

    if (!confirmDelete) {
      return;
    }

    fetch('/taches/' + id, {
      method: 'DELETE'
    })
      .then(() => {
        loadTaches();
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors de la suppression');
      });
  }
});

document.getElementById('editTaskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const id = document.getElementById('taskId').value;

  const newValues = {
    Titre: document.getElementById('editTitre').value,
    Description: document.getElementById('editDescription').value,
    dateLimite: document.getElementById('editDateLimite').value,
    Priorite: document.getElementById('editPriorite').value,
    Statut: document.getElementById('editStatut').value
  };

  const changedFields = Object.keys(newValues).filter(champ => {
    const oldValue = champ === 'dateLimite'
      ? formatDateTimeLocal(currentTask?.[champ])
      : String(currentTask?.[champ] ?? '');
    return oldValue !== newValues[champ];
  });

  const requests = changedFields.map(champ =>
    fetch('/taches/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ champ, valeur: newValues[champ] })
    })
  );

  Promise.all(requests)
    .then(() => {
      document.getElementById('editTaskModal').style.display = 'none';
      loadTaches();
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

loadProject();
loadTaches();
