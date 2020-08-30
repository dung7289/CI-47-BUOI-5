const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage
            document.getElementById('Login-btn').addEventListener('click', () => { view.setActiveScreen('loginPage') })
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(data)
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage
            document.getElementById('Register-btn').addEventListener('click', () => { view.setActiveScreen('registerPage') })
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(data)

            })

            break;
        case 'chatPage':
            document.getElementById('app').innerHTML = component.chatPage
            //document.getElementById('wellcome-user').innerHTML=` Wellcome ${model.currentUser.displayName} to Chat-app`
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', async (e) => {

                //const response = await firebase.firestore().collection('conversations').doc(docId).get()
                // const conversation = getOneDocument(response)
                // console.log(conversation.users)
                e.preventDefault()
                // console.log(sendMessageForm.message.value)
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }
                const messageFromBot = {
                    content: sendMessageForm.message.value,
                    owner: 'abc@gmail.com',
                    createdAt: new Date().toISOString()
                }


                if (sendMessageForm.message.value.trim() !== '') {
                    const idToUpdate = 'pHCLEY40dWvYe4lO0eWm'
                    const dataToUpdate = {
                        messages: firebase.firestore.FieldValue.arrayUnion(message)
                    }
                    const dataToUpdateFromBot = {
                        messages: firebase.firestore.FieldValue.arrayUnion(messageFromBot)
                    }
                    await firebase.firestore().collection('conversations').doc(idToUpdate).update(dataToUpdate)

                    // await firebase.firestore().collection('conversations').doc(idToUpdate).update(dataToUpdateFromBot)

                    updateFromDatabase()

                }
                sendMessageForm.message.value = ``


            })
            // updateFromDatabase(0)
            // let leng=updateFromDatabase(0)
            setInterval(() => {
               updateFromDatabase()
                
            }, 5000);


            break;


    }
}
view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message')
    // console.log(model.currentUser.email)
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
        <div class="content"> ${message.content}</div>`
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class="owner">${message.owner}</div>
        <div class="content"> ${message.content}</div>`
    }

    // console.log(messageWrapper)
    document.querySelector('.list-message').appendChild(messageWrapper)
    document.querySelector('.list-message').scrollTop = messageWrapper.offsetHeight + messageWrapper.offsetTop
}

function checkMessage(message) {
    let space_number = 0
    console.log('check number ' + message.length)
    for (let index = 0; index < message.length; index++) {
        if (message[index] === ' ') {
            space_number = space_number + 1
        }
    }
    if (space_number === message.length) {
        return false
    } else {
        return true
    }
}
const updateFromDatabase = async (lengthOfConversation_before) => {
    let lengthOfConversation
    const docId = 'pHCLEY40dWvYe4lO0eWm'
    const response = await firebase.firestore().collection('conversations').doc(docId).get()
    const conversation = getOneDocument(response)
    document.querySelector('.conversation-title').innerHTML = conversation.title
    lengthOfConversation = conversation.messages.length
    console.log(lengthOfConversation_before)
    console.log(lengthOfConversation)
    if(lengthOfConversation_before!==lengthOfConversation){
        for (const mess of conversation.messages) {
            const message = {
                content: mess.content,
                owner: mess.owner
            }
            view.addMessage(message)
        }
    }
    
    return lengthOfConversation
}

