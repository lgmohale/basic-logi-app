function addUser(){
    const myPost = {};
    myPost.mame = document.getElementById("name").value;
    myPost.email = document.getElementById("email").value;
    myPost.password = document.getElementById("password").value;

    const option = {
        method: 'POST',
        body: JSON.stringify(myPost),
        headers:{
            'Content-Type': 'application/json'
        }
    };

    fetch('http://localhost:4000/user/add', option)
    .then(res=> res.json());
};