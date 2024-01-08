# Smart parking management

This repository contain the codebase for the big project for Applied IOT course.

## Installation & Run

```bash
  git clone https://github.com/hathai25/iot-project

  # Run mqtt broker with Docker
  docker run --name hivemq-ce -d -p 1883:1883 8000:8000 hivemq/hivemq-ce

  # Run backend server
  cd backend
  pnpm install
  pnpm dlx prisma db push
  pnpm start # :3000

  # Frontend
  cd frontend
  pnpm install
  pnpm dev # :5173

  # Image to plate service
  cd model-server
  pip install ./requirement.txt
  python ./imageToPlate.py # :5000
```

Make sure to create **.env** file and corresponds env variable for backend & frontend server
