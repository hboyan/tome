
// object that will hold all the future spell data pulled from JSON files
var spellData = {
  "spells": {},
  "classes": {}
};

var shelf = {};

//var Book = new ParseObjectType("spellbook_tpf");

function Spellbook(name) {
  this.name = name;
  this.spells = {};
};

var $spellGrid; //context for isotope
$().ready( function() {

  var $newBook = $('#new-book');
  var $loadBook = $('#load-book');
  var $books = $('.books');
  var $newBookInput = $('.new-book-input');

  $newBook.on('click', function(e){
    e.preventDefault();
    //var newBook = prompt("What would you like to call your spellbook?");
    if ($books.css("display") == "block") {
      $books.slideToggle('slow', function() {
        $newBookInput.slideToggle();
      })
    } else {
      $newBookInput.slideToggle();
    }

  })
  $newBookInput.submit(function (e) {
    // var key = e.which;
    // if(key == 13)  // the enter key code
    // {
    var newBook = $('.new-book-input input').val();
    $('.new-book-input input').val('');
    addBook(newBook);
    $newBookInput.slideToggle();
    return false;
    // }
  });

  $loadBook.on('click', function(e){
    e.preventDefault();
    //$loadBook.addClass(active);
    if ($newBookInput.css("display") == "block") {
      $newBookInput.slideToggle('slow', function() {
        $books.slideToggle();
      })
    } else {
      $books.slideToggle();
    }
  });

  $('.books').on('click', 'li', function(e){
    var bookToLoad = $(this).text();
    renderSpells(shelf[bookToLoad]);
  })


  var $spells = $('.spells');

  // get the spell list, add it to the master spellData object
  $.getJSON('spells.json', function(data) {
    spellData.spells = data;
    // send data to Handlebars for rendering
    // get the Spells by Class lists, add them to spellData
    $.getJSON('spellsByClass.json', function(data) {
      spellData.classes = data;
      addClasses(spellData.classes, spellData.spells);
      renderSpells(spellData);
      renderClasses(spellData);
    })
  });

  var currentLvl;

  function updateFilters() {
    var filters = [];
    $( ".active" ).each(function( index ) {
      filters.push("." + $(this).text());
    });
    filterString = filters.join('');
    $spellGrid.isotope({filter: filterString});
  }

  // set up isotope filtering on Level field
  $('.levels a').on("click", function(e) {
    e.preventDefault();
    if (currentLvl == "." + $(this).text()) {
      $(this).removeClass('active');
      currentLvl = null;
    } else {
      currentLvl = "." + $(this).text();
      $(".levels .active").removeClass('active');
      $(this).addClass('active');
    }
    updateFilters();
  });

  var currentClass;
  // set up isotope filtering on Classes field
  $('.classes').on('click', "a",function(e) {
    e.preventDefault();
    if (currentClass == "." + $(this).text()) {
      $(this).removeClass('active');
      currentClass = null;
    } else {
      currentClass = "." + $(this).text();
      $(".classes .active").removeClass("active");
      $(this).addClass('active');
    }
    updateFilters();
  });


  // event handlers for adding '+' on hover
  var originalLvl;
  $('.spells').on('mouseenter','.spell-header', function(e) {
    var $spellLvl = $('.spell-header-lvl', this);
    originalLvl = $spellLvl.text();
    $spellLvl.addClass('spell-header-lvl-hover');
    $spellLvl.text('+');

  })

  $('.spells').on('mouseleave', '.spell-header', function(e) {
    var $spellLvl = $('.spell-header-lvl', this);
    $spellLvl.removeClass('spell-header-lvl-hover');
    $spellLvl.text(originalLvl);
  })

  // when you click a plus sign...
  $('.spells').on('click','.spell-header-lvl', function(e) {
    var book;
    var spellToAdd = $(this).prev().text();
    console.log(spellToAdd);
    if ($.isEmptyObject(shelf) === true) {
      book = prompt("You haven't created a spellbook yet. Pick a name, and we'll add one now!");
      addBook(book);
    } else {
      book = prompt("Which book would you like to add this to?")
      // var $spellDesc = $(this).parents('.spell').children('.spell-description');
      // $spellDesc.html('');
      // renderBooks(shelf, $spellDesc);
    }
    addSpellToBook(spellToAdd, book);
  });

  function addBook(book) {
    shelf[book] = new Spellbook(book);
    renderBooks(shelf, $books);
    console.log(shelf);
  }

  function addSpellToBook(spellToAdd, book) {
    if (!(spellToAdd in shelf[book].spells)) { // only add if not already present
      shelf[book].spells[spellToAdd] = (spellData.spells[spellToAdd]);
    }
  }


  var didItHappen = false;
  // all the handlebars functions. Could definitely refactor...
  function renderSpells(spells) {
    var html = compileSpells(spells);
    $spells.html(html);
    if (!didItHappen) {
      $spellGrid = $spells.isotope({
        filter: '*',
      });
    }
    didItHappen = true;
  }

  function compileSpells(data) {
    var source = $("#spell-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
  }

  function renderClasses(classes) {
    var html = compileClasses(classes);
    $('.classes').append(html);
  }

  function compileClasses(data) {
    var source = $("#class-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
  }

  function renderBooks(books, loc) {
    var html = compileBooks(books);
    loc.html(html);
  }

  function compileBooks(data) {
    var source = $('#book-list-template').html();
    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
  }

  Handlebars.registerHelper('list', function(items) {
    if (items) {
      var out = items.join(' ');
      return out;
    }
  });




  // add a class property to each spell in the list
  function addClasses(src, target) {
    // for every class in the spellsByClass json
    for (var dndClass in src) {
      // loop through the list of spells paired with that class
      src[dndClass].forEach(function(spell){
        // if that spell exists (my json seems to be lacking...)
        if (target[spell]) {
          // and if that spell doesn't already have a classes property
          if (!target[spell].classes) {
            // add the property, and push this class to the array
            target[spell].classes = [];
            target[spell].classes.push(dndClass);
          } else {
            // otherwise, just add it to the array
            target[spell].classes.push(dndClass);
          }
        }
      })
    }
  }
});
