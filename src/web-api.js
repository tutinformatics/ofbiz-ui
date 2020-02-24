let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let contacts = [
  {
    id:getId(),
    url:'/here',
    code:'FAV',
    userid:'0',
    name:'Summary',
    workspace_group_id:'5122'
  },
  {
    id:getId(),
    url:'/there/here',
    code:'DEF',
    userid:'44',
    name:'Tables',
    workspace_group_id:'5309'
  },
  {
    id:getId(),
    url:'/apps',
    code:'DEF',
    userid:'12',
    name:'Light',
    workspace_group_id:'1'
  },
];

export class WebAPI {
  isRequesting = false;

  getContactList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = contacts.map(x =>  { return {
          id:x.id,
          url:x.url,
          code:x.code,
          name:x.name,
          workspace_group_id:x.workspace_group_id,
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if(found){
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        }else{
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
