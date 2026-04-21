(() => {
const DESTINATIONS_ENDPOINT = "./BAHjet/destinations.json";

const ACTIVE_DOT_CLASSES =
    "dot_byland h-3 w-3 rounded-full bg-[#FF6E6E] ring-4 ring-red-100 transition-all";
const IDLE_DOT_CLASSES =
    "dot_byland h-3 w-3 rounded-full bg-stone-300 transition-all";

function renderActivities(activities) {
    if (!Array.isArray(activities) || activities.length === 0) {
        return "";
    }

    return activities
        .map((activity, index) => {
            const divider =
                index < activities.length - 1
                    ? `
                        <div class="col-span-full">
                            <hr class="my-5 border-0 border-t-[3.5px] border-dotted border-[#A88C76]" />
                        </div>
                    `
                    : "";

            return `
                <div class="flex justify-center md:justify-start">
                    <img src="./images/BAHjet/highlight.svg" alt="highlight" class="w-[88px] max-w-full shrink-0" />
                </div>
                <div class="text-center md:text-left">
                    <p class="pb-2 text-xl font-bold text-[#FFFBE8] tracking-wide uppercase">
                        ${window.BAHjetGuide.escapeHtml(activity.activities_name ?? "")}
                    </p>
                    <p class="text-sm tracking-[0.01em] font-light italic text-[#DDC8AF]">
                        ${window.BAHjetGuide.escapeHtml(activity.activities_desc ?? "")}
                    </p>
                </div>
                ${divider}
            `;
        })
        .join("");
}

function renderDestinationSlides(destinations) {
    return destinations
        .map((destination, index) => {
            const isLastSlide = index === destinations.length - 1;
            const directionAsset = isLastSlide ? "finish.svg" : "arrow.svg";
            const directionAlt = isLastSlide ? "finish deco" : "arrow deco";
            const renovationNotice = destination.under_renovation
                ? `
                <div class="absolute right-20">
                    <div class="reveal opacity-0 -translate-y-10 transition-all duration-700 ease-out delay-800">
                        <p class="rounded-b-lg bg-[#DDC8AF] px-3 font-semibold italic text-[#4F362F]">
                            Under Renovation
                        </p>
                    </div>
                </div>
                `
                : "";
            const safeDescription = window.BAHjetGuide
                .escapeHtml(destination.desc ?? "")
                .replace(/\n/g, "<br>");

            return `
                <div class="slide_byland min-w-full flex flex-col md:flex-row p-8 md:p-12 relative active">
                    <div class="md:w-1/2 rounded-lg overflow-hidden flex flex-col justify-center text-[#FFFBE8]
                    reveal opacity-0 translate-y-10 transition-all duration-700 ease-out delay-600">
                        <div class="flex justify-center my-5">
                            <img src="./images/BAHjet/destinations.svg" class="justify-center" alt="deco destinarions" />
                        </div>
                        <div class="text-center">
                            <p class="text-4xl font-bold">${window.BAHjetGuide.escapeHtml(destination.destinations ?? "")}</p>
                        </div>
                        <div class="flex items-center justify-center gap-2 py-5 text-[#DDC8AF]">
                            <span class="inline-flex min-h-[20px] min-w-[20px] items-center justify-center">
                                ${window.BAHjetGuide.renderDistanceIcon(destination.distance_icon ?? "")}
                            </span>
                            <p>${window.BAHjetGuide.escapeHtml(destination.distance ?? "")}</p>
                        </div>
                        <div class="justify-center font-normal">
                            <p class="leading-[1.8]">${safeDescription}</p>
                        </div>
                        <div class="bottom-1 mt-10 flex justify-center">
                            <img class="justify-center" src="./images/BAHjet/bottom_line.svg" alt="deco line" />
                        </div>
                    </div>
                    <div class="md:w-1/2 md:pl-12 flex flex-col justify-center mt-8 md:mt-0">
                        <div class="slide-content delay-300 reveal opacity-0 -translate-y-10 transition-all duration-800 ease-out delay-600">
                            <div class="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[88px_minmax(0,1fr)]">
                                ${renderActivities(destination.activities)}
                                <div class="col-span-full mt-auto w-full pt-6">
                                    <a class="group flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#DDC8AF] px-[18px] py-3 text-base font-medium leading-none tracking-widest text-[#DDC8AF] uppercase no-underline transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#DDC8AF] hover:text-[#4F362F]"
                                        href="${window.BAHjetGuide.escapeHtml(destination.google_map ?? "#")}"
                                        target="_blank" rel="noopener noreferrer">
                                        <svg class="h-[17px] w-[17px] shrink-0 text-[#DDC8AF] group-hover:text-[#4F362F]" role="img" viewBox="0 0 32 32" aria-hidden="true">
                                            <use href="#map_pin"></use>
                                        </svg>
                                        <span>TAKE ME THERE!</span>
                                    </a>
                                    ${renovationNotice}
                                </div>
                            </div>
                            <br><br>
                        </div>
                        <div class="absolute bottom-6 right-6 mr-3 reveal opacity-0 -translate-x-10 transition-all duration-700 ease-out delay-800">
                            <img src="./images/BAHjet/${directionAsset}" alt="${directionAlt}" class="h-8 w-auto" />
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
}

function renderDots(count) {
    return Array.from({ length: count }, (_, index) => {
        const classes = index === 0 ? ACTIVE_DOT_CLASSES : IDLE_DOT_CLASSES;

        return `<button type="button" class="${classes}" data-destination-dot="${index}" aria-label="Go to destination ${index + 1}"></button>`;
    }).join("");
}

function setupDestinationCarousel(destinations) {
    const carouselEl = document.getElementById("destination-carousel");
    const trackEl = document.getElementById("main-track-by-land");
    const dotsEl = document.getElementById("dots-container-by-land");
    const controlsEl = document.getElementById("destination-controls");
    const prevButtons = Array.from(
        document.querySelectorAll('[data-destination-nav="prev"]'),
    );
    const nextButtons = Array.from(
        document.querySelectorAll('[data-destination-nav="next"]'),
    );

    if (!carouselEl || !trackEl || !dotsEl || !controlsEl) {
        return;
    }

    let currentIndex = 0;
    let touchStartX = 0;
    const totalSlides = destinations.length;

    trackEl.innerHTML = renderDestinationSlides(destinations);
    dotsEl.innerHTML = renderDots(totalSlides);
    carouselEl.hidden = false;
    controlsEl.hidden = totalSlides <= 1;

    const slides = () => Array.from(trackEl.querySelectorAll(".slide_byland"));
    const dots = () => Array.from(dotsEl.querySelectorAll("[data-destination-dot]"));
    let resizeFrame = 0;

    function syncCarouselHeight() {
        const activeSlide = slides()[currentIndex];

        if (!activeSlide) {
            return;
        }

        carouselEl.style.height = `${activeSlide.offsetHeight}px`;
    }

    function scheduleHeightSync() {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
            syncCarouselHeight();
        });
    }

    function updateUI() {
        trackEl.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides().forEach((slide, index) => {
            slide.classList.toggle("active", index === currentIndex);
        });

        dots().forEach((dot, index) => {
            dot.className = index === currentIndex ? ACTIVE_DOT_CLASSES : IDLE_DOT_CLASSES;
        });

        scheduleHeightSync();
    }

    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
        updateUI();
    }

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => changeSlide(-1));
    });
    nextButtons.forEach((button) => {
        button.addEventListener("click", () => changeSlide(1));
    });

    dotsEl.addEventListener("click", (event) => {
        const target = event.target.closest("[data-destination-dot]");

        if (!target) {
            return;
        }

        currentIndex = Number(target.dataset.destinationDot ?? 0);
        updateUI();
    });

    trackEl.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true },
    );

    trackEl.addEventListener(
        "touchend",
        (event) => {
            const touchEndX = event.changedTouches[0].screenX;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > 50) {
                changeSlide(difference > 0 ? 1 : -1);
            }
        },
        { passive: true },
    );

    trackEl.querySelectorAll("img").forEach((image) => {
        if (!image.complete) {
            image.addEventListener("load", scheduleHeightSync, { once: true });
            image.addEventListener("error", scheduleHeightSync, { once: true });
        }
    });

    window.addEventListener("resize", scheduleHeightSync);
    window.addEventListener("load", scheduleHeightSync, { once: true });

    updateUI();

    if (typeof window.observeRevealElements === "function") {
        window.observeRevealElements(trackEl);
    }
}

async function loadDestinations() {
    const statusEl = document.getElementById("destination-status");
    const emptyEl = document.getElementById("destination-empty");

    try {
        const response = await fetch(DESTINATIONS_ENDPOINT);

        if (!response.ok) {
            throw new Error("Failed to fetch destinations data.");
        }

        const destinations = window.BAHjetGuide.getSortedItems(await response.json());

        if (!Array.isArray(destinations) || destinations.length === 0) {
            if (statusEl) {
                statusEl.hidden = true;
            }

            if (emptyEl) {
                emptyEl.hidden = false;
            }

            return;
        }

        setupDestinationCarousel(destinations);

        if (statusEl) {
            statusEl.hidden = true;
            statusEl.textContent = "";
        }

        if (emptyEl) {
            emptyEl.hidden = true;
        }
    } catch (error) {
        console.error(error);

        if (statusEl) {
            statusEl.hidden = false;
            statusEl.textContent = "Unable to load destinations right now.";
            statusEl.className = `${window.BAHjetGuide.STATUS_BASE_CLASSES} ${window.BAHjetGuide.STATUS_ERROR_CLASSES}`;
        }

        if (emptyEl) {
            emptyEl.hidden = true;
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDestinations);
})();
