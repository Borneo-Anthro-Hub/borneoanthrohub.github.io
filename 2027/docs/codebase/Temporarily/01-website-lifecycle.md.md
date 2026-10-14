# Website Lifecycle

## Overview

The BAH website changes throughout the year according to the convention timeline.

Rather than deploying multiple versions of the website, the application operates under a single **Website State**. The frontend uses this state to determine which pages, features, and actions are available.

> **2027 Note:** The 2027 website is static-only (no API, no backend). Authentication, account creation, ticket registration, profile editing, and badge pickup are **not available** in 2027 — these features are reserved for the 2028 full-stack release. For 2027, submission pages (Art, Dealer, Panel) link to external Google Forms.

---

# Website States

| Code | Name                                  | Description                                                                                            |
| ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| D    | Dormant                               | Default off-season website. Only evergreen content is available.                                       |
| T    | Teaser                                | Convention theme is announced. "Coming Soon" landing with date, no convention details yet.             |
| A    | Announcement & Ticket Posting         | Convention website officially launches. Full theme content (venue, GOH, activities, travel) available. |
| TO   | Ticket Registration Opens             | Ticket registration period. Google Form link in 2027. (2028: embedded ticket sales.)                   |
| RC   | Account Creation & Registration Close | Submissions period. Dealer and panel submission info pages are available.                              |
| FIR  | Final Information Release             | Final attendee information is published including schedule and Dealer's Den layout.                    |

---

# Lifecycle Timeline

```text
Dormant
    ↓
Teaser
    ↓
Announcement
    ↓
Ticket Registration Opens
    ↓
Account Creation & Registration Close
    ↓
Final Information Release
```

---

# State Behavior

## Dormant (D)

### Purpose

Off-season website.

### Available

- Evergreen pages
- Volunteer application (Google Form link)

### Unavailable

- Theme pages
- Convention information

---

## Teaser (T)

### Purpose

Reveal the yearly convention.

### Available

- Theme landing page
- Convention information
- Travel guide
- Art submission (Google Form link)

---

## Announcement (A)

### Purpose

Convention website officially launches.

### Available

- Full yearly theme website
- Activities

---

## Ticket Registration (TR)

### Purpose

Ticket registration period. In 2027 (static), this displays ticket tier information with a link to an external Google Form for registration.

### Available

- Ticket registration info (Google Form link)

### 2028 (Future)

- Embedded ticket purchase
- Profile editing
- Registration management

---

## Registration Closed (RC)

### Purpose

Organizer submission period.

### Available

- Dealer submission info (Google Form link)
- Panel submission info (Google Form link)

---

## Final Information Release (FIR)

### Purpose

Prepare attendees for the convention.

### Available

- Event schedule
- Dealer's Den layout
- Booth listings

### 2028 (Future)

- Badge pickup selection
