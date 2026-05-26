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
const DAY_START = '08:00';
const DAY_END   = '24:00';
const PX_PER_MIN = 1;
const TIME_ZONE = 'Asia/Kuala_Lumpur';

const rooms = ['Horizon Hall', 'Likas Hall', 'Papar Hall', 'Luyang Hall'];
const roomConfigs = {
  'Horizon Hall': { lanes: 6, width: 6.75 },
  'Likas Hall': { lanes: 1, width: 1.25 },
  'Papar Hall': { lanes: 1, width: 1.25 },
  'Luyang Hall': { lanes: 1, width: 1.25 }
};
const dates = ['2026-06-20', '2026-06-21'];
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

`eventsSchedule.json` is organized from broad to specific:

1. date
2. room
3. event list

This keeps the repeated `date` and `room` values outside each event.

Example:

```json
{
  "2026-06-20": {
    "Horizon Hall": [
      {
        "title": "Fursuit Dance",
        "host": "Gravity Fox",
        "subtitle": "5:00pm - 6:30pm",
        "start": "17:00",
        "end": "18:30",
        "color": "#FACA65",
        "titleText_color": "#373f52",
        "subtitleText_color": "#2F2613",
        "lane": 1,
        "laneSpan": 2
      }
    ]
  }
}
```

The renderer also supports an optional extra location layer if a future schedule needs it:
`date -> location -> room -> event list`.

## Standard Event Fields

### Required In Most Cases

- `title`
  Event title.
- `start`
  Start time in 24-hour format, for example `17:00`
- `end`
  End time in 24-hour format, for example `18:30`

The date key must match one of the entries in `dates`, and the room key must match one of the entries in `rooms`.

### Common Optional Fields

- `host`
  Displays the host label on the event card.
- `subtitle`
  Secondary text shown under the title
  Line breaks can be written with `\n`.
  Basic formatting is supported with these tags:
  `<b>`, `<strong>`, `<i>`, `<em>`, and `<br>`.
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

### Room Separation Lines

Room boundaries are controlled in `timelineSchedule.html` with the `.room:not(:last-child)` CSS rule.

Example:

```css
.room:not(:last-child) {
  border-right: 2px solid rgba(0, 0, 0, 0.28);
}
```

To make room boundaries clearer:

- increase `2px` to `3px` or `4px`
- increase `0.28` to a higher opacity such as `0.35`

Lane dividers inside a room use `.room-lane` and should usually stay lighter than room boundaries.

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

### Event Background Image

Use `backgroundImage` when an event card needs a full background image.

Example:

```json
"backgroundImage": "./images/timelineSchedule/bg.png",
"backgroundOpacity": 0.5,
"backgroundFit": "cover",
"backgroundPosition": "center center"
```

Supported fields:

- `backgroundImage`
  Image path for the card background.
- `backgroundOpacity`
  Background transparency from `0` to `1`.
  Example: `0.2` is subtle, `0.6` is stronger.
- `backgroundFit`
  Accepts `"cover"` or `"contain"`.
  Default is `"cover"`.
- `backgroundPosition`
  CSS background position.
  Examples: `"center center"`, `"bottom right"`, `"50% 70%"`.

Image paths are relative to `timelineSchedule.html`.
For example, because the HTML file is inside `2026/`, this path:

```json
"backgroundImage": "./images/timelineSchedule/bg.png"
```

points to:

```text
2026/images/timelineSchedule/bg.png
```

### Custom Background Size

Use `backgroundSize` when `"cover"` or `"contain"` is not precise enough.

Example:

```json
"backgroundImage": "./images/timelineSchedule/bg.png",
"backgroundSize": "150px auto",
"backgroundPosition": "center center"
```

Other examples:

```json
"backgroundSize": "80%"
```

```json
"backgroundSize": "100% 60%"
```

If `backgroundSize` is provided, it overrides `backgroundFit`.
If `backgroundSize` is not provided, the schedule uses `backgroundFit`.

### Background Position Offset

Use `backgroundOffsetX` and `backgroundOffsetY` to move the background image without shrinking or clipping the background layer.

