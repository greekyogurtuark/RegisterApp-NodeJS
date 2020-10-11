document.addEventListener('DOMContentLoaded', () => {
  // TODO: Anything you want to do when the page is loaded?
})

function validateForm () {
  var eID = document.getElementsByClassName('inputContent').eID
  var pass = document.getElementsByClassName('inputContent').pass
  var fail = false
<<<<<<< HEAD

  if (eID == '' || isNaN(eID)) {
    alert('Employee ID must be nonempty and a sequence of numbers: ' + eID)
    fail = true
  }
  if (pass == '') {

    alert('Password must be nonempty.')
    fail = true
  }

=======
  if (eID == '' || isNaN(eID)) {
    alert('Employee ID must be nonempty and a sequence of numbers.')
    fail = true
  }
  if (pass == '') {
    alert('Password must be nonempty.')
    fail = true
  }

>>>>>>> 7d2dfaae46eae65b63fe74c545e89664ea3136ed
  if (fail) {
    return false
  }
  return true
}
