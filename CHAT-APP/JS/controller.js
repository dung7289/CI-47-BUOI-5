const controller = {}
controller.register = (data)=>{
    
    // if(data.firstName ===''){
    //     view.setErrorMessage('first-name-error','Please input your first name')
    // }else{
    //     view.setErrorMessage('first-name-error','')
    // }
    view.setErrorMessage('first-name-error',data.firstName ===''?'Please input your first name':'')
    view.setErrorMessage('last-name-error',data.lastName ===''?'Please input your last name':'')

    // if(data.lastName ===''){
    //     document.getElementById('last-name-error').innerText='Please input your last name'
    // } else{
    //     document.getElementById('last-name-error').innerText=''
    // }
    if(data.email ===''){
        document.getElementById('email-error').innerText='Please input your email'
    }else{
        document.getElementById('email-error').innerText=''
    }

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(data.email)) { 
             console.log('Hay nhap dia chi email hop le.\nExample@gmail.com');
             //email.focus; 
             return false; 
    }
    else{ 
             console.log('OK. Email nay hop le.'); 
    } 
    if(data.password ===''){
        document.getElementById('password-error').innerText='Please input password. Password can not blank'
    }else{
        document.getElementById('password-error').innerText=''
        if(data.password !== data.confirmPassword){
            document.getElementById('confirm-password-error').innerText='Please confirm password. Confirm password not same'
        }else{
            document.getElementById('confirm-password-error').innerText=''
        }
    }
    if(data.firstName !=='' && data.lastName !=='' && data.email !=='' && data.password !=='' && data.password === data.confirmPassword){
        console.log('ok nha')
        model.register(data)
    }
    
}

controller.login = (data)=>{
    
    if(data.email ===''){
        document.getElementById('email-error').innerText='Please input your email'
    }else{
        document.getElementById('email-error').innerText=''
    }

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(data.email)) { 
             console.log('Hay nhap dia chi email hop le.\nExample@gmail.com');
             //email.focus; 
             return false; 
    }
    else{ 
             console.log('OK roi day, Email nay hop le.'); 
    } 
    if(data.password ===''){
        document.getElementById('password-error').innerText='Please input password. Password can not blank'
    }else{
        document.getElementById('password-error').innerText=''
    }
    if(data.email !=='' && data.password !==''){
        model.login(data)
    }
    
}