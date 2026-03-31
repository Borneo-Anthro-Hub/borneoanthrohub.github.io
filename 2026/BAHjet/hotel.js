const HOTELS_ENDPOINT = "./BAHjet/hotel.json";

function loadHotelGuide() {
    return window.BAHjetGuide.loadSimpleGuide(HOTELS_ENDPOINT, {
        containerId: "hotel-cards",
        emptyId: "hotel-empty",
        statusId: "hotel-status",
        sectionName: "hotel",
        loadingMessage: "Loading hotel guide...",
        nameKey: "hotel_name",
        accentColor: "bg-[#FFCB65]",
        decorationSrc: "./images/BAHjet/hotel_sleep.svg",
        decorationAlt: "Hotel card decoration",
        showPrice: true,
    });
}

document.addEventListener("DOMContentLoaded", loadHotelGuide);
