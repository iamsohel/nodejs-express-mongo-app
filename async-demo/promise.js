const p = new Promise((resolve, reject) => {
    setTimeout( () => {
        //resolve(1);
        reject(new Error('message'));
    }, 1000);
});

p.then(resolve => console.log('Resolve', resolve))
.catch(function(err){
    console.log('Error : ', err.message);
});