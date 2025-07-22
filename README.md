# Sr QA Engineer Prompts Project

This repository stores a step of the selection proccess for a Sr QA Engineer position at the Fortis Games comapny.

The objective is to develop a small-scale automation script to validate the functionality of a random date generator website.

## Dependencies

- Playwright v1.4.3
- Node v22.17.1
- npm v9.6.2

> Pre requirements:

- [Node setup](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [VS Code setup](https://code.visualstudio.com/learn/get-started/basics)

## Fork and clone the project

1. Copy the project URL `https://github.com/olavovitor/skills-challenge.git`;
2. Access the forked project `cd skills-challenge`

## Instal the project

On your terminal, type:

1. `npm install`

# Setup

Before running this project, you can chang the current variabes located in aux_files/constants.json file to control the range of dates and amount of results to be generated:

1. TOTAL_RANDOM_DATES: Number of different dates to be generated
2. START_DAY | START_MONTH | START_YEAR: Values to set the starting date
5. END_DAY | END_MONTH | END_YEAR: Values to set the ending date

# Scripts to execute

It's possible to execute the main test through some alternatives:

1. Headless execution for all browsers

```
npm run test
```

2. Execution via UI for all browsers

```
npm run test:ui
```

3. Headless execution to run only the smoke tests

```
npm run test:smoke
```
