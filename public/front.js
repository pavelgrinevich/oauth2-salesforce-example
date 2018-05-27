const contactInfoList = document.querySelectorAll('.contact-info');

document.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.closest('.contact-info')) {
    contactInfoList.forEach(element => {
      element.classList.add('hide');
    });
  }
  
  if (target.classList.contains('contact')) {
    const contactInfoDiv = target.nextElementSibling;

    const options = {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },
    };

    contactInfoDiv.innerText = 'please wait, loading ...'

    fetch(`/${contactInfoDiv.id}`, options)
      .then((result) => result.json())
      .then((contactInfo) => {
        contactInfo = JSON.parse(contactInfo);

        contactInfoDiv.innerHTML = `
          <p>First Name: <span>${contactInfo.FirstName}</span></p>
          <p>Last Name: <span>${contactInfo.LastName}</span></p>
          <p>Birthdate: <span>${contactInfo.Birthdate}</span></p>
          <p>Mobile Phone: <span>${contactInfo.MobilePhone}</span></p>
          <p>Email: <span>${contactInfo.Email}</span></p>
        `;
      })
      .catch(function (error) {  
        console.log('Request failed', error);  
      });

      contactInfoDiv.classList.remove('hide');
  }
});

