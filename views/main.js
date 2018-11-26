function getValue(id){
    return document.getElementById(id).value;
};

function addUser(){
    if(getValue("name") && getValue("email") &&getValue("password") && getValue("passwordConf") !==""){
            if(getValue("password") === getValue("passwordConf")){
            var myPost = {};
            myPost.name = getValue("name");
            myPost.email = getValue("email");
            myPost.password = getValue("password");
            
            var option = {
                method: 'POST',
                body: JSON.stringify(myPost),
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            fetch('http://localhost:4008/user/add', option)
            .then(res=> res.json());
            }
            else{
                document.getElementById('status').innerHTML = "Passwords do not match"
        }
        
    }
    else{
        document.getElementById('status').innerHTML = "All fields are required"
    }
};

function logInUser(){
    if(getValue("email") && getValue("password") !== ""){
        var myPost = {};
        myPost.email = getValue("email");
        myPost.password = getValue("password");

        var option = {
            method: 'POST',
            body: JSON.stringify(myPost),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:4008/user/login', option)
        .then(res=> res.json())
        .then(res=> console.log(res.response));
    }
    else{
        document.getElementById('status').innerHTML = "All fields are required"
    }
};

function userloggedIn(){
    fetch('http://localhost:4008/user/isUserLoggin')
    .then(res=> res.json())
    .then(res=>{
        if(res.resp == true){
            document.getElementById('logIn').style.display = 'none';
            var script = document.createElement('script');
            script.src = 'game/game.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        else{
            document.getElementById('logIn').style.display = 'block';
        }
    });
};