Move the image to the right and down:

```json
"backgroundOffsetX": 12,
"backgroundOffsetY": 8
```

Move the image to the left and up:

```json
"backgroundOffsetX": -12,
"backgroundOffsetY": -8
```

You can also use CSS length values:

```json
"backgroundOffsetX": "10%",
"backgroundOffsetY": "-6px"
```

Direction rules:

- positive `backgroundOffsetX` moves the image right
- negative `backgroundOffsetX` moves the image left
- positive `backgroundOffsetY` moves the image down
- negative `backgroundOffsetY` moves the image up

These offset fields work together with `backgroundPosition`.
For example, this starts from the top center, then moves the image down slightly:

```json
"backgroundPosition": "center top",
"backgroundOffsetX": 0,
"backgroundOffsetY": 4
```

### SVG Background Recoloring

If the background image is an SVG, it can be recolored with `backgroundImageColor`.

Example:

```json
"backgroundImage": "./images/timelineSchedule/bg.svg",
"backgroundImageColor": "rgba(255,255,255,0.35)",
"backgroundOpacity": 1,
"backgroundSize": "80%",
"backgroundPosition": "center center"
```

Important:

- SVG recoloring works best for single-color or silhouette-style SVGs.
- If `backgroundImage` is PNG, JPG, WebP, or another non-SVG format, `backgroundImageColor` is ignored and the original image is shown.

### Bottom Decorative Image

```json
"decorImage": "./images/decor.png",
"decorOpacity": 0.22,
"decorHeight": 45,
"decorFit": "contain",
"decorRepeat": "repeat-x",
"decorSize": "auto 100%",
"decorPosition": "left bottom"
```

Use `decorImage` for a decorative image placed at the bottom of the event card.

Supported fields:

- `decorImage`
  Image path for the bottom decoration.
- `decorOpacity`
  Decoration transparency from `0` to `1`.
- `decorHeight`
  Height of the decoration as a percentage of the event card.
  Example: `45` means 45% of the card height.
  CSS lengths are also supported, such as `"7px"` or `"12%"`.
- `decorFit`
  Accepts `"cover"` or `"contain"`.
- `decorRepeat`
  Optional CSS repeat mode, such as `"repeat-x"`, when the decoration should tile instead of stretch.
- `decorSize`
  Optional CSS background size for repeated decorations.
  Example: `"auto 100%"` keeps the tile proportional to the decoration height.
- `decorPosition`
  Optional CSS background position.
  Example: `"left bottom"`.

### SVG Decorative Image Recoloring

For SVG decoration, add `decorColor`.

```json
"decorImage": "./images/decor.svg",
"decorColor": "#ffffff",
"decorOpacity": 0.22,
"decorHeight": 45,
"decorFit": "contain"
```

As with background SVG recoloring:

- SVG files can be recolored.
- PNG/JPG/WebP files keep their original colors.
- Recoloring turns the SVG into a single-color mask.

### Background And Decoration Layer Order

When both `backgroundImage` and `decorImage` are used on the same event:

1. `backgroundImage` is rendered at the bottom layer.
2. `decorImage` is rendered above the background, usually at the bottom of the card.
3. Event text, host, and subtitle are rendered above both images.

Example using both:

```json
{
  "title": "Opening Ceremony",
  "subtitle": "10:30am - 12:00pm",
  "backgroundImage": "./images/timelineSchedule/bg.png",
  "backgroundOpacity": 0.5,
  "backgroundSize": "150px auto",
  "backgroundPosition": "center top",
  "backgroundOffsetX": 0,
  "backgroundOffsetY": 4,
  "decorImage": "./images/timelineSchedule/deco_1.svg",
  "decorColor": "#ffffff",
  "decorOpacity": 1,
  "decorHeight": 30,
  "decorFit": "contain"
}
```

## Final Note

If you need the manual to be more staff-friendly, it can be expanded into:

- an editor guide for non-technical users
- a field reference table
- a bilingual English + Chinese version
- a version with screenshots
