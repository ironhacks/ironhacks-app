
## Database structure

The database is split in 2 services, the Cloud Firestore and the storage.

### Cloud Store

Here we have all the data related with the platform:

- userdata
- hacks data
- etc. To get used to the inner structure please read the firebase docs.

Strucure explanation:

| colection     | description   | Document id | Doc data |
| ------------- |:-------------:| :-------------:|:-------------:|
| admins        | The list of users that are administrators. | Random |  |
| adminHackData | This is the "sensitive" hack data, this collection can only be accessed by admins. | Random | registered users, phase results, task document ( encoded on base64 encoded ascii), white list |
| comments | Each document on this collection represent a comment on a thread in the forum. | Random | Author UID, Author name, body (the comment itself, encoded on base64 encoded ascii), creation date (createdAt), thread id where the comment was posted |
| Forums | Each document represent a forum (which is the abstration of a treatment) in a hack | Random | hack to which the forum belongs, the name of the forum (this is how the admin identifies the forum), list of participants UIDs, treatment identifier |
| Hacks | This is the public data of a hack, every user can query this data. | Random | the name of the hack, the phases dates, and the tutorial document (encoded on base64 encoded ascii) |
| stats | You can store here any stat you want to collect from the platform, the current available list can be found on the stats section | Random | date, event (name of the stats), metadata (a json with the specific data of the stat, for example: a name of a file, the type of a section, etc.), user UID (the user who performed the action |
| Threads |   Each document on this collection represent a thread on a forum. | Random | author UID, author name, comments IDs ( the list of comments posted on the thread), creation date, forum ID, hackID, title |
| whitelists | Here we store all the hacks a give user can participate on | user Email | whitelist: hacks |

There is one additional collection that requires a bit more explanation: Users.

And its first level, the users collections contains the users documents, each document represents the data of a user:

- email
- hacks (a list of hacks ids, these are the hacks where the user is currently participating on)
- forums (the forums where the participant belongs)
- name

And then, a user can have an aditional collection, called projects, this collection is inside the user document, and contains the data of the user's projects. The Id of the document is the project name, and each document inside this colections represent a file path in the storage. We will talk more about this on the project editor section.

### Storage

Here we store the projects of the users, you can think of it as our massive storage unit.

Each user has a folder on the rootpath of the storage, the name of that folder is the user id. Inside of it you will find all the projects of that user, each one in its own folder, the name of the folder will be the name of the project. Inside the project foldar are all the files of the project.
