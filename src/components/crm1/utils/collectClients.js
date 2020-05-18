export function collectClients(clients) {
  let clientsMap = new Map();
  for (let i = 0; i < clients.length; i++) {
    let curClient = clients[i];
    if (clientsMap.has(curClient.partyId)) {
      let checkedClient = clientsMap.get(curClient.partyId);
      for (let [key, value] of Object.entries(curClient)) {
        if (value !== null && checkedClient[key] === null) {
          checkedClient[key] = value;
        }
      }
    } else {
      clientsMap.set(curClient.partyId, curClient);
    }
  }
  return Array.from(clientsMap.values());
}
