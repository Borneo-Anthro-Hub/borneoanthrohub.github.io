const DISTANCE_ICON_LABELS = {
    walk: "walk",
    car: "car",
};

const STATUS_BASE_CLASSES =
    "mx-auto mt-8 w-full max-w-[1260px] rounded-[20px] border px-5 py-4 text-center text-base leading-[1.6]";
const STATUS_NEUTRAL_CLASSES =
    "border-[#4F362F]/20 bg-[#FFFBE8]/70 text-[#4F362F]";
const STATUS_ERROR_CLASSES =
    "border-[#A94A47]/30 bg-[#FFFBE8]/70 text-[#A94A47]";

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
        return `<svg class="block h-[20px] w-[20px]" aria-label="${escapeHtml(fallbackLabel)}" role="img" viewBox="0 0 12 20"><use href="#icon_walk"></use></svg>`;
    }

    if (iconKey === "car") {
        return `<svg class="block h-[20px] w-[20px]" aria-label="${escapeHtml(fallbackLabel)}" role="img" viewBox="0 0 27 13"><use href="#icon_car"></use></svg>`;
    }

    return `<img class="block h-[20px] w-[20px] object-contain" src="./images/BAHjet/icon_${escapeHtml(iconKey)}.svg" alt="${escapeHtml(fallbackLabel)}" loading="lazy" />`;
}

function renderGuideCards(items, options) {
    const {
        containerId,
        emptyId,
        nameKey,
        accentColor,
        decorationSrc,
        decorationAlt,
        showPrice = false,
    } = options;
    const cardsContainer = document.getElementById(containerId);
    const emptyStateEl = document.getElementById(emptyId);

    if (!cardsContainer || !emptyStateEl) {
        return;
    }

    if (!Array.isArray(items) || items.length === 0) {
        cardsContainer.innerHTML = "";
        emptyStateEl.hidden = false;
        return;
    }

    emptyStateEl.hidden = true;
    cardsContainer.innerHTML = items
        .map((item) => {
            const safeDescription = escapeHtml(item.desc ?? "").replace(
                /\n/g,
                "<br>",
            );
            const distanceIcon = item.distance_icon ?? "";
            const name = item[nameKey] ?? "";
            const priceMarkup = showPrice
                ? `
                                    <div class="flex flex-wrap items-center justify-center h-[24px]">
                                        ${renderPrice(item.price)}
                                    </div>
                `
                : "";

            return `
                    <article class="relative h-[900px] w-full max-w-[372px] max-[520px]:h-auto max-[520px]:pt-[190px]
                    reveal opacity-0 translate-y-5 transition-all duration-1000 ease-out">
                        <div class="absolute inset-x-0 top-0 z-[2] h-[260px] rounded-t-[200px] ${accentColor} [clip-path:path('M0,230_C209,140_276,400_520,80_L360,0_L0,0_Z')]">
                            <img src="${escapeHtml(decorationSrc)}" alt="${escapeHtml(decorationAlt)}" loading="lazy"
                                class="mx-auto mt-14 block w-[118px] max-w-full" />
                        </div>
                        <div class="absolute left-0 top-[190px] z-[1] flex h-[710px] w-[372px] flex-col overflow-hidden rounded-[32px] bg-[#DDC8AF] text-[#4F362F] shadow-[0_0px_3px_rgba(0,0,0,0.3)] max-[520px]:relative max-[520px]:top-0 max-[520px]:h-auto max-[520px]:min-h-[710px] max-[520px]:w-full">
                            <div class="flex h-full flex-1 flex-col items-center px-[30px] pb-6 pt-[72px] text-center max-[520px]:px-[22px] max-[520px]:pt-16">
                                <p class="mt-4 flex min-h-[88px] max-w-[280px] items-center justify-center text-4xl font-bold leading-[1.2] text-[#4F362F]">
                                    ${escapeHtml(name)}
                                </p>
                                <div class="mt-2 flex min-h-[52px] w-full items-center justify-center">
                                    <div class="mt-5 flex flex-wrap items-center justify-center gap-4">
                                        ${priceMarkup}
                                        <div class="inline-flex items-center gap-1.5 text-sm font-medium text-[#4F362F]">
                                            <span class="inline-flex min-h-[14px] min-w-[14px] items-center justify-center">
                                                ${renderDistanceIcon(distanceIcon)}
                                            </span>
                                            <span>${escapeHtml(item.distance ?? "")}</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="mt-6 w-full flex-1 text-left text-base leading-[1.75] text-[#4F362F]">${safeDescription}</p>
                                <div class="mt-auto w-full pt-6">
                                    <a
                                        class="group flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#4F362F] px-[18px] py-3 text-base font-bold leading-none tracking-[0.06em] text-[#4F362F] uppercase no-underline transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#4F362F] hover:text-[#DDC8AF]"
                                        href="${escapeHtml(item.google_map ?? "#")}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg class="h-[17px] w-[17px] shrink-0 text-[#4F362F] group-hover:text-[#DDC8AF]" aria-hidden="true">
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

async function loadSimpleGuide(endpoint, options) {
    const statusEl = document.getElementById(options.statusId);

    try {
        if (statusEl) {
            statusEl.hidden = false;
            statusEl.textContent = options.loadingMessage;
            statusEl.className = `${STATUS_BASE_CLASSES} ${STATUS_NEUTRAL_CLASSES}`;
        }

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${options.sectionName} data.`);
        }

        const items = getSortedItems(await response.json());
        renderGuideCards(items, options);

        if (statusEl) {
            statusEl.hidden = true;
            statusEl.textContent = "";
        }
    } catch (error) {
        console.error(error);

        if (statusEl) {
            statusEl.hidden = false;
            statusEl.textContent = `Unable to load the ${options.sectionName} guide right now.`;
            statusEl.className = `${STATUS_BASE_CLASSES} ${STATUS_ERROR_CLASSES}`;
        }
    }
}

window.BAHjetGuide = {
    escapeHtml,
    getSortedItems,
    loadSimpleGuide,
    prettifyLabel,
    renderDistanceIcon,
    renderGuideCards,
    renderPrice,
    STATUS_BASE_CLASSES,
    STATUS_ERROR_CLASSES,
    STATUS_NEUTRAL_CLASSES,
};
