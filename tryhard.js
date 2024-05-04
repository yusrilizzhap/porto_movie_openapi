

$('.buton-tekan').on('click' , function(){//ajax carikan kelas batton tekan danbuat event click

$.ajax({
    url: 'http://www.omdbapi.com/?apikey=1d883c9c&s=' + $('.input-cari').val(),
    success : function(o) {
        let data = o.Search;
        let card = '';
        
        data.forEach(m => {
            card += `
            <div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <p class="card-text">${m.Year}</p>
                        <a href="#" class="btn btn-primary modal-detail-batton" data-toggle="modal" data-target="#detail" data-imdbid="${m.imdbID}">Go somewhere</a>
                    </div>
                </div>
            </div>`;
        });
        
        $('.movie-container').html(card);//ajax carikan kelas movie container dan masukan card ke class movie container
        $('.modal-detail-batton').on('click' , function(){//ajax carikan class modal detail lalu klik //TOMBOL DETAIL
            $.ajax({//ajax buatkan tiga properti url , success dan error
                url: 'http://www.omdbapi.com/?apikey=1d883c9c&i='  + $(this).data('imdbid'),  // jangan lupa imdbid dan api dari url avenger dihapus, S diganti i
                success: s =>{
                    const list = `
                                    <div class="container-fluid">
                                    <div class="row">
                                    <div class="col-md-5">
                                        <img src="${s.Poster}" class="img-fluid">
                                    </div>
                        
                                    <div class="col-md"><!--list groub-->
                                        <ul class="list-group">
                                        <li class="list-group-item"><h5>harry poter</h5></li>
                                        <li class="list-group-item"><strong>judul:${s.Title} </strong></li>
                                        <li class="list-group-item"><strong>Direktor:${s.Director}</strong></li>
                                        <li class="list-group-item"><strong>tahun :${s.Year}</strong></li>
                                        <li class="list-group-item"><strong>genre : ${s.Genre}</strong></li>
                                        </ul>
                                    </div>
                        
                                    </div>
                                </div>`;

             $('.modal-body').html(list);//AJAX CARIKAN CLASS MODAL BODY LALU MASUKAN LIST KE MODAL BODY

                },
                error: err=> console.error(err)
            })

        })

    },
    error: function(error) {
        console.log(error);
    }





});

}); //penutup batton tekan
// >>>>>>>>>>>>>>FETCH>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const submit = document.querySelector('.buton-tekan');//pertama dom ngambil class buton-tekan 
submit.addEventListener('click', function(){//dua event handler click tombol submit

    const input = document.querySelector('.input-cari');//tiga dom ngambil class input-cari
fetch('http://www.omdbapi.com/?apikey=1d883c9c&s=' + input.value) //empat membuat fecth api mengambil api data dan tambahkan semua isi input
.then(response =>response.json())//lima bila sukses/then respon /tangkap data dari input jadikan json/object 
.ten(response =>{//enam setelah jadi object 
    const movie = response.Search;//tujuh kita  buat varible yang menampung object search
    let card = '';//delapan buat tampungan card
    movie.forEach(e => {//sembilan kita looping movie agar movie bisa tampil terus menerus
        card += cards(e) ;//sepuluh kita buat html menjadi card
    });
     let classcard = document.querySelector('.movie-container'); //sebelas kita tankap class movie-container agar card bisa ditaruh disini
     classcard.innerHTML = card;//duabelas tumpuk card menjadi classcard/movie-container
    //membuat tombol detail NOTE HARUS BERADA DI THEN YA 
    //DIBAWAH INI ADALAH NODELIST/ARRAY/KUMPULAN DARI BANYAK ELEMENT HTML KITA HARUS PAKEK QUERYSELECTORALL SOALNYA ARRAY/NODELIST
     const classtombolmodal = document.querySelectorAll('.modal-detail-batton');//tigabelas agar tombol show detail bisa diclik kita tangkap class tombol detail
     classtombolmodal.forEach(e =>{//empatbelas kita looping tombol detail/classtomboldetail
        e.addEventListener('click' ,function(){
            const imdbid = this.dataset.imdbid; 
              console.log(imdbid);
            fetch('http://www.omdbapi.com/?apikey=1d883c9c&i=' + imdbid)
             .then(e => e.json())
             .then(u =>{
                let list = lists(u);
            
                 const modalbody = document.querySelector('.modal-body');
                 modalbody.innerHTML = list;


             })
          
        })
        // const classbodymodal = document.querySelectorAll('.modal-body');
        // classbodymodal.innerHTML = list;
     })

})


});


function cards(e){
     return `
    <div class="col-md-4 my-3">
                 <div class="card">
                     <img src="${e.Poster}" class="card-img-top" >
                     <div class="card-body">
                         <h5 class="card-title">${e.Title}</h5>
                         <p class="card-text">${e.Year}</p>
                         <a href="#" class="btn btn-primary modal-detail-batton" data-toggle="modal" data-target="#detail" data-imdbid="${e.imdbID}">Go somewhere</a>
                     </div>
                 </div>
             </div>`;
}
 

function lists(u){
    return `                        
    <div class="container-fluid">
         <div class="row">
         <div class="col-md-5">
             <img src="${u.Poster}" class="img-fluid">
         </div>

         <div class="col-md"><!--list groub-->
             <ul class="list-group">
             <li class="list-group-item"><h5>harry poter</h5></li>
             <li class="list-group-item"><strong>judul:${u.Title} </strong></li>
             <li class="list-group-item"><strong>Direktor:${u.Director}</strong></li>
             <li class="list-group-item"><strong>tahun :${u.Year}</strong></li>
             <li class="list-group-item"><strong>genre : ${u.Genre}</strong></li>
             </ul>
         </div>

         </div>
     </div>`;
}