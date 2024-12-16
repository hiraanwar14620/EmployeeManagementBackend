"# EmployeeManagementBackend" 

Employees:
----------
GET     /api/Employees (Will return the list of all employees)
GET     /api/Employees/4 (Will return the employee with id of 4)
POST    /api/Employee (Will create a new employee record in the database)
PATCH   /api/Employee/4 (Will edit/update the employee with new data wich has the id of 4)
DELETE  /api/Employee/4 (Will delete the employee of id 4)


Departments:
----------
GET     /api/Departments (Will return the list of all departments)
GET     /api/Departments/4 (Will return the department with id of 4)
POST    /api/Departments (Will create a new department record in the database)
PATCH   /api/Departments/4 (Will edit/update the department with new data wich has the id of 4)
DELETE  /api/Departments/4 (Will delete the department of id 4)

Addresses:
----------
GET     /api/Addresses (Will return the list of all address)
GET     /api/Addresses/4 (Will return the address with id of 4)
POST    /api/Addresses (Will create a new address record in the database)
PATCH   /api/Addresses/4 (Will edit/update the address with new data wich has the id of 4)
DELETE  /api/Addresses/4 (Will delete the address of id 4)

To start the instance of Postgresql Database server:
 docker compose -f ./docker-compose.yml up -d 