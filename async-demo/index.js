console.log('Before');
 getUser(1, function(user) {
    console.log('User', user);
    getRepositories('sohel', (repo) => {
        console.log('Repos : ',repo);
    })
});
console.log('After');

function getUser(id, callback){
    setTimeout(() => {
        console.log('Get a user from database.');
        callback({id : 1, name:"sohel"});
    }, 2000);
}

function getRepositories (username,callback){
    setTimeout(() => {
        console.log('Get a user from github.');
        callback(['repo1', 'repo2']);     
    }, 2000);
  
}
