// Services Array
const services = [
    {
        name: { en: "Nail Trimming", sv: "Kloklippning" },
        image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
        priceUSD: 20
    },
    {
        name: { en: "Grooming", sv: "Pälsvård" },
        image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
        priceUSD: 40
    },
    {
        name: { en: "Dog Massage", sv: "Hundmassage" },
        image: "https://www.amaspachattanooga.com/wp-content/uploads/2019/10/Massage-Is-Good-for-Your-Dog-1024x1024.jpg",
        priceUSD: 30
    },
    {
        name: { en: "Obedience Training", sv: "Lydnadsträning" },
        image: "https://images.pexels.com/photos/7210635/pexels-photo-7210635.jpeg",
        priceUSD: 50
    },
    {
        name: { en: "Daycare", sv: "Dagis" },
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
        priceUSD: 25
    },
    {
        name: { en: "Overnight Boarding", sv: "Nattboende" },
        image: "https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg",
        priceUSD: 60
    },
    {
        name: { en: "Dog Walking", sv: "Promenad" },
        image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
        priceUSD: 15
    },
    {
        name: { en: "Playtime Activities", sv: "Lekaktiviteter" },
        image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
        priceUSD: 20
    }
];

// Global Translations
const translations = {
    en: {
        navHome: "Home",
        navAbout: "About Us",
        navServices: "Services",
        navBrand: "Paws Paradise",
        pageTitle: "Our Services",
        pageDescription: "At Paws Paradise, we offer a variety of services to keep your furry friends happy, healthy, and active!",
        cartTitle: "Your Cart",
        cartEmpty: "No items in the cart yet.",
        welcomeTitle: "Welcome to Paws Paradise Dog Daycare!",
        welcomeDescription: "We care for your furry friend with love and expertise.",
        aboutTitle: "About Us",
        aboutDescription: "At Paws Paradise, we treat every dog like family. Our mission is to provide a safe, fun, and loving environment where your furry friend can thrive.",
        contactTitle: "Contact Us",
        addressLabel: "Address:",
        phoneLabel: "Phone:",
        emailLabel: "Email:",
        findUsTitle: "Find Us"
    },
    sv: {
        navHome: "Hem",
        navAbout: "Om Oss",
        navServices: "Tjänster",
        navBrand: "Paws Paradise",
        pageTitle: "Våra Tjänster",
        pageDescription: "På Paws Paradise erbjuder vi olika tjänster för att hålla dina lurviga vänner glada, friska och aktiva!",
        cartTitle: "Din Kundvagn",
        cartEmpty: "Inga varor i kundvagnen ännu.",
        welcomeTitle: "Välkommen till Paws Paradise Hunddagis!",
        welcomeDescription: "Vi tar hand om din lurviga vän med kärlek och omsorg.",
        aboutTitle: "Om Oss",
        aboutDescription: "På Paws Paradise behandlar vi varje hund som familj. Vårt uppdrag är att erbjuda en säker, rolig och kärleksfull miljö där din vän kan trivas.",
        contactTitle: "Kontakta Oss",
        addressLabel: "Adress:",
        phoneLabel: "Telefon:",
        emailLabel: "E-post:",
        findUsTitle: "Hitta Oss"
    }
};
// Global State
let currentLanguage = localStorage.getItem("preferredLanguage") || "en"; // Load saved language or default to "en"
let currentCurrency = currentLanguage === "sv" ? "SEK" : "USD";
let cart = [];
// Correct the price display in the cart
function updateCart() {
    const cartContainer = document.getElementById("cart");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        const emptyMessage = translations[currentLanguage].cartEmpty;
        cartContainer.innerHTML = `<p>${emptyMessage}</p>`;
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const price = convertCurrency(item.priceUSD, currentCurrency);
        total += price;
        cartContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name[currentLanguage]} - ${formatCurrency(price, currentCurrency)}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name[currentLanguage]}')">Remove</button>
            </div>
        `;
    });

    cartContainer.innerHTML += `<p><strong>Total: ${formatCurrency(total, currentCurrency)}</strong></p>`;
}
// Apply Translations
function applyTranslations(language) {
    currentLanguage = language;
    currentCurrency = language === "sv" ? "SEK" : "USD";

    // Save the selected language
    localStorage.setItem("preferredLanguage", language);

    // Update all translatable elements
    for (const key in translations[language]) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[language][key];
        }
    }

    // Dynamically update the page <title>
    if (translations[language].pageTitle) {
        document.title = translations[language].pageTitle;
    }

    // Update dynamic content (services and cart) if applicable
    if (document.getElementById("services")) displayServices();
    if (document.getElementById("cart")) updateCart();
}

// Display Services
function displayServices() {
    const servicesContainer = document.getElementById("services");
    if (!servicesContainer) {
        console.error("Services container not found.");
        return;
    }

    servicesContainer.innerHTML = "";

    services.forEach(service => {
        const price = convertCurrency(service.priceUSD, currentCurrency);
        servicesContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${service.image}" class="card-img-top" alt="${service.name[currentLanguage]}">
                    <div class="card-body">
                        <h5 class="card-title">${service.name[currentLanguage]}</h5>
                        <p class="card-text">Price: ${formatCurrency(price, currentCurrency)}</p>
                        <button class="btn btn-primary" onclick="addToCart('${service.name[currentLanguage]}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Convert Currency
function convertCurrency(priceUSD, currency) {
    const exchangeRate = 10.5; // Example: 1 USD = 10.5 SEK
    return currency === "SEK" ? priceUSD * exchangeRate : priceUSD;
}

// Format Currency
function formatCurrency(amount, currency) {
    return currency === "SEK" ? `${amount.toFixed(2)} kr` : `$${amount.toFixed(2)}`;
}

// Add Service to Cart
function addToCart(serviceName) {
    const service = services.find(s => s.name[currentLanguage] === serviceName);
    if (service) {
        cart.push(service);
        updateCart();
    }
}

// Remove Service from Cart
function removeFromCart(serviceName) {
    const serviceIndex = cart.findIndex(s => s.name[currentLanguage] === serviceName);
    if (serviceIndex !== -1) {
        cart.splice(serviceIndex, 1);
        updateCart();
    }
}

// Update Cart
function updateCart() {
    const cartContainer = document.getElementById("cart");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        const emptyMessage = translations[currentLanguage].cartEmpty;
        cartContainer.innerHTML = `<p>${emptyMessage}</p>`;
        return;
    }
    const checkoutButton = document.createElement("button");
    checkoutButton.className = "btn btn-success mt-3";
    checkoutButton.textContent = "Checkout";
    checkoutButton.onclick = () => {
        alert("Checkout is currently for educational purposes only.");
    };
    
    cartContainer.appendChild(checkoutButton);
    let total = 0;
    cart.forEach(item => {
        const price = convertCurrency(item.priceUSD, currentCurrency);
        total += price;
        cartContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name[currentLanguage]} - ${formatCurrency(price, currentCurrency)}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name[currentLanguage]}')">Remove</button>
            </div>
        `;
    });

    cartContainer.innerHTML += `<p><strong>Total: ${formatCurrency(total, currentCurrency)}</strong></p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    // Load preferred language and apply translations
    document.getElementById("languageSwitcher").value = currentLanguage;
    applyTranslations(currentLanguage);
});

// Handle Language Switching
document.getElementById("languageSwitcher").addEventListener("change", (e) => {
    const selectedLanguage = e.target.value;
    applyTranslations(selectedLanguage);
});