// App logic.
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    var email = user.email;

    console.log(email);
    document.querySelector('#myNavigator').replacePage('tabs.html');
  } else {
    document.querySelector('#myNavigator').replacePage('views/signin.html');
  }
});



document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);

  document.getElementById("signout").onclick = function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }


  if (page.id === "home") {

    db.collection("movies").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var item = `<ons-carousel-item>
        <div style="text-align: center;"> <img src="${doc.data().posterURL}" style="width:100%;"></div>
        </ons-carousel-item>`
        var onsItem = document.createElement('ons-carousel-item');
        onsItem.innerHTML = item;
        page.querySelector('#carousel').appendChild(onsItem);
      });
    });

  }


  //test----------------------------
  if (page.id === "movie_details") {
    db.collection("movies").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var item = `<div>
        <div style="text-align: center;"> <img src="${doc.data().posterURL}" style="width:100%;"></div>
        <div class="card-doby">
           <h4 class="card-title">${doc.data().title} - ${doc.data().year}</h4>
           <p class="card-text">${doc.data().detail}</p>
           
      </div>
      <center>
      <div>Trailer</div>
                  <iframe src="${doc.data().trailer}" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
                  <center></div>`
        var onsItem = document.createElement('ons-carousel-item');
        onsItem.innerHTML = item;
        page.querySelector('#Detail').appendChild(onsItem);
      })
    });

  }
  //test-----------------------------------------

  if (page.id === "signin") {
    document.getElementById("signinbutton").onclick = function () {
      var username = document.querySelector("#username").value;
      var password = document.querySelector("#password").value;
      console.log(username, password);

      firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        document.querySelector("#error").innerHTML = errorMessage;
      });
    }

    document.getElementById("signingoogle").onclick = function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }


});

document.addEventListener("prechange", function (event) {
  if (event.tabItem) {
    document.querySelector(
      "ons-toolbar .center"
    ).innerHTML = event.tabItem.getAttribute("label");
  }
});


// movie
document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'tabhome') {
    page.querySelector('#menu_button').onclick = function() {
      document.querySelector('#menu').open();
    };

  
  }
  
});

function openMovieDetails(id) {
  document.querySelector('#myNavigator').pushPage('movie_details.html', {data: {title: id}});
}


function goBack() {
  document.querySelector('#menu').close().then(function() {
    document.querySelector('#myNavigator').popPage()
  });
}

