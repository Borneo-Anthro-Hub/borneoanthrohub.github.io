# Timeline Schedule Manual

This document explains how to maintain and update the schedule system used by `timelineSchedule.html` and `eventsSchedule.json`.

## Overview

The schedule page is built from two files:

- `timelineSchedule.html`
  Controls the layout, room settings, date settings, styling, and rendering logic.
- `eventsSchedule.json`
  Stores the actual event data.

In normal use:

1. Edit room/date/layout settings in `timelineSchedule.html`.
2. Edit event content in `eventsSchedule.json`.
3. Refresh the page in the browser.

## Recommended Way To Open The Schedule

Because the page loads `eventsSchedule.json` with `fetch()`, it is best to open the schedule through a local web server instead of double-clicking the HTML file.

Examples:

- VS Code Live Server
- Any simple local HTTP server
- Your existing project preview workflow

## Main Files

### `timelineSchedule.html`

This file contains:

- page time range
- room list
- room lane settings
- room width settings
- event card styling
- current-time line and time-axis behavior

### `eventsSchedule.json`

This file contains one JSON object per event.

Each event is rendered into the matching:

- `date`
- `room`
- `start`
- `end`

## Top-Level Configuration In `timelineSchedule.html`

Look for the config section near the top of the script:

```js
const DAY_START = '00:00';
const DAY_END   = '24:00';
const PX_PER_MIN = 1;
const TIME_ZONE = 'Asia/Kuala_Lumpur';

const rooms = ['Horizon Hall', 'Likas Hall', 'Papar Hall', 'Luyang Hall'];
const roomConfigs = {
  'Horizon Hall': { lanes: 4, width: 1.75 },
  'Likas Hall': { lanes: 1, width: 1.05 },
  'Papar Hall': { lanes: 1, width: 0.8 },
  'Luyang Hall': { lanes: 1, width: 0.8 }
};
const dates = ['2026-04-29', '2026-04-30'];
```

### What These Settings Mean

- `DAY_START`
  The first visible time on the schedule.
- `DAY_END`
  The last supported time range.
  Keep this at `24:00` if you need late-night events such as `23:59`.
- `PX_PER_MIN`
  Height scale of the schedule.
  Larger number = taller schedule.
- `TIME_ZONE`
  Used for the current-time indicator.
- `rooms`
  The room order shown on the page.
- `roomConfigs`
  Per-room layout configuration.
- `dates`
  The dates shown as columns.

## Room Configuration

Each room can have its own layout.

Example:

```js
'Horizon Hall': { lanes: 4, width: 1.75 },
'Likas Hall': { lanes: 1, width: 1.05 }
```

### `lanes`

Controls how many vertical sub-columns exist inside a room.

- `1` = full-width room, no split
- `2` = split into 2 lanes
- `4` = split into 4 lanes

### `width`

Controls the visual width of the room compared with other rooms.

- larger value = wider room
- smaller value = narrower room

This is useful when:

- one room has many parallel activities
- another room only needs one full-width lane

## Event Data Format

Each event in `eventsSchedule.json` is a JSON object.

Example:

```json
{
  "title": "Fursuit Dance",
  "host": "Gravity Fox",
  "subtitle": "5:00pm - 6:30pm",
  "date": "2026-04-29",
  "room": "Horizon Hall",
  "start": "17:00",
  "end": "18:30",
  "color": "#FACA65",
  "titleText_color": "#373f52",
  "subtitleText_color": "#2F2613",
  "lane": 1,
  "laneSpan": 2
}
```

## Standard Event Fields

### Required In Most Cases

- `title`
  Event title.
- `date`
  Must match one of the entries in `dates`.
  Format: `YYYY-MM-DD`
- `room`
  Must match one of the entries in `rooms`.
- `start`
  Start time in 24-hour format, for example `17:00`
- `end`
  End time in 24-hour format, for example `18:30`

### Common Optional Fields

- `host`
  Displays as `by Host Name`
- `subtitle`
  Secondary text shown under the title
- `color`
  Background color of the event card
- `titleText_color`
  Title text color
- `subtitleText_color`
  Subtitle text color
- `hostText_color`
  Host text color
- `hostBg_color`
  Host label background color

If `host` is empty, the host label is not shown.

## Time Format Rules

Use 24-hour format in JSON:

- `08:00`
- `14:30`
- `23:59`

Recommended:

- use `00:00` to `24:00` for full-day layouts
- keep `DAY_END` as `24:00` if events may run close to midnight

## Lane Placement

Lane settings are only useful when the room has more than 1 lane.

### Simple Placement

```json
"lane": 2
```

This places the event in lane 2.

## Merge / Span Across Multiple Lanes

The schedule supports multiple ways to merge cells horizontally.

### Preferred Method: `laneStart` and `laneEnd`

This is the most flexible and recommended method.

Example:

```json
"laneStart": 2,
"laneEnd": 1
```

This means:

- start at lane 2
- expand across the range between lane 2 and lane 1

