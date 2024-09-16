[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AHFn7Vbn)

# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective

Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement

Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:

1. Real-time Synchronisation

- Implement a system that detects changes in Google Sheets and updates the database accordingly.
- Similarly, detect changes in the database and update the Google Sheet.

2. CRUD Operations

- Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
- Maintain data consistency across both platforms.

### Optional Challenges (This is not mandatory):

1. Conflict Handling

- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).

2. Scalability:

- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰

The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:

- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽.

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I have even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓

Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries.

All the best ✨.

## Developer's Section

### Video Link

[[Demonstration](https://github.com/StackItHQ/pes-praths71018/tree/main/video)]

### Summarised Approach

- Open Google cloud console and Create a Project
- Enable Google drive and Google Sheets API
- Create credentials for the project
- From the credentials of project copy the email account and give that account editor access to Google Sheets
- Create a new Google sheet and add the data to it.
- Create a server in express which is connected to MySQL database
- Write a code in Google App Script in Google sheets to enable realtime synchronisation with database by adding triggers when opening and editing the sheets.
- Run the server using ngrok.

### Results
1. Real-time Synchronisation
    - Achieved Real time synchronisation i.e. whenever changes are made in Google Sheets , it is reflected in MySQL database.

2. CRUD Operations
    - Ensured the system supports Create, Read, Update, and Delete operations.
    - Maintain data consistency across both platforms i.e. sheets and database.

3. Conflict Handling
    - Whenever Google Sheets is opened the database is automatically updated with data in sheets.
    - Error Handling is taken care.

4. Scalability
    - Server is highly Scalable.

### Note

- credentials.json file isn't pushed in repository for precautionary purposes. (hence .gitignore file)
- password for MySQL database is removed in the repository again for precautionary purposes.
- Opening Google App Script
  - Open Google Sheets
  - Go to Extensions > Apps Script in Google Sheets.
  - Write a script that will run whenever the sheet is edited.
