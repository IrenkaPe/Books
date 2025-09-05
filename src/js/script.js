class BookList {
  constructor(){
    this.dom = {};

    this.data = {
      favoriteBooks: [],
      filters:[]
    };

    this.init();
  }


  init(){
    this.getElements();
    this.compileTemplate();
    this.renderBooks();
    this.initActions();
  }

  getElements() {
    this.dom.bookList = document.querySelector('.books-list');
    this.dom.filtersForm = document.querySelector('.filters');
  }

  compileTemplate() {
    const templateSource = document.getElementById('template-book').innerHTML; // Pobieramy szablon z HTML-a
    this.template = Handlebars.compile(templateSource);// Kompilujemy szablon za pomocą biblioteki Handlebars
  }

  renderBooks(){
    this.dom.bookList.innerHTML = '';

    for(let book of dataSource.books){
      const ratingWidth = book.rating * 10;
      const ratingBgc = this.determineRatingBgc(book.rating);
                
      const bookData = {
        id: book.id,
        name: book.name,
        rating: book.rating,
        image: book.image,
        details: book.details,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc
      };

      const bookHTML = this.template(bookData);
      const bookElement = utils.createDOMFromHTML(bookHTML);
      this.dom.bookList.appendChild(bookElement);
    }
  }

  initActions(){
    /*const bookImages = document.querySelectorAll ('.book__image');

            for(let image of bookImages){
                image.addEventListener('dblclick', function(event){
                    event.preventDefault();
                    image.classList.toggle('favorite');
                    const bookId = parseInt(image.dataset.id);
                    favoriteBooks.push(bookId);
                });
            } Nasłuuchiwacz na wszystkie okładki książek -> zamieniam na nasłuchiwacz na cały kontener */ 
    this.dom.bookList.addEventListener('dblclick', (event) => {
      event.preventDefault();

      const bookImage = event.target.offsetParent;

      if(bookImage && bookImage.classList.contains('book__image')) {
        const bookId = parseInt(bookImage.dataset.id);
        const isFavorite = this.data.favoriteBooks.includes(bookId);

        if (isFavorite){
          const index = this.data.favoriteBooks.indexOf(bookId);// musze sprawdzić jaki jest index tego elementu w tablicy favoriteBooks 
          this.data.favoriteBooks.splice(index,1); // tu usuwam ten index z tablicy
          bookImage.classList.remove('favorite');//i zabieram klasę 
        }
        else {
          this.data.favoriteBooks.push(bookId); // pcham do tablicy
          bookImage.classList.add('favorite'); // dodaje klasę
        }
      }
    });

    this.dom.filtersForm.addEventListener('change', (event) => {
      event.preventDefault();
      if(
        event.target.tagName === 'INPUT'&&
                event.target.name ==='filter'&&
                event.target.type ==='checkbox'
      ){
        console.log (event.target.value);    

        if(event.target.checked){
          this.data.filters.push(event.target.value);
        }
        else {
          const index = this.data.filters.indexOf(event.target.value);
          if (index !== -1){
            this.data.filters.splice(index, 1);
          }
        }
        console.log ('Aktywne filtry:', this.data.filters);
        this.filterBooks();
      }
    });
  }

  filterBooks (){
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      for (let filter of this.data.filters){
        if(filter==='adults' && !book.details.adults){
          shouldBeHidden = true;
          break;
        }
        if (filter==='nonFiction' && !book.details.nonFiction){
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      if (bookImage){
        if (shouldBeHidden){
          bookImage.classList.add('hidden'); }
        else {
          bookImage.classList.remove('hidden');
        }}
    }
  } 

  determineRatingBgc(rating){
    if(rating < 6){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    else if(rating >=6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    else if(rating >8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }
    else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
  }

}
const app = new BookList();
window.app = app;