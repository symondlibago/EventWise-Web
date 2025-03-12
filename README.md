- # _A Mobile and Web based Event Management System with Aspect-based Sentiment Analysis_

  **Description:** Lorem Ipsum solom not bor ode

  ## Table of Contents

  1. Prerequisites
  2. Backend Setup (Laravel) - Clone Repository - Install Dependencies - Environment Configuration - Database Setup - Run Migrations - Start Laravel Server with specific channel
  3. Frontend Setup (React Native) - Clone Repository - Install Dependencies - Environment Configuration - Run the App with specific channel

  ##

  ## Prerequisites Ensure you have the following installed on your computer:

  - **Node.js** (v14.x or higher)
  - **npm** (v6.x or higher) or **Yarn** (v1.22.x or higher)
  - **PHP** (v7.4 or higher)
  - **Composer**
  - **Laravel Installer**
  - **MySQL**
  - **React Native Expo**
  - **Android Studio**

  ##

  ## Backend Setup

  1.  Clone Repository

  - `git clone https://github.com/BunjanMark/CAPSTONE_EMS.git` then `cd Backend`

  2.  Install Dependencies

      - `composer install`

  3.  Environment Configuration
      - `cp .env.example .env` then configure the .env with your db `php artisan key:generate`
  4.  Database Setup

      - run migrations `php artisan migrate` then run seeders if there's
        any

  5.  Start Laravel Server with specific channel
      - s`php artisan serve --host=**{yourIPADRESSHERE}** --port=**port here**`

  ## Fontend Setup (React Native

  1.  Clone repository
      - `git clone https://github.com/BunjanMark/CAPSTONE_EMS.git` then `cd eventwise_main`
  2.  Install Dependencies
      - `npm install`
  3.  Environment Configuration
      - Navigate to src/constants/constant.js then change `const API_URL ="your IP and port here";`
  4.  Run the app with specific channel

## Before you do code or push, make sure to git pull first from master branch

`git pull`
Look for changes in dependencies and install them accordingly.
for example `composer install` and `npm install` in their respective directory

## Push only to master branch

`git branch -M master`
`git push origin HEAD`