The system automatically handles left-to-right or right-to-left ranges.

Another example:

```json
"laneStart": 2,
"laneEnd": 4
```

This covers lanes 2, 3, and 4.

### Alternate Names Also Supported

These are also accepted:

- `laneFrom`
- `laneTo`

Example:

```json
"laneFrom": 1,
"laneTo": 3
```

### Legacy Methods Still Supported

Older shorthand fields still work:

- `laneSpan`
- `mergeCell`

Example:

```json
"lane": 1,
"laneSpan": 2
```

This means:

- start at lane 1
- span across 2 lanes total

## Recommended Lane Usage

Use these rules for easier maintenance:

- use `lane` when the event stays in exactly one lane
- use `laneStart` and `laneEnd` when the event should merge across lanes
- keep room `lanes` low unless the room truly needs many parallel tracks
- increase room `width` for rooms with many merged or parallel events

## Visual Styling Tips

### Background Colors

Use `color` to set the card background:

```json
"color": "#54CCC9"
```

### Text Colors

Use text color fields to improve contrast:

```json
"titleText_color": "#373f52",
"subtitleText_color": "#2F2613",
"hostText_color": "#4f362f",
"hostBg_color": "#fff3d6"
```

## Current-Time Features

The schedule includes live time helpers:

- a red horizontal line for the current time
- a red time badge such as `22:06`
- highlighted current half-hour block on the left time axis
- past-time shading for the current day
- full-day dimming for past dates

These features use:

```js
const TIME_ZONE = 'Asia/Kuala_Lumpur';
```

Change this if the schedule should follow another timezone.

## Click And Hover Helpers

The page includes two manual planning helpers:

- moving the mouse shows a horizontal guide line
- clicking anywhere shows a blue marker and the exact time

This is useful when placing or checking events visually.

## Short Event Card Behavior

Short events automatically become more compact:

- subtitle may be hidden first
- title is prioritized
- host label remains visible when possible

This helps one-hour events stay readable.

## Common Editing Tasks

### Add A New Room

1. Add the room name to `rooms`
2. Add its config to `roomConfigs`

Example:

```js
const rooms = ['Horizon Hall', 'New Hall'];

const roomConfigs = {
  'Horizon Hall': { lanes: 4, width: 1.75 },
  'New Hall': { lanes: 2, width: 1.2 }
};
```

### Add A New Date

Add the new date to `dates`:

```js
const dates = ['2026-04-29', '2026-04-30', '2026-05-01'];
```

### Add A New Event

Add a new JSON object to `eventsSchedule.json`:

```json
{
  "title": "Evening Meetup",
  "host": "Alex",
  "subtitle": "8:00pm - 9:00pm",
  "date": "2026-04-30",
  "room": "Likas Hall",
  "start": "20:00",
  "end": "21:00",
  "color": "#6bbf90",
  "titleText_color": "#102018",
  "subtitleText_color": "#102018"
}
```

### Merge A Program Across Multiple Lanes

Recommended example:

```json
{
  "title": "Main Showcase",
  "date": "2026-04-30",
  "room": "Horizon Hall",
  "start": "18:00",
  "end": "19:30",
  "laneStart": 2,
  "laneEnd": 1
}
```

## Troubleshooting

### Event Does Not Show

Check:

- `date` matches `dates`
- `room` matches `rooms`
- `start` and `end` are valid 24-hour times
- JSON commas and quotes are correct

### Event Appears In The Wrong Lane

Check:

- the room's `lanes` count
- `lane`, `laneStart`, `laneEnd`
- whether the event was clamped because the lane number is outside the room's allowed range

### Late Night Event Looks Cut Off

Check:

- `DAY_END` is still `24:00`
- event `end` is valid, such as `23:59`

### Host Label Does Not Appear

Check:

- `host` is not empty
- the value is not just whitespace

## Recommended Maintenance Style

For long-term editing, this workflow is the safest:

1. Define rooms and widths first
2. Set lane counts per room
3. Add events with basic title/date/time
4. Add lane placement only where needed
5. Add colors last for visual polish

## Quick Reference

### Room Config

```js
'Room Name': { lanes: 2, width: 1.2 }
```

### Single-Lane Event

```json
{
  "title": "Panel A",
  "date": "2026-04-30",
  "room": "Likas Hall",
  "start": "14:00",
  "end": "15:00",
  "lane": 1
}
```

### Multi-Lane Event

```json
{
  "title": "Main Program",
  "date": "2026-04-30",
  "room": "Horizon Hall",
  "start": "14:00",
  "end": "16:00",
  "laneStart": 2,
  "laneEnd": 4
}
```

### Host Styling

```json
{
  "host": "Gravity Fox",
  "hostText_color": "#4f362f",
  "hostBg_color": "#fff3d6"
}
```

## Final Note

If you need the manual to be more staff-friendly, it can be expanded into:

- an editor guide for non-technical users
- a field reference table
- a bilingual English + Chinese version
- a version with screenshots
