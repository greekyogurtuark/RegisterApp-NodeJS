document.addEventListener('DOMContentLoaded', () => {
  // TODO: Anything you want to do when the page is loaded?
})

function validateForm () {
  var eID = document.getElementsByClassName('inputContent').eID
  var pass = document.getElementsByClassName('inputContent').pass
  var fail = false

  if (eID == '' || isNaN(eID)) {
    alert('Employee ID must be nonempty and a sequence of numbers: ' + eID)
    fail = true
  }
  if (pass == '') {

    alert('Password must be nonempty.')
    fail = true
  }

  if (fail) {
    return false
  }
  return true
}
