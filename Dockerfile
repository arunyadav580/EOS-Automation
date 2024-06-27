FROM node:18

FROM mcr.microsoft.com/playwright:v1.42.1-focal

USER root

# Set the work directory for the application
WORKDIR /app
 
# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY package.json /app/
COPY pageobjects/ /app/pageobjects/
COPY tests/ /app/tests/
COPY playwright-report/ /app/playwright-report/
COPY playwright.config.js /app/
# COPY XlToJs/ /app/XlToJs/
# COPY .env /app/
COPY .env /app/config/
COPY .env.example /app/
COPY allure-report/ /app/allure-report/
COPY allure-results/ /app/allure-results/ 
COPY package.json package-lock.json ./


# Get the needed libraries to run Playwright
RUN apt-get update 
# RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm install
RUN npm install dotenv --save
RUN npm i -D @playwright/test allure-playwright

RUN npx playwright test engineeringChecklist.spec.js
RUN npx allure generate ./allure-results --clean
RUN npx allure open ./allure-report

EXPOSE 80

# Install Node.js dependencies
RUN npm ci

CMD ["npm", "run", "tests"]
# CMD ["npm", "tests/engineeringChecklist.spec.js"]
