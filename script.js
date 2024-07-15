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
          openModal(item.title, item.description, item.src, item.problematique, item.competences, item.link);
        });

        projetUnique.appendChild(img);
        mesProjets.appendChild(projetUnique);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des données :', error));
});

function openModal(title, description, image, competences, problematique, link) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDescription').innerText = description;
  document.getElementById('modalCompetences').innerText = competences;
  document.getElementById('modalProblematique').innerText = problematique;
  document.getElementById('projectLink').href = link;
  document.getElementById('modalImage').src = image;
  document.getElementById('projectModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('projectModal').style.display = 'none';
}

// Fermer la modale en cliquant en dehors du contenu de la modale
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Afficher le lien seulement lorsque l'utilisateur a fait défiler la page d'une certaine distance
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("back-to-top").style.display = "block";
  } else {
    document.getElementById("back-to-top").style.display = "none";
  }
}

// Faire défiler la page jusqu'en haut lorsque le lien est cliqué
document.getElementById("back-to-top").addEventListener("click", function() {
  document.body.scrollTop = 0; // Pour Safari
  document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE et Opera
});