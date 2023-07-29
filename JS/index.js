const MODAL = document.getElementById('MODAL');

//Toggle Model popup
const showModel = () => {
    MODAL.classList.remove('hidden');
    MODAL.classList.add('z-10')
}

const closeModel = () => {
    MODAL.classList.remove('z-10');
    MODAL.classList.add('hidden')
}

//Getting every gallery div
const galleryDiv = document.querySelectorAll('.galleryDiv');
const galleryShowcaseDiv = document.getElementById('galleryShowcaseDiv'); //showCase div
const gtName = document.getElementById('gtName'); // Gallery type name Heading 
const GalleryStorage = document.getElementById('GalleryStorage'); // Popup row where div will be appended

//Gallery type array
const galleryType = ['kitchen', 'wallpaper', 'storage', 'bedroom', 'blinds', 'living'];

// Close button for showCaseDiv
const closeShowcaseDiv = () => {
    galleryShowcaseDiv.classList.remove('visible');
    galleryShowcaseDiv.classList.add('hidden');
}

//Checking for gallery type
galleryDiv.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        galleryShowcaseDiv.classList.remove('hidden');
        galleryShowcaseDiv.classList.add('visible');

        for (let i = 0; i < galleryType.length; i++) {
            if(galleryType[i] == e.target.classList[0])
            {
                gtName.innerText = galleryType[i].charAt(0).toUpperCase() + galleryType[i].slice(1);
                addElement(galleryType[i]);
                break;
            }
        }
    });
});

// adding image according to gallery type dynamically
const addElement = (folderName) => {

    //Checking if already Gallery storage already contains other div elemntst to show
    if (GalleryStorage.childElementCount == 10){
        GalleryStorage.innerHTML = '';
        GalleryStorage.scrollLeft = 0; 
    }   

    for (let i = 1; i <= 10; i++){
        //Creating Dom tree 
        const container = document.createElement('div');
        const div = document.createElement('div');
        const img = document.createElement('img');

        img.src = `images/${folderName}/${i}.jpeg`;
        img.setAttribute('class', 'photo');

        // Adding necessary tailwind classes to element created
        container.classList.add('inline-block', 'px-3');
        div.classList.add('w-64', 'h-64', 'max-w-xs', 'overflow-hidden', 'rounded-lg', 'shadow-md', 'bg-white', 'hover:shadow-xl', 'transition-shadow', 'duration-300', 'ease-in-out');
        
        div.appendChild(img);
        container.appendChild(div);
        GalleryStorage.appendChild(container);
    }
}

// Send mail funciton 
const sendMail = () => {
    // Getting input fields
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name == '' || email == '' || phone == '' || message == '') {
        alert('Pls fill the input fields');
        return;
    } 

    var Body = '<b>Hello i am: </b>' + name + '<br><b>My Phone no: <b>' + phone + '<br><b>My email: <b>' + email + '<br><br>My message: ' + message;

    // Email functionallty by SMPTP.js
    Email.send({
        Host: "smtp.elasticemail.com",  //Sign up in this website
        Username: "invictusasw7@gmail.com", // enter the email from which you wana send
        Password: "501E00D1DAB78FF4DA5EACEC4907E302A374", // this is the key given by Host
        To: 'san2722soni@gmail.com', // where you want to send
        From: "invictusasw7@gmail.com", //
        Subject: "New mail from Interio.com",
        Body: Body
    }).then(
        message => {
            //console.log (message);
            if (message == 'OK') {
                alert('Your mail has been send. Thank you for connecting.');
            }
            else {
                console.error(message);
                alert('There is error at sending message. ')

            }

        }
    );
}