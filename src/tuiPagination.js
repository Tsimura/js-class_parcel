import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const itemsPerPage = 20;

const options = {
  totalItems: 10,
  itemsPerPage,
  visiblePages: 5,
  page: 1,
};

const container = document.getElementById('pagination');
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

const gallery = document.querySelector(`.gallery`);

fetchImg(page).then(({ images, total }) => {
  console.log(images);
  console.log(total);
  pagination.reset(total);
  renderImg(images);
});

function fetchImg(page) {
  const BASE_URL = `https://pixabay.com/api/?key=24435694-017d2bab3470121913608c0c0`;
  const SETTINGS = `&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(`${BASE_URL}${SETTINGS}&per_page=${itemsPerPage}&page=${page}&q=cat`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data`);
      }
      return response.json();
    })
    .then(data => ({
      images: data.hits,
      total: data.totalHits,
    }));
}

pagination.on('afterMove', ({ page }) => fetchImg(page).then(({ images }) => renderImg(images)));

function renderImg(images) {
  const marcup = images
    .map(
      ({
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        tags,
        largeImageURL,
      }) => `<li><div class="image-box"><a href="${largeImageURL}">
          <img class="img-hover" src="" data-lazy="${webformatURL}" alt="${tags}" loading="lazy" width="400px" height="300px">
          </a>
          <ul class="about-img">
          <li class="name-numbers">Likes
            <p class="number">${likes}</p>
          </li>
          <li class="name-numbers">Views<p class="number">
            ${views}
          </p></li>
          <li class="name-numbers">Comments<p class="number">
            ${comments}
          </p></li>
          <li class="name-numbers">Downloads<p class="number">${downloads}</p></li>
        </ul>
        </div></li>`,
    )
    .join('');
  gallery.insertAdjacentHTML(`beforeend`, marcup);
  const img = document.querySelectorAll('.gallery img');
  lazyLoad(img);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
function lazyLoad(targets) {
  const options = {
    rootMargin: '100px',
  };
  const onEntry = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.lazy;
        image.src = src;
        observer.unobserve(image);
      }
    });
  };
  const io = new IntersectionObserver(onEntry, options);
  targets.forEach(target => io.observe(target));
}
