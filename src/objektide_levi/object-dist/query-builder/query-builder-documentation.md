# Using SmartHTMLElements components in Aurelia

### 1. Choose the component from their website.
We chose this
```
https://www.htmlelements.com/demos/querybuilder/overview/
```

### 2. Download the dependencies.
````
npm install smart-webcomponents-community
````

### 3. Create a new component.
````
au g component newcomponentname
````

### 4. Read the specific import requirements.
``
https://www.htmlelements.com/docs/querybuilder/
``<br>
Import the required JS files from the node_modules folder.<br>
For example
````$xslt
import { smartQueryBuilder } from "../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";
````
Then take their JS methods (from the documentation) and paste it to your JS file.<br>
CSS files must also be imported inside the JS file, not inside the HTML (as described in HTMLElements documentation)
<br>
Instead of this
````
 <link rel="stylesheet" href=../smart-webcomponents-community/source/styles/smart.default.css" type="text/css" />
````
Import CSS like this in JS file
````
import "../smart-webcomponents-community/source/styles/smart.default.css";
````
### 5. Component's HTML file.
HTML file should only include the content between "< body>" tags. No additional imports were required for us.

### 6. Displaying the component.
To display the component inside another component you must use the require tags
```
<require from="./query-builder/query-builder"></require>
```
and after that you can display the component by using these tags
````
<query-builder></query-builder>
````
