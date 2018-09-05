console.log('Before');

// promises based
 const p = getUser(1).then(user => getRepositories(user.name))
 .then(repo => console.log('Repo : ', repo))
 .catch(err => console.log('Error : ', err.message));

 //async and await based
 const user = await getUser(1);
 const repo =  await getRepositories(user.name);
 
console.log('After');

function getUser(id){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Get a user from database.');
            resolve({id : 1, name:"sohel"});
        }, 2000);
    });  
}

function getRepositories (username){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Get a user from github.');
            resolve(['repo1', 'repo2']);     
        }, 2000);
    })
}
