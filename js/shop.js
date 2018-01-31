//alert('hello');

//Helper
//https://cmatskas.com/get-url-parameters-using-javascript/

var parseQueryString = function(url) {
    var urlParams = {};
    url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            urlParams[$1] = $3;
        }
    );

    return urlParams;

}

var urlParams = parseQueryString(location.search);
console.log(urlParams);

// Categories

function CategoryManager() {

    this.categories = [];
    this.url = "http://api.origin.berlin/category";
    this.currentCategory = false;
    this.menu = $("#category-menu");

    this.loadCategories = function() {
        var that = this;
        $.getJSON(this.url, function(data) {
            //console.log(data);
            //console.log(that);
            //console.log(this);
            that.categories = data;
            that.addMenuItems();
            that.getCurrentCategory();
        })
    }

    this.addMenuItems = function() {
        var that = this;
        //go through categories
        $.each(this.categories, function(index, category) {
            //console.log(category);
            // add dinamically the name of each link to the navigation menu
            var li = $("<li>").addClass("nav-item");
            var a = $("<a>").addClass("nav-link").attr("href", "category.html?catID=" + category.id).text(category.name).appendTo(li);
            that.menu.append(li);
        });

    }

    this.getCurrentCategory = function() {
        var that = this;
        if (!urlParams.catID) return; // break if there is now param in the URL!

        // if (urlParams.catID) {
        //   console.log('category selected')
        // } else {
        //   console.log('category not selected');
        // }

        console.log('should search for category');
        $.each(this.categories, function(index, category) {
            console.log(category.id);
            if (category.id == urlParams.catID) {
                console.log('found!');
                that.currentCategory = category;
                console.log(category.name);
                $(".category-name").text(category.name);
            }

        });

    }

}

var categoryManager = new CategoryManager();
categoryManager.loadCategories();
//console.log(categoryManager);

function BookManager() {

    this.url = "http://api.origin.berlin/book";
    this.book = [];
    this.container = $("#book-container");
    this.currentBook= false;

    this.loadBooks = function() {
        var that = this;

        $.getJSON(this.url, function(data) {
            that.books = data;
            //console.log(that);
            that.addBooks();
            that.getCurrentBook();

        });
    }

    this.addBooks = function() {

        var that = this;

        $.each(this.books, function(index, book) {

            //console.log(book.image)

            var div = $("<div>").addClass("col-3");
            $("<img>").attr("src", book.image).addClass("img-fluid").appendTo(div);
            var p = $("<p>").appendTo(div);
            $("<a>").attr("href", "detail.html?book=" + book.slug).text(book.title).appendTo(p);
            that.container.append(div);

        });
    }

    this.getCurrentBook = function() {
        var that = this;
        if (!urlParams.book) return; // break if there is now param in the URL

        //console.log ('should search for book');
        $.each(this.books, function(index, book) {
            //console.log(book.id);
            if (book.slug == urlParams.book) {
                //console.log('found!');
                that.currentBook = book;
                $(".book-image").attr("src",that.currentBook.image);
                $(".book-title").text(that.currentBook.title);
                $(".book-author").text(that.currentBook.author);
                $(".book-price").text(that.currentBook.price);
                $(".book-year").text(that.currentBook.date);
                $(".book-reviews").text(that.currentBook.reviews);
                $(".book-ratings").text(that.currentBook.ratings);


            }

        });


    }

}

var bookManager = new BookManager();
bookManager.loadBooks();