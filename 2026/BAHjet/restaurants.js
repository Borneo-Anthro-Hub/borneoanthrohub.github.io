(() => {
const RESTAURANTS_ENDPOINT = "./BAHjet/restaurants.json";
const FILTERS_ENDPOINT = "./BAHjet/filter.json";
const DISTANCE_ICON_LABELS = {
    walk: "walk",
    car: "car",
};

const restaurantState = {
    activeFilter: "all",
    filters: [],
    restaurants: [],
};

const STATUS_BASE_CLASSES =
    "mx-auto mt-8 w-full max-w-[1260px] rounded-[20px] border px-5 py-4 text-center text-base leading-[1.6]";
const STATUS_NEUTRAL_CLASSES =
    "border-[#4F362F]/20 bg-[#FFFBE8]/70 text-[#4F362F]";
const STATUS_ERROR_CLASSES =
    "border-[#A94A47]/30 bg-[#FFFBE8]/70 text-[#A94A47]";
const FILTER_BUTTON_BASE_CLASSES =
    "inline-flex items-center gap-2.5 rounded-sm border-0 px-3 py-2 transition duration-200 ease-out";
const FILTER_BUTTON_ACTIVE_CLASSES = "bg-[#54CCC9] text-[#1A2B25]";
const FILTER_BUTTON_IDLE_CLASSES =
    "bg-transparent text-[#A88C76] hover:-translate-y-px hover:text-[#4F362F]";

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function prettifyLabel(value) {
    return String(value ?? "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getSortedItems(items) {
    return Array.isArray(items)
        ? [...items].sort(
              (left, right) =>
                  Number(left.index ?? 0) - Number(right.index ?? 0),
          )
        : [];
}

function renderPrice(price) {
    const priceString = String(price ?? "").trim();

    if (!priceString) {
        return '<span class="text-sm leading-none font-bold text-[#4F362F]">N/A</span>';
    }

    return Array.from(priceString)
        .map((character) => {
            if (character === "$") {
                return '<img class="block h-[20px] w-[20px] object-contain" src="./images/BAHjet/icon_money.svg" alt="$" loading="lazy" />';
            }

            if (character.trim() === "") {
                return "";
            }

            return `<span class="text-[20px] leading-none font-bold text-[#4F362F]">${escapeHtml(character)}</span>`;
        })
        .join("");
}

function renderDistanceIcon(distanceIcon) {
    const iconKey = String(distanceIcon ?? "").trim();
    const fallbackLabel =
        DISTANCE_ICON_LABELS[iconKey] || prettifyLabel(iconKey || "distance");

    if (!iconKey) {
        return `<span class="text-base font-[20px] uppercase tracking-[0.08em]">${escapeHtml(fallbackLabel)}</span>`;
    }

    if (iconKey === "walk") {
        return `<svg class="block h-[20px] w-[20px]" aria-label="${escapeHtml(fallbackLabel)}" role="img" viewBox="0 0 32 32"><use href="#icon_walk"></use></svg>`;
    }

    if (iconKey === "car") {
        return `<svg class="block h-[20px] w-[20px]" aria-label="${escapeHtml(fallbackLabel)}" role="img" viewBox="0 0 43.18 32""><use href="#icon_car"></use></svg>`;
    }

    return `<img class="block h-[20px] w-[20px] object-contain" src="./images/BAHjet/icon_${escapeHtml(iconKey)}.svg" alt="${escapeHtml(fallbackLabel)}" loading="lazy" />`;
}

function setRestaurantStatus(message, isError = false) {
    const statusEl = document.getElementById("restaurant-status");

    if (!statusEl) {
        return;
    }

    if (!message) {
        statusEl.hidden = true;
        statusEl.textContent = "";
        return;
    }

    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className = `${STATUS_BASE_CLASSES} ${isError ? STATUS_ERROR_CLASSES : STATUS_NEUTRAL_CLASSES}`;
}

function getFilterMeta(filterId) {
    return (
        restaurantState.filters.find((filter) => filter.id === filterId) ||
        null
    );
}

function renderTagIcons(tagIds) {
    if (!Array.isArray(tagIds) || tagIds.length === 0) {
        return "";
    }

    return tagIds
        .map((tagId) => {
            const filterMeta = getFilterMeta(tagId);
            const iconId = filterMeta?.icon || `icon_${tagId}`;
            const label = filterMeta?.name || prettifyLabel(tagId);

            return `
                    <span class="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#4F362F] bg-[#FFFBE8]/20" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
                        <svg class="h-5 w-5" aria-hidden="true">
                            <use href="#${escapeHtml(iconId)}"></use>
                        </svg>
                    </span>
                `;
        })
        .join("");
}

function renderTypeChips(types) {
    if (!Array.isArray(types) || types.length === 0) {
        return "";
    }

    return types
        .map(
            (type) => `
                <span class="inline-flex min-h-[18px] items-center justify-center rounded-full bg-[#A88C76] px-2 py-1 text-xs font-bold leading-none tracking-[0.06em] text-[#DDC8AF] uppercase">${escapeHtml(type)}</span>
            `,
        )
        .join("");
}

function getFilteredRestaurants() {
    if (restaurantState.activeFilter === "all") {
        return restaurantState.restaurants;
    }

    return restaurantState.restaurants.filter((restaurant) => {
        return (
            Array.isArray(restaurant.res_tag) &&
            restaurant.res_tag.includes(restaurantState.activeFilter)
        );
    });
}

function renderRestaurantFilters() {
    const filterContainer = document.getElementById("restaurant-filters");

    if (!filterContainer) {
        return;
    }

    filterContainer.innerHTML = restaurantState.filters
        .map((filter, index) => {
            const isActive = filter.id === restaurantState.activeFilter;
            const separator =
                index < restaurantState.filters.length - 1
                    ? '<span class="inline-block h-1.25 w-1.25 self-center rounded-full bg-[#DDC8AF]"></span>'
                    : "";

            return `
                    <button
                        type="button"
                        class="${FILTER_BUTTON_BASE_CLASSES} ${isActive ? FILTER_BUTTON_ACTIVE_CLASSES : FILTER_BUTTON_IDLE_CLASSES}"
                        data-filter-id="${escapeHtml(filter.id)}"
                        aria-pressed="${isActive ? "true" : "false"}"
                    >
                        <svg class="h-[17px] w-[17px] shrink-0" aria-hidden="true">
                            <use href="#${escapeHtml(filter.icon)}"></use>
                        </svg>
                        <span>${escapeHtml(filter.name)}</span>
                    </button>
                    ${separator}
                `;
        })
        .join("");

    filterContainer
        .querySelectorAll("[data-filter-id]")
        .forEach((button) => {
            button.addEventListener("click", () => {
                restaurantState.activeFilter =
                    button.getAttribute("data-filter-id") || "all";
                renderRestaurantFilters();
                renderRestaurantCards();
            });
        });
}

function renderRestaurantCards() {
    const cardsContainer = document.getElementById("restaurant-cards");
    const emptyStateEl = document.getElementById("restaurant-empty");
    const restaurants = getFilteredRestaurants();

    if (!cardsContainer || !emptyStateEl) {
        return;
    }

    if (restaurants.length === 0) {
        cardsContainer.innerHTML = "";
        emptyStateEl.hidden = false;
        return;
    }

    emptyStateEl.hidden = true;
    cardsContainer.innerHTML = restaurants
        .map((restaurant) => {
            const safeDescription = escapeHtml(restaurant.desc ?? "").replace(
                /\n/g,
                "<br>",
            );
            const distanceIcon = restaurant.distance_icon ?? "";

            return `
                    <article class="relative h-[900px] w-full max-w-[372px] max-[520px]:h-auto max-[520px]:pt-[190px]
                    reveal opacity-0 translate-y-5 transition-all duration-1000 ease-out">
                        <div class="absolute inset-x-0 top-0 z-[2] h-[260px] rounded-t-[200px] bg-[#E8804D] [clip-path:path('M0,230_C209,140_276,400_520,80_L360,0_L0,0_Z')]">
                            <img src="./images/BAHjet/fork_knife_menu.svg" alt="Restaurant card decoration" loading="lazy"
                                class="mx-auto mt-14 block w-[118px] max-w-full" />
                        </div>
                        <div class="absolute left-0 top-[190px] z-[1] flex h-[710px] w-[372px] flex-col overflow-hidden rounded-[32px] bg-[#DDC8AF] text-[#4F362F] shadow-[0_0px_3px_rgba(0,0,0,0.3)] max-[520px]:relative max-[520px]:top-0 max-[520px]:h-auto max-[520px]:min-h-[710px] max-[520px]:w-full">
                            <div class="flex h-full flex-1 flex-col items-center px-[30px] pb-6 pt-[72px] text-center max-[520px]:px-[22px] max-[520px]:pt-16">
                                <div class="flex min-h-[52px] flex-wrap items-center justify-center gap-2">
                                    ${renderTagIcons(restaurant.res_tag)}
                                </div>
                                <p class="mt-4 flex min-h-[88px] max-w-[280px] items-center justify-center text-4xl font-bold leading-[1.2] text-[#4F362F]">
                                    ${escapeHtml(restaurant.name)}
                                </p>
                                <div class="mt-2 flex min-h-[52px] flex-wrap content-start justify-center gap-1.5 text-base font-medium">
                                    ${renderTypeChips(restaurant.res_type)}
                                </div>
                                <div class="mt-5 flex flex-wrap items-center justify-center gap-4">
                                    <div class="flex flex-wrap items-center justify-center h-[24px]">
                                        ${renderPrice(restaurant.price)}
                                    </div>
                                    <div class="inline-flex items-center gap-1.5 text-sm font-medium text-[#4F362F]">
                                        <span class="inline-flex min-h-[14px] min-w-[14px] items-center justify-center">
                                            ${renderDistanceIcon(distanceIcon)}
                                            </span>
                                        <span>${escapeHtml(restaurant.distance ?? "")}</span>
                                    </div>
                                </div>
                                <p class="mt-6 w-full flex-1 text-left text-base leading-[1.75] text-[#4F362F]">${safeDescription}</p>
                                <div class="mt-auto w-full pt-6">
                                    <a
                                        class="group flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#4F362F] px-[18px] py-3 text-base font-bold leading-none tracking-[0.06em] text-[#4F362F] uppercase no-underline transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#4F362F] hover:text-[#DDC8AF]"
                                        href="${escapeHtml(restaurant.google_map ?? "#")}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg class="h-[17px] w-[17px] shrink-0 text-[#4F362F] group-hover:text-[#DDC8AF]" role="img" viewBox="0 0 32 32" aria-hidden="true">
                                            <use href="#map_pin"></use>
                                        </svg>
                                        <span>TAKE ME THERE!</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
        })
        .join("");

    if (typeof window.observeRevealElements === "function") {
        window.observeRevealElements(cardsContainer);
    }
}

async function loadRestaurantGuide() {
    try {
        const [filtersResponse, restaurantsResponse] = await Promise.all([
            fetch(FILTERS_ENDPOINT),
            fetch(RESTAURANTS_ENDPOINT),
        ]);

        if (!filtersResponse.ok || !restaurantsResponse.ok) {
            throw new Error("Failed to fetch restaurant guide data.");
        }

        const [filters, restaurants] = await Promise.all([
            filtersResponse.json(),
            restaurantsResponse.json(),
        ]);

        restaurantState.filters = Array.isArray(filters) ? filters : [];
        restaurantState.restaurants = getSortedItems(restaurants);
        restaurantState.activeFilter =
            restaurantState.filters.find((filter) => filter.id === "all")?.id ||
            restaurantState.filters[0]?.id ||
            "all";

        renderRestaurantFilters();
        renderRestaurantCards();
        setRestaurantStatus("");
    } catch (error) {
        console.error(error);
        setRestaurantStatus(
            "Unable to load the restaurant guide right now. If you're previewing the file locally, please open it through a local server so the JSON files can be fetched.",
            true,
        );
    }
}

document.addEventListener("DOMContentLoaded", loadRestaurantGuide);
})();
