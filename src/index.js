import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import { fetchImages } from './fetchImg';

const API_KEY = '27937043-64f9c887e86f29b7abf52345b';
const BASE_URL = 'https://pixabay.com/api/';
const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const container =document.querySelector('.gallery');
const loadMoreBtn= document.querySelector('.load-more')

let searchQuery='';
let totalImages=0;
let currentPage=0;

let gallery = new SimpleLightbox('.gallery a',  {captionDelay: 250});

form.addEventListener('submit', onBtnSearch);
loadMoreBtn.addEventListener('click', onLoadMore)

async function onBtnSearch(evt){
 try {evt.preventDefault();
container.innerHTML='';
loadMoreBtn.classList.add('hidden');
currentPage=1;
totalImages=0;
searchQuery= input.value
if(searchQuery===''){return}

const imageSet = await fetchImages(searchQuery);
await renderPage(imageSet);
await firstQuery(imageSet)}
catch{error=>console.log(error)};
}

async function onLoadMore(){
try{
currentPage+=1
const imageSet = await fetchImages(searchQuery);
await renderPage(imageSet);}
catch{error=>console.log(error)};
}

function renderPage(data){
  totalImages+=data.hits.length;
  if(data.total===0){notFound()}
  else if (data.total<=totalImages){makeMarkupImg(data);
    setTimeout(endOfResults, 3000);
  loadMoreBtn.classList.add('hidden');}
  else{loadMoreBtn.classList.remove('hidden');
  makeMarkupImg(data);
    }
  }
  
function makeMarkupImg(data){
const markup= data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads })=>{return `<a class="photo-card" href="${largeImageURL}">
    <img class="image-item" src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}"loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views:</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments:</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b> ${downloads}
      </p>
    </div>
    </a>`}).join('')
  container.insertAdjacentHTML("beforeend", markup);
  gallery.refresh()
  }
  


async function fetchImages(query){
try{ const params = new URLSearchParams({
           // key: API_KEY,
           // q: query,
           image_type: "photo",
           orientation: "horizontal",
           safesearch: true,
           per_page: 40,
         });
         const url=`${BASE_URL}?key=${API_KEY}&q=${query}&${params}&page=${currentPage}`
         
       
     const response=  await axios.get(url);
     return response.data;
     } catch(error){console.log(error);

    }
}

function notFound(){
    Notify.failure(('Нічого не знайшлося... Будемо ще щось шукати?'), {position: 'left-top', timeout: 1000, fontSize: '20px', width: '380px',});
}

function emptyQuery(){
    Notify.info(('Що шукаємо?'), {position: 'left-top', timeout: 1000, fontSize: '20px', width: '380px',});
}

function firstQuery(data){
  if (data.totalHits>0){
    Notify.info((`Юххху! Ми знайшли для тебе ${data.totalHits} зображень! `), {position: 'left-top', timeout: 1000, fontSize: '20px', width: '380px',});
}
}
function endOfResults(){
  Notify.info(('Здається це все...'), {position: 'left-top', timeout: 1000, fontSize: '20px', width: '380px',});
}