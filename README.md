# TeachAdmin
A website that is a tool for teachers to observe, analyze and manage their student's progress through various score data such as exams, assignments, tests and homeworks. It will be kept simple at first and gradually build up more advanced and (hopefully) even more useful functionalities.
Currently, these tools/libraries are used for this project:

## Tools / Libraries
1. Python 3.7.7
2. Django 3.0.6
3. pandas 1.0.3
4. matplotlib 3.1.3
5. seaborn 0.10.1
6. django-rest-framework 3.11.0
7. ReactJS 17.0.1
8. [react-router-dom](https://reactrouter.com/) 5.2.0
9. [html-react-parser](https://github.com/remarkablemark/html-react-parser) 1.2.6

## Idea
It all started as I was simply helping my wife sorting out her students' test, homework and exam data and generating comments (that they have to provide to each student's parents by the end of the year). Teachers already have **VERY** extensive responsibilities and its often even more difficult for them to also have the time for analyzing the progress of each individual student.
The core idea behind this project is to make teachers able to explore the data they put in about their students, thus enabling the teachers to observe, analyze and manage their students' learning progress through the course of time. While the main functionality is to simply provide visual graphs generated with the students score data, thus allowing teachers to quickly get an overview of the progress of the students, the system will also be able to eventually point out which students struggle in particular when compared to other students in the same subject etc. Machine learning will most likely end up being used to figure out patterns in the data that could provide teachers with hints about these things.

## Functionalities
- Grading & Tracking
    - Whenever a teacher logs in, they will be redirected to the main page (HomePage) which should be an overview of the data related to that teacher. This includes:
        - Overview Analysis (graphs indicating which students do not meet the standards that the Teacher had set up)
        - Links to most commonly used features (default might be 'Score Entry' or 'Report')
        - Profile (their own)
    - Otherwise, they're simply redirected to either Login or Register.
Within the page itself, the functionality will be aimed towards the following:
- Profile
    - Change attributes of Teacher profile, such as 'country' or 'career profile'.
- Enter Data
    - Here, the teacher can choose (through links to appropriate parts of the site) what data to put into the system. Links include:
        - Students
        - Scores
        - Schools
        - Homerooms
        - Report
    - **Students** will simply be the part of the site where you manage any data related to students themselves. This will be either to CREATE, READ, UPDATE or DELETE functionalities in its core, but other related tasks such as adding 'Scores' for any particular student(s) are also accessible through this **StudentDetailView**.
    - **Schools** will be a simple view where teachers can CREATE, READ, UPDATE or DELETE School objects. Since the core of this application will have little to do with Schools, little emphasis will be put into this section.
    - **Homerooms** on the other hand, apart from the standard CRUD implementations, will also have some statistical data presented in the form of graphs and/or detailed messages in hopes that it will _help the teacher make **quick and accurate decisions**_ to assist that set of students (e.g. Homeroom).
    - **Report** will be the page on which automatic reports for the selected Student(s), Homeroom or School will be generated in the form of a nicely formatted PDF-file. The report will be focused on individual students at first, but may very well expand into more options later.

## Structure / Models
- Teacher (User)
- School
    - Each teacher can add schools to their 'portfolio', for lack of a better term. The term simply emphasizes the fact that each Teacher's data is (at least initially) isolated from other Teachers' data. Within each school, they can then add homerooms or subjects.
- Homeroom
    - The term simply comes from the term "homeroom teacher" as in "teacher who teaches certain subject(s) to a certain set of students", thus making that "homeroom" a *fixed group of students that the teacher is educating*.
- Subject
    - Subjects, just like the name suggests, is referred to as the subject that the teacher is teaching. The idea is that teachers should mainly use their subject-page is their go-to page to analyze scores as it is often easier and more accurate to analyze data all from the same context (subject). Any subject can be assigned to multiple Homerooms to make sure each teacher can teach the same material to students with or without a Homeroom.
- Exam
    - As the name suggests, it represents the exams in each subject. Each subject can (obviously) have many exams.
- ExamScore
    - The score tied to any one Exam that the teacher has added to their 'portfolio' AND the student that took the exam. E.g. the record of a student having a score in an exam.
- Assignment
    - Can be viewed as any major 'paper' or 'project' for a subject.
- AssignmentScore
    - Like ExamScore, but for Assignments.
- Lesson
    - Each subject will be able to have lessons added to them. Within each lesson, the teacher can then add tests and homeworks.
- LessonTest
    - Tests for lessons. They're almost identical to Exams in terms of structure, thus serving an almost identical purpose.
- LessonTestScore
    - Score for LessonTests
- Homework
    - Just like Assignments, but for Lessons.
- HomeworkScore
    - Score for Homeworks.
- BehaviorCategory
    - This model has yet to be implemented and utilized in the app, but eventually this model (together with BehaviorEvents) will help teachers track behaviors of students and if and/or how they impact the students' progress.
- BehaviorEvent
    - Used to keep track of behaviors (BehaviorCategory) for a specific student (Student).

## Backend / Frontend Structure
As of right now (April 15th 2021), the structure is built up by the following components:
1. [Django](https://github.com/django/django)
    - Responsible for request & response handling between front- and backend as well as database/model handling.
2. [Django REST Framework](https://github.com/encode/django-rest-framework)
    - Utilized to enhance request/response handling further by essentially standardizing the way data in processed.
3. [ReactJS](https://github.com/facebook/react)
    - Used to make the frontend interface structuring more convenient and DRY-based.
4. [react-router-dom](https://reactrouter.com/)
    - Used to control the URL-aspect of the site, as it is an SPA.
5. [HTMLReactParser](https://github.com/remarkablemark/html-react-parser)
    - Used frequently to further enhance the automatic rendering of frontend interface components.

### Idea
While it may seem obvious to some, _I will do my best_ to explain the logic behind this setup.
When a user lands on the Home page, a React comment called `App` (for simplicity) will be loaded.
Then, the `App` will serve as a container for other sub-apps, such as `Accounts` or `Scores`.
These sub-apps will then serve mainly as an interface for the same backend `model.Model`s.
The goal is to make these correlations as obvious as possible, but things might change in the future as I learn more.

#### Frontend
- **`App`**
  - As explained above, this will simply be the core of the whole site only handling the task to redirect users to the part of the site they wish to go, namely sub-apps such as `Accounts` or `Scores`. While I haven't made a rock-solid decision on this yet, I think that I _may_ want to keep the functionality for checking that the `User` is still authenticated or not. I am still figuring things out, so tips & tricks on this from you pros out there would be much appreciated 😄


#### Accounts
The `Accounts` app, which is a `react.Component`, will manage the following basic tasks related to the `Accounts` model:
1. Registering new Teachers
2. Logging Teachers on/off
3. Viewing Teachers' data
4. Updating Teachers' data
5. Deleting Teacher

##### Registering new Teachers
**URL:** `"/accounts/register/"`

Criteria:
- Non-authenticated users (`AnonymousUser`)

Else:
- Redirect to `"/accounts/whoami/"`

##### Logging on/off
**URL:** `"/accounts/login/"`

Criteria:
- Non-authenticated users (`AnonymousUser`)

Else:
- Redirect to `"/accounts/whoami/"`

##### Viewing, Updating & Deleting Teachers
**URL:** `"/accounts/whoami/"`

Criteria:
- Authenticated `Teacher`s

Else:
- Redirect to `"/accounts/login"`
