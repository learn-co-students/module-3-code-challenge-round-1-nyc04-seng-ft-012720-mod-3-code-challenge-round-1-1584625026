document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4878 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const imagetag = document.querySelector("#image_card")
  const liketag = document.querySelector("#likes")

        // increase like
  // imagetag.addEventListener('click', e => {
  //   if(e.target.tagName = "BUTTON"){
  //     console.log("you clicked me")
  //   }
  // })
  // fetch(imageURL) {
  //   method: 'POST'

  // }

        //add comments
  // const newCommnetForm = document.querySelector("#comment_form")
  // newCommnetForm.addEventListener('submit', e =>{
  //   e.preventDefault() 

  // })

  // console.log(newCommnetForm)
    // const newComment = e.target.comments.value
    // console.log(newComment)

    // newCommentObject = {
    //   comments: newComment
    // }
        //make a post request 

//     function postComment(newdata){
//       return fetch("commentsURL",{
//         method: 'POST', 
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newdata),
// })
//       .then((response) => response.json())
//     }
//       postComment(newCommentObject)
//   })
  

  function renderImage(image){
    imagetag.innerHTML = 
    `<img src="${image.url}" id="image" data-id=""/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    `
  const newCommnetForm = document.querySelector("#comment_form")
  newCommnetForm.addEventListener('submit', e =>{
    e.preventDefault() 


    const newComment = e.target.comment.value
    console.log(newComment)

    newCommentObject = {
      image_id: image.id,
      conetent: newComment

    }
        //make a post request 

    function postComment(newdata){
      return fetch('https://randopic.herokuapp.com/comments',{
        method: 'POST', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newdata),
})
      .then((response) => response.json())
    }
      postComment(newCommentObject)
      
  })



    // increase like
  imagetag.addEventListener('click', e => {
    if(e.target.tagName = "BUTTON"){
      console.log(image.like_count)
      
      
    }
  })





  }


  fetch(imageURL)
    .then(res => res.json())
    .then(renderImage)




  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
