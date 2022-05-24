let emailReceiver = 'firmansyah720.fs@gmail.com';

function submitForm() {
    let formObject = {
        name: document.getElementById('input-name').value,
        email: document.getElementById('input-email').value,
        phone: document.getElementById('input-phone').value,
        subject: document.getElementById('input-subject').value,
        message: document.getElementById('input-your-message').value,
    };

    if (formObject.name == '' || formObject.email == '' || formObject.phone == '' || formObject.subject == '' || formObject.message == '') {
        alert('Lengkapi yang kosong....')
        return
    }

    // console.log(formObject);

    let a = document.createElement('a');
    a.href = `mailto:${emailReceiver}?subject=${formObject.subject}&body=Hello, my name ${formObject.name}, My Phone number is ${formObject.phone} ${formObject.subject}, ${formObject.message}`;
    a.click();
}