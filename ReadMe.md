# Blogr – Fullstack Blog Platform

**Blogr** is a fullstack blog publishing platform built with **React** and **Tailwind CSS**, powered by a **serverless AWS architecture**. Users can create, view, and manage blog posts with support for media uploads and real-time email/SMS notifications.

---

## 🔧 Tech Stack

### Frontend
- React
- Tailwind CSS
- AWS Amplify (Hosting & Auth)

### Backend
- AWS Lambda (Java – Maven)
- AWS AppSync (GraphQL APIs)
- AWS DynamoDB
- AWS S3 (Media storage)
- AWS SES (Email)
- Twilio (SMS)
- Node.js

### DevOps & Tools
- Docker
- Maven
- GitHub Actions
- Amplify CLI

---

## 🔑 Features

- 📝 **Blog Creation** – Authenticated users can create and manage blog posts
- 🔒 **Authentication** – Secure login via AWS Amplify Auth
- 📦 **Media Upload** – Upload and serve images/files via Amazon S3, blogs stored in DynamoDB
- 📬 **Notifications** – Serverless Lambda integration with Twilio and SES
- 🚀 **Scalable Architecture** – Built using AWS serverless infrastructure

---

## 🚀 Demo

- **Live Site**: [Blogr](https://master.d3rmuxe1kj9gm3.amplifyapp.com/)
- **Demo Account**  
  - Username: `Testforaws95`  
  - Password: `Testforaws95`
- **Video Walkthrough**:  
  [Watch on Google Drive](https://drive.google.com/file/d/1WkjOYX9GyMAu05sgYkfyTTnHCgN_jhgZ/view?usp=sharing)

---

## 📂 Related Code

- **Lambda Notification Logic (Java)**:  
  [github.com/jachaksekhon/NotificationLambda](https://github.com/jachaksekhon/NotificationLambda)

---

## 💡 Future Improvements

- [ ] Execute lambda function outside of user adding blogs (taking too much time)
- [ ] Refactor components for reusability
