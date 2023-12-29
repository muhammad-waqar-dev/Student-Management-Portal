# Project Setup

* Make sure minimum **Node.js version 10** is installed (if using different node version, you may use nvm to install multiple node versions and switch between them)
* Go to the project directory (see if package.json exists).
* Open terminal or vs code in that directory.
* Run following commands one by one to install dependencies and Run server.

```sh
npm install
yarn install
npm install antd (For installation of Ant Design)
```

# Tech Used
* **ReactJs** *for Frontend*
* **Ant design** *for applying css / styling.*
* **Node.js** *for Backend (Provided by the client)*


# Tasks Documentation
##  Landing Page
* This is the landing Page where you can view the list of items and can also select any role form the dropdown.
![LandingPage.](/Documentary_Images/Landing-page.png)

##  Modal 
* This is the Modal screen where you can perform many tasks. These tasks can be performed on the basis of user's rights.
![Modal.](/Documentary_Images/Modal.png)


## Admin Role
* If the user has selected "Admin" role then they can perform the following tasks:
* Add new student: Add new students by clicking the "Add new students"  
![Add new student.](/Documentary_Images/Add-Student.png)

* Add new Family member: For adding new family members of the students
![Add Family Member.](/Documentary_Images/Add-Family_Member.png)
![Add Family Member.](/Documentary_Images/Added-Family-Member-List.png)

* View Student Detail: You can view the added records by cicking the row. The whole form is disabled because the Admin role does not have the rights to update family members
![View Student Detail.](/Documentary_Images/Added-Family-Member-List.png)
![View Screen of Admin Role.](/Documentary_Images/View-by-Admin.png)

## Registrar Role
* If the user has selected "Registrar" role then they can perform the following tasks:
* View student: For viewing students click the rows  
![View Student.](/Documentary_Images/Registrar-View.png)
![View Student.](/Documentary_Images/Update-Student.png)


* Update Student Detail: You can update the Student details by clicking the "Update Student" button
![Update Student Information.](/Documentary_Images/Update-student.png)


* Update Family Member Detail: You can update the Family member details by clicking the "Edit" button, which will fill the particular row data into the above form fields and now you can update family member information. After changing teh fields now press the "Update Family Member Button". You can also add new family members by just clicking the "Add New Family Members" button.
![Update Family Member Information.](/Documentary_Images/Update-Family-Member.png)

* Delete Family Member Detail: You can delete the Family member details by clicking the "Delete" button from the rows.
![Delete Family Member Information.](/Documentary_Images/Delete-family-member.png)

## Thank You 
