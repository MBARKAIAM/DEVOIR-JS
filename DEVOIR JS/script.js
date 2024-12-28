document.addEventListener("DOMContentLoaded", () => {
  const formulaire = document.getElementById("formulaire-tache");
  const champ = document.getElementById("champ-tache");
  const liste = document.getElementById("liste-taches");
  const boutonToutSupprimer = document.getElementById("tout-supprimer");
  const compteur = document.getElementById("compteur-taches");
  function mettreAJourCompteur() {
      const total = liste.children.length;
      const terminees = document.querySelectorAll(".terminee").length;
      compteur.textContent = `Total : ${total} | Terminées : ${terminees}`;
  }

  function sauvegarderTaches() {
      const taches = Array.from(liste.children).map(li => ({
          texte: li.firstChild.textContent,
          terminee: li.classList.contains("terminee"),
      }));
      localStorage.setItem("taches", JSON.stringify(taches));
  }

  function chargerTaches() {
      const taches = JSON.parse(localStorage.getItem("taches")) || [];
      taches.forEach(({ texte, terminee }) => {
          ajouterTache(texte, terminee);
      });
  }

  function ajouterTache(texte, estTerminee = false) {
      const tache = document.createElement("li");
      tache.textContent = texte;

      if (estTerminee) {
          tache.classList.add("terminee");
      }

      tache.addEventListener("click", () => {
        if (tache.classList.contains("terminee")) {
            tache.classList.remove("terminee");
        } else {
            tache.classList.add("terminee");
        }
        mettreAJourCompteur();
        sauvegarderTaches();
    });
    

      const boutonSupprimer = document.createElement("button");
      boutonSupprimer.textContent = "Supprimer";
      boutonSupprimer.addEventListener("click", () => {
          tache.remove();
          mettreAJourCompteur();
          sauvegarderTaches();
      });

      tache.appendChild(boutonSupprimer);
      liste.appendChild(tache);

      mettreAJourCompteur();
  }

  formulaire.addEventListener("submit", (evenement) => {
      evenement.preventDefault();
      const texte = champ.value.trim();
      if (texte === "") return;

      ajouterTache(texte);
      champ.value = "";
      sauvegarderTaches();
  });
  boutonToutSupprimer.addEventListener("click", () => {
      liste.innerHTML = "";
      mettreAJourCompteur();
      sauvegarderTaches();
  });

  chargerTaches();
});
