let db;
const request = indexedDB.open('so-shul', 1);

request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('so-shul', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
    db = event.target.result;
  
    if (navigator.onLine) {
        uploadUser();
    }
};
  
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    const transaction = db.transaction(['so-shul'], 'readwrite');
  
    // access the object store for `new_pizza`
    const userObjectStore = transaction.objectStore('so-shul');
  
    // add record to your store with add method
    userObjectStore.add(record);
}

function uploadUser() {
    // open a transaction on your db
    const transaction = db.transaction(['so-shul'], 'readwrite');
  
    // access your object store
    const userObjectStore = transaction.objectStore('so-shul');
  
    // get all records from store and set to a variable
    const getAll = userObjectStore.getAll();
  
    // upon a successful .getAll() execution, run this function
    getAll.onsuccess = function() {
        // if there was data in indexedDb's store, let's send it to the api server
        if (getAll.result.length > 0) {
        fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(serverResponse => {
            if (serverResponse.message) {
                throw new Error(serverResponse);
            }
            // open one more transaction
            const transaction = db.transaction(['so-shul'], 'readwrite');
            // access the new_pizza object store
            const userObjectStore = transaction.objectStore('so-shul');
            // clear all items in your store
            userObjectStore.clear();

            alert('All saved user data has been submitted!');
            })
            .catch(err => {
            console.log(err);
            });
        }
    };
  };

window.addEventListener('online', uploadUser);

module.exports = saveRecord;