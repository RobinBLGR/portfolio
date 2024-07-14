document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('nav ul');
  const menuLinks = document.querySelectorAll('nav ul li a');

  // Fonction pour afficher/masquer le menu
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Nouvelle fonction pour masquer le menu après un clic sur un lien
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove('show');
      }
    });
  });

  // Fichier JSON pour afficher le portfolio
  // Récupérer les données du fichier JSON
  fetch('portfolio.json')
    .then(response => response.json())
    .then(data => {
      // Sélectionner l'élément où afficher les images
      const portfolio = document.getElementById('portfolio');

      // Créer le titre "Mon portfolio"
      const title = document.createElement('h3');
      title.textContent = 'Mon portfolio';
      portfolio.appendChild(title);

      // Créer le bloc "mes_projets"
      const mesProjets = document.createElement('div');
      mesProjets.classList.add('mes_projets');
      portfolio.appendChild(mesProjets);

      // Parcourir les données du JSON et créer les éléments HTML
      data.forEach((item, index) => {
        const projetUnique = document.createElement('div');
        projetUnique.classList.add('projet_unique');
        projetUnique.setAttribute('data-titre', item.title);

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        img.addEventListener('click', () => {
          openModal(item.src, item.title, item.description);
        });

        projetUnique.appendChild(img);
        mesProjets.appendChild(projetUnique);

        // Ajout du séparateur vertical
        if (index < data.length - 1) {
          const separateur = document.createElement('div');
          separateur.classList.add('vertical-line');
          mesProjets.appendChild(separateur);
        }
      });
    })
    .catch(error => console.error('Erreur lors du chargement des données :', error));

});
