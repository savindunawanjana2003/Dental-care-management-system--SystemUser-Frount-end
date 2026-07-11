# 🦷 DentalCare - Advanced Clinic Management System

[![Java](https://img.shields.io/badge/Backend-Java%2017%20%2F%20Spring%20Boot-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Security](https://img.shields.io/badge/Security-JWT%20%26%20Spring%20Security-red.svg)](https://spring.io/projects/spring-security)
[![Frontend](https://img.shields.io/badge/Frontend-Multi--App%20%28React%20%2F%20Bootstrap%29-blue.svg)](https:/Html/)

An advanced, enterprise-grade **Dental Clinic Management System (DentalCare)** engineered using a decoupled, **Multi-Frontend Architecture** integrated with a secure **Spring Boot REST API** backend. This system cleanly isolates operational boundaries by separating clinical staff controls from customer/patient management touchpoints.

---

## 🏛️ Architecture Overview

The platform is designed around a single, highly secure central API gateway that serves two completely distinct client applications:
1. **System User Frontend (Staff/Admin Portal):** Dedicated workspace for doctors, receptionists, and administrators to orchestrate clinic operations, manage medical logs, and handle inventory.
2. **Customer Frontend (Patient Portal):** A lightweight, interactive web portal optimized for patients to register, view schedules, book dental appointments, and track prescriptions.

---

## ✨ Key Technical Features

* **🔒 Stateful Security Layer (JWT & Spring Security):** Rigorous resource protection wrapped in a state-of-the-art Custom Spring Security architecture utilizing stateless **JSON Web Tokens (JWT)**.
* **👥 Multi-Persona Authentication:** Deep role-based access management allowing distinct permissions across internal `System Users` and external `Customers/Patients`.
* **📅 Appointment & Schedule Orchestration:** Real-time checking of clinical slot availability preventing double-booking hazards.
* **💳 Integration Ready Architecture:** Built utilizing standard RESTful guidelines mapping DTO structures seamlessly across HTTP layers.

---

