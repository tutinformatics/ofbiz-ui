##Querybuilderist tuleva filtri kuju<br>
Sellisest päringust genereeritakse järgnev filter<br>
![Query Builder Image](https://cdn.discordapp.com/attachments/634804302149451776/706518639515402300/unknown.png)
```
"filter": "[{"agreementId":["15"],"partyIdFrom":["21"]},{"description":["testdata"]}]"
```
Ehk siis list objektidest (objektid on need välimised päringutingimused), mis on eraldatud komadega, välimine tingimus saab olla ainult OR.
Listis olevad objektid sisaldavad endas ofbiz entity välja nime ning sellele vastavat listi, kus on querybuilderi välja väärtus.
