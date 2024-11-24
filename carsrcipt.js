document.addEventListener("DOMContentLoaded", () => {
    // Récupérer toutes les images de la galerie
    const images = document.querySelectorAll('.photo-item img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const modalCloseBtn = document.querySelector('.close');  // Renommé pour éviter le conflit

    // Vérification pour s'assurer que le bouton de fermeture est bien sélectionné
    if (!modalCloseBtn) {
        console.log("Le bouton de fermeture n'a pas été trouvé !");
    } else {
        console.log("Le bouton de fermeture a été trouvé et l'événement va être ajouté.");
    }

    // Ajouter un événement au clic pour chaque image
    images.forEach((img) => {
        img.addEventListener('click', () => {
            // Ouvrir la modale
            modal.style.display = 'block';

            // Afficher l'image dans la modale
            modalImg.src = img.src;

        });
    });

    // Fermer la modale si l'utilisateur clique en dehors de l'image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Gestion des filtres dans la galerie
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            galleryItems.forEach(item => {
                if (category === "all" || item.getAttribute("data-category") === category) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Smooth scrolling pour les liens de la barre de navigation
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            if (link.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(link.hash);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Smooth scrolling pour le bouton "Discover Gallery"
    const discoverGalleryBtn = document.getElementById("discover-gallery");
    if (discoverGalleryBtn) { // Vérifie si le bouton existe avant de lier l'événement
        discoverGalleryBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const gallerySection = document.querySelector("#gallery");
            gallerySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    // Gestion du menu burger
    const sidenav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    openBtn.onclick = function(event) {
        event.preventDefault(); // Empêche le comportement de remonter la page
        sidenav.classList.add("active"); // Ouvre le menu
        document.body.style.overflow = 'hidden'; // Empêche le défilement de la page quand le menu est ouvert
    };

    closeBtn.onclick = function() {
        sidenav.classList.remove("active"); // Ferme le menu
        document.body.style.overflow = 'auto'; // Réactive le défilement de la page
    };

// Empêche de remonter la page lors du clic dans le menu burger
    document.querySelectorAll("#mySidenav a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Empêche le comportement par défaut
            const targetId = link.getAttribute("href").substring(1); // Extraire l'ID du lien
            const target = document.getElementById(targetId);

            if (target) {
                // Scroll fluide vers la section
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            sidenav.classList.remove("active"); // Ferme le menu après le clic
            document.body.style.overflow = 'auto'; // Réactive le défilement de la page
        });
    });
});
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const heroSection = document.querySelector(".hero");

    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Vérifie si la section hero est encore visible
    if (heroBottom > 0) {
        navbar.classList.add("transparent");
        navbar.classList.remove("scrolled");
    } else {
        navbar.classList.remove("transparent");
        navbar.classList.add("scrolled");
    }
});
