const MALLS_ENDPOINT = "./BAHjet/malls.json";

function loadMallGuide() {
    return window.BAHjetGuide.loadSimpleGuide(MALLS_ENDPOINT, {
        containerId: "mall-cards",
        emptyId: "mall-empty",
        statusId: "mall-status",
        sectionName: "mall",
        loadingMessage: "Loading mall guide...",
        nameKey: "mall_name",
        accentColor: "bg-[#54CCC9]",
        decorationSrc: "./images/BAHjet/mall.svg",
        decorationAlt: "Mall card decoration",
        showPrice: false,
    });
}

document.addEventListener("DOMContentLoaded", loadMallGuide);
