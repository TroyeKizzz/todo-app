# TodoX
## Content
[[_TOC_]]

## Team
- [Minh Dang](https://github.com/minhdangphuoc) - minh.dang@tuni.fi
- [Sviatoslav Vasev](https://gitlab.tamk.cloud/cpsvva) - sviatoslav.vasev@tuni.fi

## Project description
### Idea
For this work the goal is to program a "RG (random generated) TODO app". In short:
- Express backend generates random tasks from a REST API endpoint.
- Nextjs frontend with a simple TODO-app where initial tasks are fetched from the backend.

### Access
#### Frontend
[http://21wsp4pw.course.tamk.cloud](http://21wsp4pw.course.tamk.cloud)
#### Backend
[http://21wsp4pw.course.tamk.cloud/api](http://21wsp4pw.course.tamk.cloud/api)
#### Database
POST [http://21wsp4pw.course.tamk.cloud/api/v1/task/list](http://21wsp4pw.course.tamk.cloud/api/v1/task/list)
Example:
```javacript
{
  "tasks": [
    {
      "task": "go somewhere",
      "done": true
    },
	{
      "task": "go somewhere else",
      "done": false
    }
  ]
}
```

## Technology
### Frontend
- Nextjs
- TailwindCSS
### Backend
- Node.js
- Express
- Docker
- faker.js

## Roadmap 

[+ [0.1.0] +]
 - Frontend is initialized and is running on localhost:3000
 - Backend is initialized and is running on localhost:5000

[+ [0.2.0] +]
 - Frontend is running in Docker and is accessible on localhost:3000
 - Backend is running in Docker and is accessible on localhost:5000

[+ [0.3.0] +]
 - Frontend is running in CI Docker and is accessible on http://21wsp4pw.course.tamk.cloud
 - Backend is running in CI Docker and is accessible on http://21wsp4pw.course.tamk.cloud/api

[+ [0.4.0] +]
- Backend returns single random generated todo-task from http://21wsp4pw.course.tamk.cloud/api/v1/task/random endpoint.
- Frontend lists 3 random tasks in a todo-list UI. Each item in the list has a text field that describes the task, and a checkbox to mark the item done.
- User can add, delete and mark tasks done.

[+ [0.5.0] +]
 - Frontend has at least 3 custom tests that are passing both in localhost and pipeline.
 - Backend has at least 3 custom tests that are passing both in localhost and pipeline.