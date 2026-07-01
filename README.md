# BlogsApp

A full-stack blog application where users can write, edit, and delete their own posts. Admins can manage everything.

## Tech Stack

- **Frontend** — Next.js 14, TypeScript, Tailwind CSS
- **Backend** — Django, Django REST Framework, JWT Authentication
- Database — PostgreSQL

## Getting Started

**Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # fill in your values
python manage.py migrate
python manage.py create_admin
python manage.py runserver
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend/` folder:
