require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Course.deleteMany({});
  
  await Course.insertMany([
    {
      title: "React Basics",
      description: "Learn fundamentals of React",
      fullDescription:
        "This course covers the foundational concepts of React including components, JSX, props, state management, hooks, and building modular UI structures. Ideal for beginners looking to start frontend development with modern JavaScript frameworks.",
      coreConcepts:
        "Components: Reusable, self-contained UI building blocks (using functions or classes). JSX: A syntax extension that looks like HTML used within JavaScript code. State: Manages dynamic data within a component; triggers re-renders when data changes. Props: Passes data down from parent to child components to make them dynamic and reusable. Virtual DOM: An efficient in-memory representation of the UI that optimizes performance by updating only necessary parts of the real web page.",
      whoItFor:
        "Frontend Developers: The leading skill for modern web interfaces. Full Stack Developers: Used for the UI layer in tech stacks (MERN/MEAN). Mobile App Developers: Foundation for building native cross-platform apps using React Native. JavaScript Developers: A standard next step for those proficient in core JavaScript.",
      price: 0,
      image: "https://miro.medium.com/1*RDN058L5gQ02Xy13OaxjnQ.jpeg"
    },
    {
      title: "Node.js Crash Course",
      description: "Backend development using Node.js",
      fullDescription:
          "Learn everything about backend development using Node.js. Includes Express routing, middleware, authentication, databases (MongoDB), building APIs, deployment, and best practices for scalable server-side apps.",
      coreConcepts:
        "V8 JavaScript Engine: Executes JavaScript outside a browser quickly, compiled into machine code. Asynchronous & Non-Blocking I/O: It handles multiple operations concurrently without waiting (non-blocking). The Event Loop: The internal mechanism that manages and orchestrates all asynchronous operations efficiently. NPM (Node Package Manager): The vast ecosystem and standard tool for managing project libraries and dependencies.Modules: A system (require()) for organizing and reusing code components.",
      whoItFor:
        "Full Stack Developers: Allows use of JavaScript for both frontend and backend development. Backend/API Developers: Ideal for building fast, scalable server-side logic and microservices. Real-Time Application Developers: Best suited for applications requiring constant low-latency communication (chats, live games, dashboards). Existing JavaScript Developers: Allows immediate use of existing JS skills for server-side work.",
      price: 499,
      image: "https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png"
    },
    {
      title: "MongoDB Guide",
      description: "Master MongoDB",
      fullDescription:
          "This course teaches you the fundamentals of MongoDB including documents, collections, CRUD operations, indexing, aggregation, schema design, and optimization. A must-have for full-stack developers.",
      coreConcepts:
        "NoSQL Document Database: Stores data in flexible, JSON-like documents (BSON format) instead of rigid tables. Documents: Key-value pairs, similar to JavaScript/JSON objects, holding related data together. Collections: Groups of documents, analogous to tables in SQL. Schema-less/Flexible Schema: Define structure as you go, adding fields as needed, unlike strict SQL schemas. ",
      whoItFor:
        "Developers building modern, scalable web/mobile apps (IoT, Big Data). Those familiar with JavaScript/JSON find it easier to learn. ",
      price: 299,
      image: "https://coderdost.com/content/images/size/w2000/2021/03/mongodb-1.jpg"
    },
    {
      title: "Git & GitHub",
      description: "Version control for developers",
      fullDescription:
        "Provides an interactive course focused on mastering Git, including its internal workings and advanced commands like rebase and reset.",
      coreConcepts:
        "Effectively manage code changes and track project history using Git. Collaborate with teams on projects using GitHub's features. Understand and apply best practices for version control and collaborative development. Build a portfolio by creating and sharing projects on GitHub.",
      whoItFor:
        "Aspiring and Junior Developers. Software Engineers and Architects. IT Professionals and DevOps Specialists",
      price: 0,
      image: "https://yaser-123.github.io/hackathon/Hackathon%20images/git%20and%20github.jpeg"
    },
    {
      title: "Full Stack Bootcamp",
      description: "React + Node + MongoDB",
      fullDescription:
          "This course teaches you the fundamentals of MongoDB including documents, collections, CRUD operations, indexing, aggregation, schema design, and optimization. A must-have for full-stack developers.",
      coreConcepts:
        "Frontend Development. HTML & CSS: Structuring and styling web pages, including responsive design. JavaScript: Adding interactivity and dynamic behavior. Frontend Frameworks/Libraries: Using tools like ReactJs, Angular, or VueJs to build complex, scalable interfaces. Backend Development. Server-Side Languages/Frameworks: Writing business logic using languages such as NodeJs, Python with Django, or Java with Spring. API Development: Creating and consuming RESTful APIs for communication between the frontend and backend. Database Management. SQL Databases: Working with relational databases like MySQL or PostgreSQL. NoSQL Databases: Using non-relational databases such as MongoDB.",
      whoItFor:
        "Aspiring and Junior Developers. Software Engineers and Architects. IT Professionals and DevOps Specialists",
      price: 999,
      image: "https://cambridgeinfotech.io/wp-content/uploads/2023/12/Full-Stack-Development.png"
    }
  ]);

  console.log("Courses seeded");
  process.exit();
});
