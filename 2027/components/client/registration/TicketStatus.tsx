"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Play } from "lucide-react";
import ThemedPillLink from "@/components/server/themed/ThemedPillLink";
import type { RegistrationTier } from "@/components/server/registration/RegistrationTierCard";

const firebaseConfig = {
  apiKey: "AIzaSyBEAzCjnN51uAkj4qtnLryAJj9IQ4jyaiU",
  authDomain: "bah-ticket-status.firebaseapp.com",
  projectId: "bah-ticket-status",
  storageBucket: "bah-ticket-status.firebasestorage.app",
  messagingSenderId: "808603459094",
  appId: "1:808603459094:web:23151c0dce7b859c435f37",
};

const TIME_URL = "https://aisenseapi.com/services/v1/datetime";

type TierId = RegistrationTier["id"];
type TicketStatus = Record<TierId, boolean>;
type TicketLinks = Record<TierId, string>;

type TicketContextValue = {
  status: TicketStatus | null;
  links: TicketLinks | null;
  isOpen: boolean;
};

const TicketStatusContext = createContext<TicketContextValue>({
  status: null,
  links: null,
  isOpen: false,
});

function getTicketDb() {
  const app =
    getApps().find((existingApp) => existingApp.name === "ticket-status") ??
    initializeApp(firebaseConfig, "ticket-status");
  return getFirestore(app);
}

function isHttpsUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    URL.canParse(value) &&
    new URL(value).protocol === "https:"
  );
}

function formatCountdown(remaining: number) {
  const seconds = Math.ceil(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsPart = seconds % 60;
  const time = [hours, minutes, secondsPart]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
  return days > 0 ? `${days}D ${time}` : time;
}

export function TicketStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<TicketStatus | null>(null);
  const [links, setLinks] = useState<TicketLinks | null>(null);
  const [statusError, setStatusError] = useState(false);
  const [linksError, setLinksError] = useState(false);
  const [clockError, setClockError] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const isOpen = remaining !== null && remaining <= 0;

  useEffect(() => {
    const statusDocument = doc(getTicketDb(), "bah_ticket", "status");

    return onSnapshot(
      statusDocument,
      (snapshot) => {
        const data = snapshot.data();
        console.log("Ticket status:", data);
        if (
          !data ||
          typeof data.standard_soldout !== "boolean" ||
          typeof data.sponsor_soldout !== "boolean" ||
          typeof data.s_sponsor_soldout !== "boolean"
        ) {
          console.error("Ticket status document is missing or invalid.");
          setStatusError(true);
          return;
        }

        setStatus({
          wanderer: data.standard_soldout,
          gardener: data.sponsor_soldout,
          caretaker: data.s_sponsor_soldout,
        });
        setStatusError(false);
      },
      (error) => {
        console.error("Failed to load ticket status:", error);
        setStatusError(true);
      },
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let interval: ReturnType<typeof setInterval> | undefined;

    async function startCountdown() {
      try {
        const openingTime = process.env.NEXT_PUBLIC_TICKET_START;
        if (
          !openingTime ||
          !/(?:Z|[+-]\d{2}:\d{2})$/i.test(openingTime) ||
          !Number.isFinite(Date.parse(openingTime))
        ) {
          throw new Error(
            "NEXT_PUBLIC_TICKET_START must be a valid datetime with a timezone.",
          );
        }
        const testSeconds = process.env.NEXT_PUBLIC_TICKET_TEST_SECONDS;
        if (
          testSeconds &&
          (!/^\d+$/.test(testSeconds) ||
            !Number.isSafeInteger(Number(testSeconds)) ||
            Number(testSeconds) <= 0)
        ) {
          throw new Error(
            "NEXT_PUBLIC_TICKET_TEST_SECONDS must be a positive whole number.",
          );
        }
        const response = await fetch(TIME_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Time service returned HTTP ${response.status}`);
        }
        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("datetime" in data) ||
          typeof data.datetime !== "string"
        ) {
          throw new Error("Time service returned an invalid datetime.");
        }
        const serverTime = Date.parse(data.datetime);
        if (!Number.isFinite(serverTime)) {
          throw new Error("Time service returned an invalid datetime.");
        }
        if (controller.signal.aborted) return;

        const ticketStart = testSeconds
          ? serverTime + Number(testSeconds) * 1000
          : Date.parse(openingTime);
        const startedAt = performance.now();
        const update = () => {
          const timeLeft =
            ticketStart - (serverTime + performance.now() - startedAt);
          setRemaining(timeLeft);
          if (timeLeft <= 0 && interval !== undefined) {
            clearInterval(interval);
          }
        };
        update();
        if (serverTime < ticketStart) {
          interval = setInterval(update, 1000);
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to start registration countdown:", error);
        setClockError(true);
      }
    }

    void startCountdown();
    return () => {
      controller.abort();
      if (interval !== undefined) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const linksDocument = doc(getTicketDb(), "bah_ticket", "reg_link");
    return onSnapshot(
      linksDocument,
      (snapshot) => {
        const data = snapshot.data();
        if (
          !data ||
          !isHttpsUrl(data.std) ||
          !isHttpsUrl(data.s) ||
          !isHttpsUrl(data.ss)
        ) {
          console.error("Registration links document is missing or invalid.");
          setLinksError(true);
          setLinks(null);
          return;
        }
        setLinks({ wanderer: data.std, gardener: data.s, caretaker: data.ss });
        setLinksError(false);
      },
      (error) => {
        console.error("Failed to load registration links:", error);
        setLinks(null);
        setLinksError(true);
      },
    );
  }, [isOpen]);

  return (
    <TicketStatusContext.Provider
      value={{ status: statusError ? null : status, links, isOpen }}
    >
      {remaining !== null && remaining > 0 && (
        <div className="registration-countdown">
          <span className="registration-countdown-spinner" aria-hidden="true" />
          <div className="registration-countdown-content">
            <p className="registration-countdown-label">
              Registration opens in
            </p>
            <p
              className="registration-countdown-time"
              role="timer"
              aria-label="Time until registration opens"
            >
              <span className="registration-countdown-time-value">
                {formatCountdown(remaining)}
              </span>
            </p>
          </div>
        </div>
      )}
      {clockError && (
        <p role="status">
          Unable to verify the registration opening time. Please reload the
          page.
        </p>
      )}
      {statusError && (
        <p role="status">
          Ticket availability could not be verified. Please try again later.
        </p>
      )}
      {linksError && (
        <p role="status">
          Registration links could not be loaded. Please try again later.
        </p>
      )}
      {children}
    </TicketStatusContext.Provider>
  );
}

export function RegistrationTierAction({
  id,
  name,
  price,
}: Pick<RegistrationTier, "id" | "name" | "price">) {
  const { status, links, isOpen } = useContext(TicketStatusContext);

  if (status?.[id]) {
    return (
      <button
        type="button"
        disabled
        className="themed-pill-action registration-tier-cta"
        aria-label={`${name} tier is sold out`}
      >
        <span className="themed-pill-label">Sold Out</span>
      </button>
    );
  }

  if (!isOpen || !status || !links) {
    return (
      <button
        type="button"
        disabled
        className="themed-pill-action registration-tier-cta"
      >
        <span className="themed-pill-label">
          {!isOpen ? "Registration opens soon" : "Registration unavailable"}
        </span>
      </button>
    );
  }

  return (
    <ThemedPillLink
      href={links[id]}
      label="Accept this Invitation"
      ariaLabel={`Register for the ${name} tier (${price})`}
      className="registration-tier-cta"
      tail={<Play aria-hidden="true" fill="currentColor" strokeWidth={0} />}
    />
  );
}
