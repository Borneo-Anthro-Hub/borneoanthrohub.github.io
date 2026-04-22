(() => {
    const MARKDOWN_ENDPOINT = "./travelinfo.md";
    const HIGHLIGHT_COLORS = new Set([
        "yellow",
        "red",
        "green",
        "blue",
        "pink",
        "purple",
        "orange",
        "teal",
    ]);
    let markedExtensionsRegistered = false;
    let tocObserver = null;

    function capitalize(value) {
        const text = String(value ?? "").trim();
        if (!text) {
            return "";
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function registerMarkedExtensions() {
        if (markedExtensionsRegistered || !window.marked?.use) {
            return;
        }

        window.marked.use({
            extensions: [
                {
                    name: "highlight",
                    level: "inline",
                    start(src) {
                        return src.indexOf("==");
                    },
                    tokenizer(src) {
                        const match = src.match(
                            /^==(?:(yellow|red|green|blue|pink|purple|orange|teal)\|)?([\s\S]+?)==/,
                        );

                        if (!match) {
                            return undefined;
                        }

                        const color = HIGHLIGHT_COLORS.has(match[1])
                            ? match[1]
                            : "yellow";

                        return {
                            type: "highlight",
                            raw: match[0],
                            color,
                            tokens: this.lexer.inlineTokens(match[2]),
                        };
                    },
                    renderer(token) {
                        return `<mark class="md-highlight md-highlight--${token.color}">${this.parser.parseInline(token.tokens)}</mark>`;
                    },
                },
                {
                    name: "callout",
                    level: "block",
                    start(src) {
                        return src.indexOf(":::");
                    },
                    tokenizer(src) {
                        const match = src.match(
                            /^:::(warning|info|success|note)(?:\s+([^\n]+))?\n([\s\S]+?)\n:::(?:\n|$)/,
                        );

                        if (!match) {
                            return undefined;
                        }

                        const variant = match[1];
                        const title = match[2]?.trim() || capitalize(variant);
                        const body = match[3].trim();

                        return {
                            type: "callout",
                            raw: match[0],
                            variant,
                            title,
                            tokens: this.lexer.blockTokens(body),
                        };
                    },
                    renderer(token) {
                        return `
                            <section class="md-callout md-callout--${token.variant}">
                                <div class="md-callout__title">${token.title}</div>
                                <div class="md-callout__body">${this.parser.parse(token.tokens)}</div>
                            </section>
                        `;
                    },
                },
            ],
        });

        markedExtensionsRegistered = true;
    }

    function slugify(value) {
        return String(value ?? "")
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }

    function assignHeadingIds(container) {
        const headings = Array.from(
            container.querySelectorAll("h2, h3"),
        );
        const usedIds = new Map();

        headings.forEach((heading) => {
            const baseId = slugify(heading.textContent) || "section";
            const seen = usedIds.get(baseId) ?? 0;
            const nextCount = seen + 1;
            usedIds.set(baseId, nextCount);
            heading.id = nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
        });

        return headings;
    }

    function buildTableOfContents(headings) {
        const tocEl = document.getElementById("travel-info-toc");
        const listEl = document.getElementById("travel-info-toc-list");
        const mobileListEl = document.getElementById("travel-info-toc-mobile-list");
        const mobileBarEl = document.getElementById("travel-info-toc-mobile-bar");

        if (!tocEl || !listEl || !mobileListEl || !mobileBarEl) {
            return;
        }

        if (!Array.isArray(headings) || headings.length === 0) {
            tocEl.hidden = true;
            listEl.innerHTML = "";
            mobileListEl.innerHTML = "";
            mobileBarEl.hidden = true;
            return;
        }

        const sections = [];
        let currentSection = null;

        headings.forEach((heading) => {
            const item = {
                id: heading.id,
                label: heading.textContent.trim(),
            };

            if (heading.tagName === "H2") {
                currentSection = { ...item, children: [] };
                sections.push(currentSection);
                return;
            }

            if (!currentSection) {
                currentSection = { id: "overview", label: "Overview", children: [] };
                sections.push(currentSection);
            }

            currentSection.children.push(item);
        });

        const markup = `
            <ol class="travel-toc__list">
                ${sections
                    .map(
                        (section) => `
                            <li class="travel-toc__item">
                                <a class="travel-toc__link" href="#${section.id}">${section.label}</a>
                                ${
                                    section.children.length > 0
                                        ? `
                                            <ol class="travel-toc__sublist">
                                                ${section.children
                                                    .map(
                                                        (child) => `
                                                            <li class="travel-toc__item">
                                                                <a class="travel-toc__link travel-toc__link--level-3" href="#${child.id}">${child.label}</a>
                                                            </li>
                                                        `,
                                                    )
                                                    .join("")}
                                            </ol>
                                        `
                                        : ""
                                }
                            </li>
                        `,
                    )
                    .join("")}
            </ol>
        `;
        listEl.innerHTML = markup;
        mobileListEl.innerHTML = markup;
        tocEl.hidden = false;
        mobileBarEl.hidden = false;
    }

    function setTocOpenState(isOpen) {
        const tocEl = document.getElementById("travel-info-toc");
        const toggleEl = document.getElementById("travel-info-toc-toggle");
        const labelEl = toggleEl?.querySelector(".travel-toc__toggle-label");

        if (!tocEl || !toggleEl || !labelEl) {
            return;
        }

        tocEl.classList.toggle("is-open", isOpen);
        toggleEl.setAttribute("aria-expanded", String(isOpen));
        labelEl.textContent = isOpen ? "Close" : "Open";
    }

    function setMobileTocOpenState(isOpen) {
        const overlayEl = document.getElementById("travel-info-toc-mobile-overlay");

        if (!overlayEl) {
            return;
        }

        overlayEl.hidden = !isOpen;
        overlayEl.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("travel-toc-mobile-open", isOpen);
    }

    function setupTocToggle() {
        const tocEl = document.getElementById("travel-info-toc");
        const toggleEl = document.getElementById("travel-info-toc-toggle");
        const mediaQuery = window.matchMedia("(max-width: 1023px)");
        const labelEl = toggleEl?.querySelector(".travel-toc__toggle-label");

        if (!tocEl || !toggleEl || !labelEl) {
            return;
        }

        function syncState() {
            if (mediaQuery.matches) {
                setTocOpenState(false);
                setMobileTocOpenState(false);
                return;
            }

            tocEl.classList.remove("is-open");
            toggleEl.setAttribute("aria-expanded", "true");
            labelEl.textContent = "Open";
            setMobileTocOpenState(false);
        }

        if (!toggleEl.dataset.bound) {
            toggleEl.addEventListener("click", () => {
                const isOpen = !tocEl.classList.contains("is-open");
                setTocOpenState(isOpen);
            });

            tocEl.addEventListener("click", (event) => {
                const link = event.target.closest(".travel-toc__link");

                if (!link || !mediaQuery.matches) {
                    return;
                }

                setTocOpenState(false);
            });

            mediaQuery.addEventListener("change", syncState);
            toggleEl.dataset.bound = "true";
        }

        syncState();
    }

    function setupMobileTocDrawer() {
        const openButtons = Array.from(
            document.querySelectorAll("#travel-info-toc-mobile-open, #travel-info-toc-mobile-open-icon"),
        );
        const closeButton = document.getElementById("travel-info-toc-mobile-close");
        const backdrop = document.getElementById("travel-info-toc-mobile-backdrop");
        const mobileList = document.getElementById("travel-info-toc-mobile-list");

        if (!closeButton || !backdrop || !mobileList || openButtons.length === 0) {
            return;
        }

        if (!closeButton.dataset.bound) {
            openButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    setMobileTocOpenState(true);
                });
            });

            closeButton.addEventListener("click", () => {
                setMobileTocOpenState(false);
            });

            backdrop.addEventListener("click", () => {
                setMobileTocOpenState(false);
            });

            mobileList.addEventListener("click", (event) => {
                const link = event.target.closest(".travel-toc__link");

                if (!link) {
                    return;
                }

                setMobileTocOpenState(false);
            });

            closeButton.dataset.bound = "true";
        }
    }

    function setupMobileTocFooterAvoidance() {
        const mobileBarEl = document.getElementById("travel-info-toc-mobile-bar");
        const footerHostEl = document.getElementById("footer");
        const mediaQuery = window.matchMedia("(max-width: 1023px)");

        if (!mobileBarEl || !footerHostEl) {
            return;
        }

        let frameId = null;

        function updateOffset() {
            frameId = null;

            if (!mediaQuery.matches || mobileBarEl.hidden) {
                mobileBarEl.style.removeProperty("--travel-toc-mobile-offset");
                return;
            }

            const footerBoundaryEl = footerHostEl.querySelector("footer") || footerHostEl;
            const footerTop = footerBoundaryEl.getBoundingClientRect().top;
            const overlap = Math.max(0, window.innerHeight - footerTop);

            mobileBarEl.style.setProperty("--travel-toc-mobile-offset", `${overlap}px`);
        }

        function scheduleUpdate() {
            if (frameId !== null) {
                return;
            }

            frameId = window.requestAnimationFrame(updateOffset);
        }

        if (!mobileBarEl.dataset.footerAware) {
            window.addEventListener("scroll", scheduleUpdate, { passive: true });
            window.addEventListener("resize", scheduleUpdate);
            window.addEventListener("load", scheduleUpdate);
            mediaQuery.addEventListener("change", scheduleUpdate);

            const footerObserver = new MutationObserver(scheduleUpdate);
            footerObserver.observe(footerHostEl, { childList: true, subtree: true });

            mobileBarEl.dataset.footerAware = "true";
        }

        scheduleUpdate();
    }

    function highlightActiveTocLink(id) {
        const links = Array.from(document.querySelectorAll(".travel-toc__link"));
        let activeLink = null;

        links.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
                activeLink = link;
            }
        });

        if (activeLink && window.matchMedia("(max-width: 1023px)").matches) {
            activeLink.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }

    function setupTocScrollspy(headings) {
        if (tocObserver) {
            tocObserver.disconnect();
        }

        if (!Array.isArray(headings) || headings.length === 0) {
            return;
        }

        const visibleHeadings = new Map();

        tocObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
                    } else {
                        visibleHeadings.delete(entry.target.id);
                    }
                });

                let activeId = headings[0].id;

                if (visibleHeadings.size > 0) {
                    activeId = [...visibleHeadings.entries()]
                        .sort((left, right) => Math.abs(left[1]) - Math.abs(right[1]))[0][0];
                } else {
                    const passedHeadings = headings.filter(
                        (heading) => heading.getBoundingClientRect().top <= 140,
                    );

                    if (passedHeadings.length > 0) {
                        activeId = passedHeadings[passedHeadings.length - 1].id;
                    }
                }

                highlightActiveTocLink(activeId);
            },
            {
                rootMargin: "-15% 0px -70% 0px",
                threshold: [0, 1],
            },
        );

        headings.forEach((heading) => tocObserver.observe(heading));
        highlightActiveTocLink(headings[0].id);
    }

    async function loadTravelInfo() {
        const contentEl = document.getElementById("travel-info-content");
        const statusEl = document.getElementById("travel-info-status");

        if (!contentEl || !statusEl) {
            return;
        }

        try {
            const response = await fetch(MARKDOWN_ENDPOINT);

            if (!response.ok) {
                throw new Error("Failed to load travel markdown.");
            }

            if (!window.marked?.parse) {
                throw new Error("Marked parser is unavailable.");
            }

            registerMarkedExtensions();

            const markdown = await response.text();
            const rendered = window.marked.parse(markdown, {
                breaks: true,
                gfm: true,
            });

            contentEl.innerHTML = rendered;
            const headings = assignHeadingIds(contentEl);
            buildTableOfContents(headings);
            setupTocToggle();
            setupMobileTocDrawer();
            setupMobileTocFooterAvoidance();
            setupTocScrollspy(headings);
            statusEl.hidden = true;
            statusEl.textContent = "";

            if (typeof window.observeRevealElements === "function") {
                window.observeRevealElements(contentEl);
            }
        } catch (error) {
            console.error(error);
            statusEl.hidden = false;
            statusEl.textContent =
                "Unable to load the travel guide right now.";
            contentEl.innerHTML = "";
        }
    }

    document.addEventListener("DOMContentLoaded", loadTravelInfo);
})();
