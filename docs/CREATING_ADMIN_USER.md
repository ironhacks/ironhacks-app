
### Creating admins

In order to create an admin user, you first must register a normal one, to do this just follow the sign up flow on the plaform.

Once you register your admin (using any email and password) got to the firebase console and do the following:

- Go to the "Authentication" tab
- Find the user you want to make an admin and copy the user UID string (make sure you copy the full string)
- Go to the database tab
- Click on cloud firestore (if there is no db, follow the instructions to create an empty one)
- go to the `admins` collection (if there is not, create it)
- Create a new document with the following configuration:
  - documentId: UUID.
  - name: (string) admin name
- Click save

Once you save the document, return to the platform and refresh the page, you know should be able to see the admin tab on the top of the page.

This is the only way to create admins.
