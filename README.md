# Leads Handling Report Generator

A simple, user-friendly web application for tracking and managing lead contact attempts and generating standardized reports.

## Features

- Track multiple lead status categories:
  - Wrong Number
  - No Answer (automatically calculated)
  - Answered
  - Gatekeeper
- Easy-to-use increment/decrement buttons (+1/-1)
- Automatic calculation of "No Answer" leads
- Clean, responsive interface
- One-click report generation

## How to Use

1. **Initial Setup**

   - Open `index.html` in a web browser
   - No installation or setup required

2. **Entering Data**

   - Enter the total number of leads in the "Total Leads" field
   - Use the "+1" and "-1" buttons to adjust counts for:
     - Wrong Number
     - Answered
     - Gatekeeper
   - "No Answer" is automatically calculated as:
     ```
     No Answer = Total Leads - (Wrong Number + Answered)
     ```
   - Gatekeeper is tracked and shown in the report, but does not affect the "No Answer" calculation.

3. **Using the Counter Buttons**

   - Click "+1" to increment a specific category
   - Click "-1" to decrement a specific category
   - Values cannot go below 0

4. **Generating Reports**
   - Click the "Get Report" button
   - A formatted report will appear showing:
     - Wrong number count
     - No answer count
     - Answered count
     - Gatekeeper count
     - Total leads

## Example Report Format

```
#Report
5 wrong number
16 no answer
8 answered
4 gatekeeper
totale leads = "33"
```

## Project Structure

- `index.html` - Main application interface
- `style.css` - Styling and layout
- `script.js` - Application logic and event handlers

## Technical Details

- Built with vanilla JavaScript
- No external dependencies required
- Responsive design works on both desktop and mobile devices
- Local execution (no server required)

## Browser Compatibility

Works in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Contributing

Feel free to submit issues and enhancement requests!
