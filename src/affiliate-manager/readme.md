# Functionality description

## Guest view
Guest is not authorised user.

### Functionality
The main point of this view is to attract user to become an affiliate partner on our platform.

1) Guest should be able to get general information about what is affiliate marketing
2) Guest should not be able to apply for affiliate partnership
3) Guest should be able to sign up (sign up is developed by affiliate marketing team)
4) Guest should be able to log in (log in is developed by affiliate marketing team)

## Authorized user
Authorized user - successfully logged in user

### Functionality

1) Authorized user should be able to apply for affiliate partnership (join button)
2) Authorized user should be able to check the status (disapproved/pending/not initiated yet)
3) Authorized user should be able to get general information about what is affiliate partnership

### Description of views:
  Become Partner:

There is only one button on this page - the button that allows user to apply for affiliate partnership. User sees a green alert that means that the request is successfully processed and user's status is updated. A red alert is invoked in case of error. At the same time, we have a cookie check: if user has some affiliate code in cookies, then this user becomes a sub-partner (code owner is a parent of this chain). A candidate becomes affiliate partner only after a manual admin confirmation (described in admin part)

  Status:

  This page shows user's status. There are three possible statuses: not applied for program, pending, disapproved. Approved user automatically becomes member

  Info:
  Shows some information about Affiliate Marketing and its profitness.

## Member view

Member - user that had applied for affiliate partnership and who's request has been accepted

### Functionality:

1) Member should be able to generate new affiliate codes for a chosen category
2) Member should be able to delete generated codes
3) Member should be able to see all his/her sub-partners
4) Member should be able to get a review of recent activities (**placeholders, because billing module is not implemented yet; billing was not in scope**):
- recent purchases with user's affiliate codes
- sub-partners' results
- statistics per affiliate code


Views:

   * My Affiliates - Shows all affiliate subpartners or subaffiliates of current user. All affiliates can be filtered by any value for a
   better management. When clicking on the eye icon the detailed view modal is opened where you can find a profile photo and more
    detailed information about a particular affiliate partner.
   *  Generate Code - Allows to generate new affiliate code for a chosen product category. Affiliate code commission (percentage affiliate partner gets from the purchase) and
   discount (discount percentage on product from current category) are defined by admin user and stored in global settings. Here affiliate marketing partner can manage all his/her affiliate codes, and delete them if its not default code. Each partner has default affiliate code, with minimal discount and commission for all
   the product categories.
   * Review - Allows to take look on some statistics and other useful general information related to the partnership.
    All tables contains only first 3 positions from the collections. To see all products/affiliates/codes. You need to click "Show More". Then modal with larger
    table which contains all values and pagination will be opened.
   * Top Partners - Shows top 3 most productive partners and their statistics **(placeholders, the same reason)**
   * Settings  - Allows to manage affiliate partner personal information **(changes are not synced with backed, it was not in scope)**

## Admin

username: admin
password: fucking-ofbiz (without fucking-)

Admin is a predefined user who is able to manage affiliates and affiliate marketing global settings

### Functionality:

   1) Admin should be able to manage all affiliate partners,
        * Can approve a candidate
        * Can disapprove a candidate
        * Can deactivate an active affiliate partner
        * Can see some general information about a partner
   2) Admin should be able to manage commissions per product category
   3) Admin should be able to manage product discounts per product category
   4) Admin should be able to manage affiliate partners payouts
   4) Admin should be able to manage affiliate code presence duration in cookies

Views:
   Affiliates:

   It shows all affiliate partners and and a general partner information. It allows to deactivate affiliate partner
   partnership and automatically erase all affiliate codes connected to deactivated partner. Table can be filtered by any table value.


   Approve:

   Allows to approve or disapprove new request of joining affiliate partnership.


  Global Settings:

   Allows to set affiliate marketing global settings: frequency of commission payments, possibility of multilevel affiliate system, aff code duration in cookies, and user group for new affiliate partner.
    Also allows to set affiliate code commission and discount for each product category.
