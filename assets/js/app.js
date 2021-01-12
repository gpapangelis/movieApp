//Initian Values
const url = 'http://62.217.127.19:8010/movie';

//Selecting elements from the DOM
const buttonElement = document.querySelector('#search');  
const inputElement = document.querySelector('#inputValue'); //to input tou xrhsth gia anazhthsh tainias

buttonElement.onclick = function(event, data){    
    event.preventDefault();
    const value = inputElement.value;
    // Example POST method implementation:
    console.log(value.length);

    if(value.length<3){
      alert("Need to write more than 2 letters"); //eidopoihsh oti prepei na einai panw apo 2 grammata gia na kanei to post
      inputElement.value = '';
    }
    else{
    
  
  postData(url, { "keyword": value })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      
      //buildTable(data)
      
      if ( data.length == 0 ){
        alert("No movies found - Check the title");
    }
    else{
      buildTable(data)
    }
    });

    inputElement.value = '';
    

    //buildTable(data);
        
  }
} 





let movies = []; //to object pou kanoun store ta movies pou kanei rate o xrhsths
        // example {id:1592304983049, title: 'Deadpool', year: 2015}
        const addMovie = (ev)=>{
            ev.preventDefault();  //to stop the form submitting
            let movie = {
                movieid: document.getElementById('movieid').value,
                rating: document.getElementById('rating').value
            }
            movies.push(movie);
            document.forms[0].reset(); // to clear the form for the next entries
            //document.querySelector('form').reset();

            //for display purposes only
            console.warn('added' , {movies} );
            

            //saving to localStorage
            localStorage.setItem('MyMovieRates', JSON.stringify(movies) );
            var retrievedObject = localStorage.getItem('myMovieRates');

            
        }
        document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', addMovie);
        });

        async function postData(url, data /*= {"keyword": value }*/) { //h function pou kanei post to Keyword tou xrhsth
          // Default options are marked with *
          const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
      
            
          });
          return response.json(); // parses JSON response into native JavaScript objects
        }

        function buildTable(data){  //h function pou kanei create to table
          var table = document.getElementById('myTable')
          table.innerHTML = ''; //clear table
      
          for (var i = 0; i <data.length; i++){
              var row = `<tr>
                              <td>${data[i].movieId}</td>
                              <td>${data[i].title}</td>
                              <td>${data[i].genres}</td>
                              
                              
                         </tr>`
  
                         table.innerHTML += row
          }
      }