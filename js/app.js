window.onload = function() {

  setTimeout(function() {

    document.body.classList.add('loaded')

    Draggable.create('.portfolio', {
      bounds: 'body', 
      inertia: true
    })
    
  }, 200)

 
}