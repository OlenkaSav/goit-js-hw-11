const API_KEY = '27937043-64f9c887e86f29b7abf52345b';
const BASE_URL = 'https://pixabay.com/api/';



// let currentPage=1;  
// let totalImages=0;
export function fetchImages(query){
    
 const params = new URLSearchParams({
        // key: API_KEY,
        // q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 20,
        // page: 1
      });
      const url=`${BASE_URL}?key=${API_KEY}&q=${query}&${params}&page=${currentPage}`
      
    // currentPage+=1;

      return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json()});
 };
  