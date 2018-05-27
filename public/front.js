const contactInfoList = document.querySelectorAll('.contact-info');

document.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.classList.contains('contact-info')) {
    contactInfoList.forEach(element => {
      element.classList.add('hide');
    });
  }

  if (target.classList.contains('contact')) {
    const contactInfo = target.nextElementSibling;

    fetch(`/${contactInfo.id}`, {  
      method: 'POST',  
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      }, 
    })
    .then(function (data) {  
      data.json().then(function (data) {
        console.log(JSON.parse(data));
      })
    })  
    .catch(function (error) {  
      console.log('Request failed', error);  
    });

    contactInfo.classList.remove('hide');
  }
});
