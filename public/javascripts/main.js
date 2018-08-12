// adds the addit form to the dom
function addAdditForm() {
  let additTemp = document.querySelector('#book_additional');
  let insertPnt = document.querySelector('#book_additionals');

  let clone = document.importNode(additTemp.content, true);

  insertPnt.appendChild(clone);
}

// removes the addit form from the dom
function delAdditForm(event) {
  event.target.parentNode.remove();
}
