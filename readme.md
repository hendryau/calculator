# Calculator

## Requirements
Node and npm installed.

## Usage
Before running for the first time...
<code>npm install</code>

To start the app...
<code>npm start</code>

## Design
This is a component based app. <code>CalculatorComponent</code> does most of the heavy lifting. I considered creating a
special component for the calculator buttons, but decided that a custom directive would accomplish the behavior I was looking
for. The <code>CalcActivateDirective</code> emits an event when its host element is clicked or a key mapped to it is pressed. It
styles the keys for a moment so it's easy to see what you're typing on screen if you're using a physical keyboard instead
of a mouse or finger. <code>CalculatorService</code> bundles some common calculator logic to externalize it for reusability and testing.

## Bugs
If you do <code>1 / 0</code>, the result is <code>Infinity</code> (this is expected, leaning on js behavior here),
but it sets the workspace value to <code>"Infinity"</code>, which can be backspaced to make substrings like <code>"Infin"</code>.
<code>"Infin" + 2 == NaN</code>, which isn't the cleanest user experience.
 
If the current workspace value equals <code>"Infinity"</code> and backspace is hit, it should clear the current value and set it to
zero. Is there a good way to do this without special casing?