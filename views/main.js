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

            fetch('http://localhost:4001/user/add', option)
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