const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <action>', 'choose action')
  .option('-i, --id <id>', 'user id')
  .option('-n, --name <name>', 'user name')
  .option('-e, --email <email>', 'user email')
  .option('-p, --phone <phone>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContact = await contacts.listContacts();
            console.table(allContact);
            break;

        case 'get':
           const contact = await contacts.getContactById(id);
              console.table(contact); 
          break;

        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            console.table(newContact);
            break;

        case 'remove':
            const removedContact = await contacts.removeContact(id);
              console.table(removedContact);
            break;
        default:
            console.warn('Unknown action type!');
    }
}

invokeAction(argv);