document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('nav ul');
  const menuLinks = document.querySelectorAll('nav ul li a');

  // Fonction pour afficher/masquer le menu
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Masquer le menu après un clic sur un lien
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove('show');
      }
    });
  });

  // Récupérer les données du fichier JSON
  fetch('portfolio.json')
  .then(response => response.json())
  .then(data => {
      const mesProjets = document.querySelector('#portfolioSection .mes_projets');

      // Parcourir les données du JSON et créer les éléments HTML
      data.forEach(item => {
          const projetUnique = document.createElement('div');
          projetUnique.classList.add('projet_unique');

          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.title;
          img.addEventListener('click', () => {
              openModal(item.title, item.description, item.src, item.competences);
          });

          projetUnique.appendChild(img);
          mesProjets.appendChild(projetUnique);
      });
  })
  .catch(error => console.error('Erreur lors du chargement des données :', error));

});

// Fonction pour ouvrir la modale
function openModal(title, description, image, competences) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDescription').innerText = description;
  document.getElementById('modalCompetences').innerText = competences;
  document.getElementById('modalImage').src = image;
  document.getElementById('projectModal').style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
  document.getElementById('projectModal').style.display = 'none';
}
