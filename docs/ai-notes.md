# AI Notes

## Tools used
Claude(AI chat assistant) & claude code used alongside my own work in Playwright (TypeScript).

## What I used it for
- **Reviewing test cases:** I shared my test cases with the AI and asked it to point out gaps (missing scenarios, edge cases, negative cases) so I could be sure coverage was good.
- **UI automation:** help writing and refactoring Playwright (TypeScript) test scripts, such as locators, assertions and test structure.
- **API automation:** help building API test scripts, covering status codes, response validation and request variations.
- **Generating extra test cases:** where coverage was thin, I asked the AI to suggest more test cases for specific scripts, then reviewed them before adding them.

## One time it was wrong
**What happened:** When I used the AI to help with UI and API automation, the scripts it produced did not cover every test case. It handled the main happy-path flows well but missed some scenarios, like negative inputs, boundary values and some validation checks.

**How I noticed:** I mapped the generated scripts back to my test cases and requirements, and found that some test cases had no matching script or assertion.

**What I did:** For those scripts I gave the AI the specific missing scenarios and asked it to generate test cases for them. Then I reviewed each one and ran it before adding it to the suite.
