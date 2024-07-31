const form = document.forms['add-note']
 const btn =   document.querySelector('#btn');

 const display = document.querySelector('.display')

 const search = document.forms['search-notes'].querySelector('#search');

 console.log(search)
//  search notes 
search.addEventListener('keyup', () => {
  const value  = search.value.toLowerCase();

  const  lists =  display.getElementsByTagName('li');

  Array.from(lists).forEach( (list) => {
    const first = list.firstElementChild.textContent;

    if(first.toLowerCase().includes(value)) {
      list.style.display = 'block';
    } else {
       list.style.display = 'none';
    }
  })
})



// hide all notes 

const hide = document.forms['search-notes'].querySelector('#hide');

hide.addEventListener('change', (e) => {

  if(e.target.checked) {
    display.style.visibility = 'hidden'
  } else {
    display.style.visibility = 'visible'
  }
})





//  removing list parentelement when clicked
  display.addEventListener('click', (e) => {
    
    if(e.target.tagName == 'I') {
      //  e.target.parentElement.remove();
       const li = e.target.parentElement;

      //  console.log(li.firstElementChild.textContent)

    
       display.removeChild(li)
        console.log(li.firstElementChild.textContent)

       deletelocal(li)

    }
  })

//  add note
 const addnote = (note) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const trash = document.createElement('i');

  li.append(span);
  li.append(trash);
  display.append(li);
 
   trash.setAttribute('class', 'fa-solid fa-trash');
  //  span.innerText = form.querySelector('input').value;
   span.innerText = note;
 }

//   input validation else add note
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const typing = form.querySelector('#typing');

  if (typing.value == '') {
    // typing.classList.add('error');
    alert('add note please!')
  }
  else {
    addnote([typing.value]);
    save([typing.value]);
    typing.value = '' ;
  
    
  }


})

// keep data when loadded
document.addEventListener("DOMContentLoaded", () => {

  
  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }

  old.forEach(addnote)
  // old.forEach(note => {

  // })

});




const save = (note) => {

  if(note.length < 0) {
    return;
  }

  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }



  old.push(note);

  console.log(old);

  localStorage.setItem('notes', JSON.stringify(old));

}

const deletelocal = (del)  => {


  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }

  old.map((data, index) => {
    if (data[0] == del.firstElementChild.textContent.trim()) {
      old.splice(index, 1)

      return old;
    }
  })

  localStorage.setItem('notes', JSON.stringify(old))

  
  
}