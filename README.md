## 📌 Project Overview

StockGuard provides a structured web-based application where the **Angular frontend** handles the user interface and client-side interactions, while the **backend** is responsible for server-side processing and application logic.

The project is divided into two major parts:

- **Frontend** — Angular 16 application
- **Backend** — Server-side application

## 🏗️ Project Structure

```text
StockGuard/
│
├── Frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
└── Backend/
    └── ...
````

## 💻 Frontend

The frontend is developed using **Angular CLI 16.0.2**.

Angular's component-based architecture allows the application to be organized into reusable components, services, directives, guards, and other modules.

### Frontend Technologies

* Angular 16
* Angular CLI 16.0.2
* TypeScript
* HTML
* CSS
* npm
* Karma

## ⚙️ Development Server

To start the Angular development server:

```bash
ng serve
```

Navigate to:

```text
http://localhost:4200/
```

The application automatically reloads whenever source files are modified.

## 🧩 Code Scaffolding

Angular CLI can be used to generate different application resources.

### Generate a Component

```bash
ng generate component component-name
```

### Generate a Directive

```bash
ng generate directive directive-name
```

### Generate a Service

```bash
ng generate service service-name
```

### Generate a Class

```bash
ng generate class class-name
```

### Generate a Guard

```bash
ng generate guard guard-name
```

### Generate an Interface

```bash
ng generate interface interface-name
```

### Generate an Enum

```bash
ng generate enum enum-name
```

### Generate a Module

```bash
ng generate module module-name
```

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the frontend directory:

```bash
cd Frontend
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

The application will be available at:

```text
http://localhost:4200/
```

## 🔨 Build

To build the project:

```bash
ng build
```

The generated build files will be stored in:

```text
dist/
```

For a production build:

```bash
ng build --configuration production
```

## 🧪 Testing

### Unit Testing

Run the unit tests using:

```bash
ng test
```

The project uses **Karma** for executing Angular unit tests.

### End-to-End Testing

Run:

```bash
ng e2e
```

An appropriate end-to-end testing framework must be configured before running this command.

## 🔄 Application Architecture

```text
┌─────────────────────┐
│      User           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Angular Frontend   │
│      (Angular 16)   │
└──────────┬──────────┘
           │
           │ API Communication
           ▼
┌─────────────────────┐
│       Backend       │
│  Server-side Logic  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Data Processing   │
│   & Application     │
│      Services       │
└─────────────────────┘
```

## 🛠️ Technology Stack

| Layer           | Technology          |
| --------------- | ------------------- |
| Frontend        | Angular 16          |
| Language        | TypeScript          |
| Frontend CLI    | Angular CLI 16.0.2  |
| Package Manager | npm                 |
| Testing         | Karma               |
| Backend         | Backend application |
| Architecture    | Full Stack          |

## 📁 Development Commands

| Command    | Description                   |
| ---------- | ----------------------------- |
| `ng serve` | Starts the development server |
| `ng build` | Builds the application        |
| `ng test`  | Runs unit tests               |
| `ng e2e`   | Runs end-to-end tests         |
| `ng help`  | Displays Angular CLI help     |

## 🎯 Project Goals

* Maintain a clean separation between frontend and backend.
* Provide a modular and maintainable application structure.
* Support efficient development using Angular CLI.
* Provide a foundation that can be extended with additional application functionality.
* Maintain a testable and scalable codebase.

## 👨‍💻 Development

This project was generated using **Angular CLI version 16.0.2** and can be extended using Angular's component, service, directive, guard, class, interface, enum, and module generation tools.

## 📚 Documentation

For more information about Angular CLI, visit the official Angular documentation:

[https://angular.io/cli](https://angular.io/cli)

## 📄 License

This project is intended for academic and educational purposes.

