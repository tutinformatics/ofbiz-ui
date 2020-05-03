## Querybuilderist tuleva filtri kuju <br>
Sellisest päringust genereeritakse järgnev filter<br>
![Query Builder Image](https://cdn.discordapp.com/attachments/634804302149451776/706527356444999690/unknown.png)
```
[
    [
        {
            "fieldName": "partyId",
            "operation": " greaterThanEqualTo",
            "value": "15"
        },
        {
            "fieldName": "sitePageViews",
            "operation": " greaterThan",
            "value": "25"
        }
    ],
    [
        {
            "fieldName": "siteType",
            "operation": "lessThan",
            "value": "500"
        }
    ]
]
```
Ehk siis list listidest (listid on need välimised päringutingimused), mis on eraldatud komadega, välimine tingimus saab olla ainult OR.
Listides sees olevad objektid sisaldavad endas ofbiz entity välja nime, tingimust ning väärtust.
