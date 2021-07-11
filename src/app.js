const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallerryContainer = document.querySelector('.js-gallery');
gallerryContainer.insertAdjacentHTML('afterbegin', createGalleryCardMarkup(galleryItems));
gallerryContainer.addEventListener('click', onGalleryLightboxClick);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }).join('');
};

const imageInModalWindow = document.querySelector('.lightbox__image');
let imageElement;
function onGalleryLightboxClick(event) {
  const isLinkElement = event.target.classList.contains('gallery__image');
  if (!isLinkElement) {
    return;
  }

  //запретить браузеру переходить по ссылке картинки
  event.preventDefault();

  //получение url большого изображения
  imageElement = event.target;
  //console.log(imageElement);
  const originalImage = imageElement.getAttribute('data-source');

  //Подмена значения атрибута src элемента img.lightbox__image.
  imageInModalWindow.setAttribute('src', originalImage);

  //открытие модального окна
  onModalOpen();

  // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
  //onArrowRightKeyPress();
  //onArrowLeftKeyPress();
};

window.addEventListener('keydown', onArrowRightKeyPress);

function onArrowRightKeyPress(event) {
  const ARROWRIGHT_KEY_CODE = 'ArrowRight';
  const isArrowRightKey = event.code === ARROWRIGHT_KEY_CODE;
  if (isArrowRightKey) {
    const imageElementNextSiblingLast = imageElement.parentNode.parentNode.nextElementSibling;
    if (imageElementNextSiblingLast === null) {
      onCloseModal();
    }
    else {
      let imageElementNextSibling = imageElement.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild;
      const originalImageElementNextSibling = imageElementNextSibling.getAttribute('data-source');;
      imageInModalWindow.setAttribute('src', `${originalImageElementNextSibling}`);
      imageElement = imageElementNextSibling;
    }
  };
};

window.addEventListener('keydown', onArrowLeftKeyPress);

function onArrowLeftKeyPress(event) {
  const ARROWLEFT_KEY_CODE = 'ArrowLeft';
  const isArrowLeftKey = event.code === ARROWLEFT_KEY_CODE;

  if (isArrowLeftKey) {
    const imageElementPreviousSiblingLast = imageElement.parentNode.parentNode.previousElementSibling;
    if (imageElementPreviousSiblingLast === null) {
      onCloseModal();
    }
    else {
      const imageElementPreviousSibling = imageElement.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild;
      const originalImageElementPreviousSibling = imageElementPreviousSibling.getAttribute('data-source');
      imageInModalWindow.setAttribute('src', `${originalImageElementPreviousSibling}`);
      imageElement = imageElementPreviousSibling;
    }
  };
};

const modalContainer = document.querySelector('.js-lightbox');

function onModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  modalContainer.classList.add('is-open');
};


function onCloseModal(event) {
  modalContainer.classList.remove('is-open');
  imageInModalWindow.setAttribute('src', '');
};

const buttonModalClose = document.querySelector('button[data-action="close-lightbox"]');
buttonModalClose.addEventListener('click', onCloseModal);
const overlayElement = document.querySelector('.lightbox__overlay');
overlayElement.addEventListener('click', onCloseModal);
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseModal();
  };
};

