# `How to use performFind service`
Ofbizi performFind, performFindItem ja peformFindList on kasulikud servisid entitite otsimiseks ja sorteerimiseks. Selle eelis on see, et ta võimaldab leida ka view-entiteid.

Kasutamise üks näide
```
import {HttpClient} from 'aurelia-fetch-client';
let response = await this.http.fetch('/services/performFindList', {
    method: 'post',
    body: json({
        "entityName": "PartyExport",
        "noConditionFind": "Y",
        "inputFields": {}
    })
  })
  .then(response => response.json())
  .catch(() => {
    alert('Error fetching clients!');
});
```
PartyExport on view-entity

Soovitatav vaadata ka generic enpointide tutoriali big data tiimi poolt.
