//Selecting elements from the DOM

const buttonElement1 = document.querySelector('#recomend');
const buttonElement2 = document.querySelector('#recomend2');
let apis = []; //data from ratings response
let apis1 = []; 
var countObj = 0;
var A=[];
var OK=[];
let xmeso=0;
let ymeso=0;
let xi=0;
var yi=0;
var riza1;
var riza2;
let arithmitis;
let paronomastis;
let max;
var maxid = 2;
let data12;
let data13;
let users = [];
let tainies = [];
//console.log(maxid);

const url1 = 'http://localhost:8080/ratings';
var url2; // = 'http://62.217.127.19:8010/ratings/'+maxid;
const url3 = 'http://localhost:8080/movies/';




buttonElement1.onclick = function(event){
    
    event.preventDefault();
    
    //var A=[];
    var i;
    //var countObj = 0;
    for (i = 0; i < movies.length; i++) {
    text = movies[i].movieid;
    A.push(text);
    countObj++; //counter for user ratings (help for pcc)
    }
    movies.sort(function(a, b) { //sort movies which user had rate based on the id of every movie
      return a.movieid - b.movieid;
    });
    
    const value = A; //for post data value=object content
    
    if(movies.length<3){
      alert("You must rate 3 movies");
    }
    else{

    

  postMovies(url1, { "movieList": value })
    .then(data => {
      

      for (var i = 0; i < data.length; i++) {
        
        let api = {userId: data[i].userId, movieId: data[i].movieId, rating: data[i].rating};
        apis.push(api); 
     }
 
     console.log("blah"); //debug
     
     x = tableOk(apis, countObj);
     



     clear(apis1, countObj);
     clearOk(apis1);
     console.log(OK);
     pcc(countObj);
     

     
    setTimeout(postUser, 10000);
    setTimeout(kala, 12000);
    setTimeout(buildTable1, 14000);


    postUser();
    kala();
    buildTable1();
 

      
    });
     
     
  }  

}




async function postMovies(url1, data /* = {"movieList": value }*/) {
  // Default options are marked with *
  
  
  const response = await fetch(url1, {  //h function pou kanei post tis tainies pou exei vathmologhsei o xrhsths
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

async function postUser(){  //function for get user movies with the biggest score
  url2 = 'http://localhost:8080/ratings/'+maxid;
  console.log(url2);
  fetch(url2)
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
            
            if(Object.values(A) != data[i].movieId){   
          
          let user = {movieid: data[i].movieId};
          users.push(user); 
          //console.log(data[i].movieId);
        }
        
        }
      });
      
}


async function postUserMovies(url3, i){ //continiously gets for every movie of the user

  //for (var i = 0; i < users.length; i++) {

  fetch(url3 + users[i].movieid)  
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        let tainia = {movieid: data[0].movieId, title: data[0].title, genre: data[0].genres}; //store movies
        tainies.push(tainia);
        
      });

    //}    
      
}

function kala(){  
  for (var i = 0; i < users.length ; i++) { //users.length
    postUserMovies(url3, i);
   }
}

function dataPros(){
for (var i = 0; i < users.length ; i++) { //users.length
  postUserMovies(url3, i);
 }
}



function printId(apis){ //only for debug
for (i = 0; i < apis.length; i++) {
  console.log(apis[i].id);
    }
  }



  function tableOk(apis, countObj){ 
    //console.log(apis);
    //let apis1 = [];
    for (var i = 0; i < apis.length-countObj; i++) {
      let movieArrayofUserI = [];
      
      for(var j=i; j < i+countObj; j++){
      //console.log(apis[i].userId);
      if(apis[i].userId == apis[j].userId){

        movieArrayofUserI.push({movieId: apis[j].movieId, rating: apis[j].rating});

      }
      else{
        i = j;
        break;
      }
    }
      apis1.push({id: apis[i].userId, arrayMovies: movieArrayofUserI});
   }
   return apis1;
  }



  function clear(apis1, countObj){  //function pou mazeuei mono xrhstes pou exoun ton arithmo tainiwn pou tha parei san parametro
    for(i=0; i< apis1.length; i++)
    if (apis1[i].arrayMovies.length < countObj){//borei na bei xwris to -1 gia na einai akrivws o idios arithmos tainiwn
        apis1[i] = null;
    }
  }



  function clearOk(apis1){  //function pou thekarei na exei to idio arithmo tainiwn me ton client
    //meter=0;
    for (i=0; i<apis1.length; i++){ //function for object OK tha is have the same number of movies with the client
      if(apis1[i] != null){
        OK.push(apis1[i]);
        //meter++;
      }      
    }

  }

  function pcc(countObj){ //Pearson Coeficient Algorithm
    //var x=0;
    //var y=0;
    var max=-1;
    //var maxid=-1;

      for (j=0; j<OK.length; j++){ //OK.length einai h synthikh to 2 einai gia mikrotera data
        var xi=0;
        var yi=0;
        var x=0;
        var y=0;
        var riza1=0;
        var riza2 = 0;
        var arithmitis = 0;
        var paronomastis = 0;
        var pearson = 0;
        
      
            for (i=0; i<countObj; i++ ){//ok
              x += parseFloat(movies[i].rating);
              y += parseFloat(OK[j].arrayMovies[i].rating);

            }
      
              //console.log(x); //debug
              xmeso = x/countObj;
              ymeso = y/countObj;
              //console.log(xmeso); //debug
              
                

          for (i=0; i<countObj; i++ ){//ok
            xi=0;
            yi=0;
            xi = parseFloat(movies[i].rating - xmeso);
            yi = parseFloat(OK[j].arrayMovies[i].rating - ymeso);
            arithmitis += parseFloat(xi*yi); 
            riza1 += parseFloat(xi*xi); 
            riza2 += parseFloat(yi*yi); 
            var p1 = Math.sqrt(riza1);
            var p2 = Math.sqrt(riza2);
            
          }
          paronomastis = parseFloat(p1*p2); 
          pearson = parseFloat(arithmitis/paronomastis);
          if (pearson > max){
            max = pearson;
            window.maxid = j;
            console.log(window.maxid);
          }

          var url2 = 'http://62.217.127.19:8010/ratings/'+maxid;
      
    }

  

  }

  function buildTable1(){ //function pou kanei create ton pinaka me tis tainies
    var table = document.getElementById('myTable')
    table.innerHTML = ''; //clear table

    for (var i = 0; i <tainies.length; i++){
        var row = `<tr>
                        <td>${tainies[i].movieid}</td>
                        <td>${tainies[i].title}</td>
                        <td>${tainies[i].genre}</td>
                        
                        
                   </tr>`

                   table.innerHTML += row
    }
}
