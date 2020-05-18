**General information**  

The aim of our crm application is to ensure that a user will be
able to get an overview of any available contact's data inside
the organization in the complex view.

In complex view, any kind of clients' information is just one click away.
The user can navigate easily between clients using search by categories.
The search is case-insensitive and supports multiple words (first name
and last name excluded).
The option for displaying specific kind of information persists when the
active client changes. Overall, we achieved quite smooth user experience.

We have also created three views for clients, orders and bills entities each.
Each view has table + card views and supports filtering (except numeric values).

**Back end interaction**  
CRM does not really need to change or add data except for client information.
We use Generic REST Endpoint and Ofbiz view entities to gather data to display.
We use Generic Rest Endpoint and existing Ofbiz services to change/update data.

**Deploy**  
We have deployed our solution in Google Cloud. No ssl, so some jumping through the hoops may be required :)  
http://35.228.70.242:8081/  
We use tarkvara trunk as our back end.
