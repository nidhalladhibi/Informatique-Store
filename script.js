let panier = [];

// Fonction pour afficher le panier avec le bouton de suppression
function afficherPanier() {
    const contenuPanier = document.getElementById('contenuPanier');
    const totalPanier = document.getElementById('totalPanier');

    if (panier.length === 0) {
        contenuPanier.innerHTML = '<p>Le panier est vide.</p>';
        totalPanier.innerHTML = 'Total : 0 TND';
        return;
    }

    // Vider le contenu actuel du panier
    contenuPanier.innerHTML = '';

    let total = 0;
    panier.forEach((produit, index) => {
        const produitDiv = document.createElement('div');
        produitDiv.classList.add('panier-item');
        
        // Ajouter le produit et le bouton de suppression
        produitDiv.innerHTML = `
            <p>${produit.nom} - ${produit.prix} x ${produit.quantite} = ${(produit.quantite * parseFloat(produit.prix.replace(' TND', ''))).toFixed(2)} TND</p>
            <button class="remove-item" data-index="${index}">Supprimer</button>
        `;
        contenuPanier.appendChild(produitDiv);

        // Ajouter au total
        total += produit.quantite * parseFloat(produit.prix.replace(' TND', ''));
    });

    totalPanier.innerHTML = `Total : ${total.toFixed(2)} TND`;

    // Ajouter l'événement de suppression pour chaque bouton "Supprimer"
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            supprimerDuPanier(index);
        });
    });
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(index) {
    // Retirer le produit du panier
    panier.splice(index, 1);

    // Mettre à jour l'affichage du panier
    afficherPanier();
}

// Ajouter un produit au panier
const boutonsPanier = document.querySelectorAll('.add-to-cart');
boutonsPanier.forEach(button => {
    button.addEventListener('click', () => {
        const nom = button.parentElement.querySelector('h3').innerText;
        const prix = button.parentElement.querySelector('p').innerText;

        // Vérifier si le produit est déjà dans le panier
        const produitExistant = panier.find(item => item.nom === nom);
        if (produitExistant) {
            // Incrémenter la quantité
            produitExistant.quantite += 1;
        } else {
            // Ajouter un nouveau produit
            panier.push({ nom, prix, quantite: 1 });
        }

        // Mettre à jour l'affichage du panier
        afficherPanier();
    });
});
