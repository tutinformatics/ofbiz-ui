# Functionality description

## Guest view
Guest is not authorised user who can read information about Affiliate Marketing and why to become affiliate partner.
As well he can become a affiliate partner when logged in.

This view has no functionality. The main point of this view is to attract users to become our affiliate partners

### Authorised user

User who is authorised to the system has next views (can be found in navigation side panel)

   * Become Partner - Can become an affiliate partner. When clicking button "Join for free" your cookies are
   checked for existence of somebodies affiliate code and if it exists you are becoming somebodies subpartner (multilevel affiliation)
   if not, you become independent affiliate partner. But only after admin user confirmation.
   * Status  - Shows current status, can be either "guest" or "pending" because member user have different view. Status is updated automatically
   after sending joining request.
   * Info - Shows some information about Affiliate Marketing and its profitness.

### Member view

After authorised user joining request and admin confirmation user becomes a member of affiliate partnership.
Next views:

   * My Affiliates - Shows all affiliate subpartners or subaffiliates of current user. All affiliates can be filtered by any value for
   better management. When clicking on the eye icon the detailed view modal is opened where you can find a profile photo and more
    detailed information about affiliate partner.
   *  Generate Code - Allows to generate new affiliate code by product category. Affiliate code commission (percentage affiliate partner gets from the purchase) and
   discount (discount percentage on product from current category) are defined by admin user and stored in global settings. Here affiliate marketing partner
   can manage all his affiliate codes, and delete them if its not default user code. Each partner has default affiliate code, with minimal discount and commission for all
   product categories.
   * Review - Allows to take look on some statistics and other useful general information connected with partnership.
    All tables contains only first 3 positions from the collections. To see all products/affiliates/codes. You need to click "Show More". Then modal with larger
    table which contains all values and pagination will be opened.
   * Top Partners - Shows top 3 most productive partners and their statistics
   * Settings  - Allows to manage affiliate partner personal information.

### Admin

username: admin

password: ofbiz

Admin is main system user who can manage affiliates and affiliate marketing global settings

Next views:
   *  Affiliates - Shows all system affiliate partners and and their detailed information. Allows to deactivate affiliate partner
   partnership and automatically erase all affiliate codes connected to deactivated partner. Table can be filtered by any table value.
   *  Approve - Allows to approve or disapprove new request of joining affiliate partnership.
   * Global Settings - Allows to set affiliate marketing global settings: frequency of commission payments,
    possibility of multilevel affiliate system, aff code duration in cookies, and user group for new affiliate partner.
    Also allows to set affiliate code commission and discount for each product category.

