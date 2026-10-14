"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Drawer } from "@base-ui/react/drawer";
import { useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import DevThemeSwitcher from "@/components/client/DevThemeSwitcher";
import DevSiteStateSwitcher from "@/components/client/DevSiteStateSwitcher";
import { useSiteState } from "@/components/client/SiteStateProvider";
import { navItems } from "@/lib/nav/site-nav";
import { withBasePath } from "@/lib/utils";

// ---- Desktop dropdown styling (Base UI NavigationMenu) ----
const triggerClassName =
  "type-body font-bold flex h-9 items-center gap-1 rounded-full px-3 text-brand-text/80 transition-colors select-none hover:bg-white/10 hover:text-brand-text data-popup-open:bg-white/10 data-popup-open:text-brand-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-accent";

const contentClassName =
  "h-full w-[calc(100vw-40px)] p-2 min-[500px]:w-max min-[500px]:min-w-[230px] " +
  "transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) " +
  "data-starting-style:opacity-0 data-ending-style:opacity-0";

const linkCardClassName =
  "type-body-s flex w-full items-center rounded-md px-3 py-2 text-left text-popover-foreground/80 no-underline hover:bg-brand-subtle hover:text-popover-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand-accent";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isEnabled } = useSiteState();
  // Reference to the sticky header so in-page anchor scrolls can offset below it.
  const headerRef = useRef<HTMLElement>(null);

  const visibleItems = navItems.filter(
    (item) => !item.feature || isEnabled(item.feature),
  );

  // Scroll helper that respects the user's reduced-motion preference.
  const smoothScrollTo = (top: number) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Smooth-scroll to an element by id, offset below the sticky header so the
  // target section isn't hidden underneath it.
  const scrollToHash = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = headerRef.current?.offsetHeight ?? 72;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    smoothScrollTo(top);
  };

  // The logo is the navbar's first item — always return to the top: smooth-
  // scroll when already on the home page, otherwise the link navigates home
  // (which naturally lands at the top).
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollTo(0);
    }
  };

  // For nav links whose href targets an in-page anchor (#...) on the current
  // route, intercept the click and smooth-scroll to it instead of relying on
  // the default (jumpy) hash navigation. Cross-page links are left untouched
  // so Next.js performs the navigation and scrolls to the anchor on arrival.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const path = href.slice(0, hashIndex) || "/";
    const hash = href.slice(hashIndex + 1);
    const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
    if (normalize(path) === normalize(pathname)) {
      e.preventDefault();
      scrollToHash(hash);
    }
  };

  const isActive = (href: string) => {
    // Compare against the base path so hash links (e.g. "/contribution#recruit")
    // still register as active while browsing their parent page.
    const base = (href.split("#")[0] || "/").replace(/\/+$/, "") || "/";
    const current = pathname.replace(/\/+$/, "") || "/";
    return current === base || current.startsWith(`${base}/`);
  };

  return (
    <header
      ref={headerRef}
      className="border-brand-secondary/30 bg-brand-surface sticky top-0 z-20 border-b px-4 py-3 md:px-8"
    >
      <div className="flex items-center">
        {/* Logo — placeholder asset from public/2027_images, swap when final branding lands */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="relative h-9 w-30 shrink-0 md:h-11 md:w-37.5"
        >
          <Image
            src={withBasePath("/2027_images/BAH_logo.svg")}
            alt="Borneo Anthro Hub"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* ---- Desktop navigation: Base UI NavigationMenu with dropdowns ---- */}
        <NavigationMenu.Root className="ml-6 hidden md:block lg:ml-10">
          <NavigationMenu.List className="flex items-center gap-1">
            {visibleItems.map((item) => {
              const topActive =
                isActive(item.href) ||
                item.children?.some((c) => isActive(c.href));
              return (
                <NavigationMenu.Item key={item.href}>
                  {item.children?.length ? (
                    <>
                      <NavigationMenu.Trigger
                        className={`${triggerClassName} ${
                          topActive ? "text-brand-accent" : ""
                        }`}
                      >
                        {item.label}
                        <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                          <ChevronDown className="h-4 w-4" />
                        </NavigationMenu.Icon>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className={contentClassName}>
                        <ul className="m-0 flex list-none flex-col p-0">
                          {item.children
                            .filter((c) => !c.feature || isEnabled(c.feature))
                            .map((child) => (
                              <li key={child.label}>
                                <NavigationMenu.Link
                                  render={(props) => (
                                    <Link
                                      {...props}
                                      href={child.href}
                                      onClick={(e) => {
                                        // Smooth-scroll to the anchor when the
                                        // child targets the current page, then
                                        // let the menu close as usual.
                                        handleNavClick(e, child.href);
                                        props.onClick?.(e);
                                      }}
                                    />
                                  )}
                                  className={linkCardClassName}
                                >
                                  {child.label}
                                </NavigationMenu.Link>
                              </li>
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link
                      active={topActive}
                      render={(props) => (
                        <Link
                          {...props}
                          href={item.href}
                          onClick={(e) => {
                            handleNavClick(e, item.href);
                            props.onClick?.(e);
                          }}
                        />
                      )}
                      className={`${triggerClassName} ${
                        topActive ? "text-brand-accent" : ""
                      }`}
                    >
                      {item.label}
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>

          {/* Shared dropdown portal for all menu items */}
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              sideOffset={10}
              collisionPadding={{ top: 5, bottom: 5, left: 12, right: 12 }}
              className="h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) data-instant:transition-none"
              style={{
                ["--duration" as string]: "0.2s",
                ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <NavigationMenu.Popup className="border-border bg-popover text-popover-foreground relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border shadow-lg transition-[opacity,transform,width,height] duration-(--duration) ease-(--easing) outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
                <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        {/* Right side: dev tools + hamburger */}
        <div className="ml-auto flex items-center gap-3">
          {/* Dev-only switchers */}
          {process.env.NODE_ENV === "development" && (
            <>
              <DevThemeSwitcher />
              <DevSiteStateSwitcher />
            </>
          )}

          {/* ---- Mobile drawer (controlled, right side) ---- */}
          <Drawer.Root
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            swipeDirection="right"
          >
            <Drawer.Trigger
              aria-label={
                drawerOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="text-brand-text hover:text-brand-accent flex size-9 items-center justify-center rounded transition-colors md:hidden"
            >
              {drawerOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs" />
              {/* Viewport = full-screen positioning container */}
              <Drawer.Viewport className="pointer-events-none fixed inset-0 z-50 flex justify-end">
                {/* Popup = animated panel pinned to the right edge */}
                <Drawer.Popup className="bg-brand-surface pointer-events-auto h-full w-72 max-w-[85vw] shadow-2xl">
                  <Drawer.Content className="flex h-full flex-col overflow-y-auto">
                    {/* Drawer header — mirrors the main header bar */}
                    <div className="border-brand-secondary/30 flex items-center justify-end border-b px-5 py-3">
                      {/* <Drawer.Title className="font-heading text-brand-accent text-base">
                        Borneo Anthro Hub
                      </Drawer.Title> */}
                      <Drawer.Close
                        aria-label="Close navigation menu"
                        className="text-brand-text/70 hover:text-brand-accent flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                      >
                        <X className="h-5 w-5" />
                      </Drawer.Close>
                    </div>

                    {/* Expanded nav list — coral section headings + links */}
                    <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
                      {visibleItems.map((item) => {
                        const visibleChildren = item.children?.filter(
                          (c) => !c.feature || isEnabled(c.feature),
                        );
                        // Hide the section entirely if no children are visible
                        if (item.children && !visibleChildren?.length)
                          return null;
                        return (
                          <div key={item.href} className="mb-4">
                            <p className="type-caption-s-bold text-brand-accent mb-2 px-2 tracking-wider uppercase">
                              {item.label}
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {(visibleChildren ?? []).map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={(e) => {
                                    // Smooth-scroll to the anchor when it
                                    // targets the current page, then close the
                                    // drawer.
                                    handleNavClick(e, child.href);
                                    setDrawerOpen(false);
                                  }}
                                  className={`type-body-s rounded-lg px-3 py-2 text-left transition-colors ${
                                    isActive(child.href)
                                      ? "text-brand-accent bg-white/10 font-medium"
                                      : "text-brand-text/80 hover:text-brand-text hover:bg-white/10"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </nav>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
