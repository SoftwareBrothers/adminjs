## Test suite: Login page form

### LPF-1: Log in to the app with a valid email and password

**Test description:** Verify if a user will be able to log in with a valid email and password

**Type:** Functional

**Priority:** High

**Severity:** Critical

**Behavior:** Positive

**Automation status:** To be automated

**Tags:** login_page, login_form

#### Preconditions

*   Open a login page in a browser([https://demo.adminjs.co/admin](https://demo.adminjs.co/admin))
*   User is not already logged and has got an active account

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">No.</span>
   </td>
   <td><span style="text-decoration:underline;">Steps</span>
   </td>
   <td><span style="text-decoration:underline;">Data</span>
   </td>
   <td><span style="text-decoration:underline;">Expected results</span>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Enter a valid email address in the “Email” input element
   </td>
   <td><em>test@example.com</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Enter a valid password in the “Password” input element
   </td>
   <td><em>password</em>
   </td>
   <td>The field has been completed with “*” signs
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Click on the “Login” button
   </td>
   <td>
   </td>
   <td>Login should be successful
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Check the URL address
   </td>
   <td>
   </td>
   <td>User should be on the “...<em>/admin</em>” page
   </td>
  </tr>
</table>


## Test suite: Mongoose Resources forms

### MRF-1: Create a new element via form on the “Complicated” list

**Test description:** Verify if a user will be able to create a new element on the list

**Type:** Functional

**Priority:** Medium

**Severity:** Normal

**Behavior:** Positive

**Automation status:** To be automated

**Tags:** mongoose_resources, complicated_category, complicated_form

#### Precondition:

*   User is already logged into the application

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">No.</span>
   </td>
   <td><span style="text-decoration:underline;">Steps</span>
   </td>
   <td><span style="text-decoration:underline;">Data</span>
   </td>
   <td><span style="text-decoration:underline;">Expected results</span>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Click on the hamburger menu if the navigation panel is not visible
   </td>
   <td>
   </td>
   <td>Navigation panel is visible
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Click on the “Mongoose Resources” → Complicated link inside the navigation panel
   </td>
   <td>
   </td>
   <td>User should be redirected to the “<em>.../admin/resources/Complicated</em>” page
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Hide the navigation panel if you launch it via hamburger menu
   </td>
   <td>
   </td>
   <td>Navigation panel is not visible. Hamburger menu is visible
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Click on the “Create new” button
   </td>
   <td>
   </td>
   <td>The form is visible. User should be on the “<em>.../admin/resources/Complicated/actions/new</em>” page
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Fill the “Name” input element with a random value
   </td>
   <td><em>e.g. Alex</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Click on the “Add New Item” button in the “String Array” section
   </td>
   <td>
   </td>
   <td>A text input element and bin icon are shown
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Click on the bin icon
   </td>
   <td>
   </td>
   <td>The text input element was removed
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Click on the “Add New Item” button again in the “String Array” section
   </td>
   <td>
   </td>
   <td>A text input element and bin icon are shown again
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Fill the text input element with a random value
   </td>
   <td><em>e.g. String Array</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Click on the “Add New Item” button in the “Authors” section
   </td>
   <td>
   </td>
   <td>A text input element and bin icon are shown
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>Choose one of the elements from the dropdown list
   </td>
   <td><em>e.g. Books</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>Fill the “Nested Details Age” input element with a random value
   </td>
   <td><em>e.g. 26</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>13
   </td>
   <td>Fill the “Nested Details Height” input element with a random value
   </td>
   <td><em>e.g. 187</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>14
   </td>
   <td>Fill the “Nested Details Place Of Birth” input element with a random value
   </td>
   <td><em>e.g. Warsaw</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>15
   </td>
   <td>Fill the “Nested Details Place Of Birth” input element with a random value
   </td>
   <td><em>e.g. Extremely Nested Text</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>16
   </td>
   <td>Click on the “Add New Item” button in the “Parents” section
   </td>
   <td>
   </td>
   <td>Two text input elements (“Parents Name”, “Parents Surname”) and the bin icon are shown 
   </td>
  </tr>
  <tr>
   <td>17
   </td>
   <td>Fill the “Parents Name” input element with a random value
   </td>
   <td><em>e.g. Harry</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>18
   </td>
   <td>Fill the “Parents Surname” input element with a random value
   </td>
   <td><em>e.g. Potter</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>19
   </td>
   <td>Click on the “Add New Item” button in the “Item” section
   </td>
   <td>
   </td>
   <td>The “Item Image Variants” section with a new button “Add New Item” and the bin icon are shown
   </td>
  </tr>
  <tr>
   <td>20
   </td>
   <td>Click on the “Add New Item” button in the “Item Image Variants” section
   </td>
   <td>
   </td>
   <td>Two input elements, two checkboxes and a new bin icon are shown
   </td>
  </tr>
  <tr>
   <td>21
   </td>
   <td>Fill the “Item Image Variants Image URL” input element with a random value
   </td>
   <td><em>e.g. www.google.com</em>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>22
   </td>
   <td>Check the checkbox “Item Image Variants Is Approved”
   </td>
   <td>
   </td>
   <td>The checkbox is checked
   </td>
  </tr>
  <tr>
   <td>23
   </td>
   <td>Set the random date and time from the picker in “Item Image Variants Date Created” input element
   </td>
   <td>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>24
   </td>
   <td>Click on the “Save” button
   </td>
   <td>
   </td>
   <td>User is redirected to the “<em>.../admin/resources/Complicated</em>” page. The toast message: “Successfully created a new record” is shown
   </td>
  </tr>
  <tr>
   <td>25
   </td>
   <td>Look at the number of the elements on the list
   </td>
   <td>
   </td>
   <td>The number is increased by 1
   </td>
  </tr>
  <tr>
   <td>26
   </td>
   <td>Look at your new element on the list
   </td>
   <td>
   </td>
   <td>Your element should be at the top of the list
   </td>
  </tr>
  <tr>
   <td>27
   </td>
   <td>Look at values in each column in your element
   </td>
   <td>
   </td>
   <td>Users should see provided data in each related column. Columns “String Array”, “Authors”, “Parents” and “Item” show information about quantity. In this case “length: 1”. Column “Id” has a random string. Column “Updated At” shows time and date of creating
   </td>
  </tr>
</table>


## Test suite: Sequelize Resources filters

### SRF-1: Filter elements on the “Favorite Places” list

**Test description:** Verify if a user will be able to filter elements on the list

**Type:** Functional

**Priority:** Medium

**Severity:** Normal

**Behavior:** Positive

**Automation status:** To be automated

**Tags:** sequelize_resources, favorite_places_category, favorite_places_filters, filters

#### Precondition

*   User is already logged into the application

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">No.</span>
   </td>
   <td><span style="text-decoration:underline;">Steps</span>
   </td>
   <td><span style="text-decoration:underline;">Data</span>
   </td>
   <td><span style="text-decoration:underline;">Expected results</span>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Click on the hamburger menu if the navigation panel is not visible
   </td>
   <td>
   </td>
   <td>Navigation panel is visible
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Click on the “Sequelize Resources” → Favourite Places link inside the navigation panel
   </td>
   <td>
   </td>
   <td>User should be redirected to the “<em>.../admin/resources/FavouritePlaces</em>” page
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Hide the navigation panel if you launch it via hamburger menu
   </td>
   <td>
   </td>
   <td>Navigation panel is not visible. Hamburger menu is visible
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>If there is no any elements on the list, create at least two elements with random data
   </td>
   <td>
   </td>
   <td>The elements are visible on the list
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Click on the “Filter” button
   </td>
   <td>
   </td>
   <td>The filters section with form is visible 
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Fill the “Name” input element with the name from e.g. the first element on the list 
   </td>
   <td>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Click on the “Apply changes” button inside the filters section
   </td>
   <td>
   </td>
   <td>On the list should be visible only elements with the name inserted in the filter input
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Click on the “Reset” button inside the filters section
   </td>
   <td>
   </td>
   <td>Inside the list all elements should be visible 
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Fill the “Id” input element with the Id from e.g. the first element on the list
   </td>
   <td>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Click on the “Apply changes” button inside the filters section
   </td>
   <td>
   </td>
   <td>On the list should be visible only elements with the Id inserted in the filter input
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>Click on the “Reset” button inside the filters section
   </td>
   <td>
   </td>
   <td>Inside the list all elements should be visible 
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>Choose one of the elements from the “User Id” dropdown element with the User Id from e.g. the first element on the list
   </td>
   <td>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>13
   </td>
   <td>Click on the “Apply changes” button inside the filters section
   </td>
   <td>
   </td>
   <td>On the list should be visible only elements with the User Id inserted in the filter input
   </td>
  </tr>
  <tr>
   <td>14
   </td>
   <td>Click on the “Reset” button inside the filters section
   </td>
   <td>
   </td>
   <td>Inside the list all elements should be visible 
   </td>
  </tr>
  <tr>
   <td>15
   </td>
   <td>Choose the dates “From” and “To” that first element’s “published At” field on the list is in the range of them 
   </td>
   <td>
   </td>
   <td>The fields have been completed
   </td>
  </tr>
  <tr>
   <td>16
   </td>
   <td>Click on the “Apply changes” button inside he filters section
   </td>
   <td>
   </td>
   <td>On the list should be visible only elements with “Published At” date and time in the range of the filters
   </td>
  </tr>
  <tr>
   <td>17
   </td>
   <td>Click on the “Reset” button inside the filters section
   </td>
   <td>
   </td>
   <td>Inside the list all elements should be visible 
   </td>
  </tr>
  <tr>
   <td>18
   </td>
   <td>Fill the “Description” input element with the word from the column “Description” from e.g. the first element on the list
   </td>
   <td>
   </td>
   <td>The field has been completed
   </td>
  </tr>
  <tr>
   <td>19
   </td>
   <td>Click on the “Apply changes” button inside the filters section
   </td>
   <td>
   </td>
   <td>On the list should be visible only elements with “Description” field which include the word from the filter input element
   </td>
  </tr>
  <tr>
   <td>20
   </td>
   <td>Click on the “Reset” button inside the filters section
   </td>
   <td>
   </td>
   <td>Inside the list all elements should be visible 
   </td>
  </tr>
</table>

