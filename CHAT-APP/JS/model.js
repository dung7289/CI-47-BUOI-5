// nhiệm vụ tương tác với database
const model={}
model.currentUser = undefined
model.register= async (data)=>{ // khai báo sử dụng đồng bộ async
    try{
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password) // await đặt trước câu lệnh cần trả về từ server
        console.log(response)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })

        firebase.auth().currentUser.sendEmailVerification()
        alert('Please verify by email to complete sign up')
    } catch (err){
        console.log(err)
        alert(err)
    }
    
}
model.login = (data)=>{
    try{
        response = firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        console.log(response)
        // if(response.user.emailVerified===false){
        //     alert('Please verify by email to complete sign up')
        // } else{
        //     //alert(' Wellcome to Chat app')
        //     model.currentUser={
        //         email: response.user.email,
        //         displayName:response.user.displayName
        //     }
        //     view.setActiveScreen('chatPage')
        // }
    }catch (err){
        console.log(err)
        alert(err.message)
    }
    
}