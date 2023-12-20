let currentPage = 1;
const maxPagButtons = 6;
let startPagButton = 1;
let endPagButton = startPagButton + maxPagButtons;
// let tempFirstPage = 1;

fetch("/IncompatibleFood.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    displayLeftData(data.Tbl_IncompatibleFood); //[{},{},{}]
    console.log(data.Tbl_IncompatibleFood);
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayLeftData(data) {
  const leftContainer = document.getElementById("left-content-container");
  const leftItemsContainer = document.getElementById("left-items-container");

  const itemsList = data;
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(itemsList.length / itemsPerPage);

  displayItems(currentPage);
  displayPagination();

  function displayItems(page) {
    leftItemsContainer.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < itemsList.length; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("leftItem");
      itemDiv.innerHTML = `<span>${itemsList[i].FoodA} + ${itemsList[i].FoodB} => ${itemsList[i].Description}</span>`;
      leftItemsContainer.appendChild(itemDiv);
    }
  }

  function createPaginationContainer() {
    const paginationContainer = document.createElement("ul");
    paginationContainer.classList.add("pagination");
    paginationContainer.id = "pagination";
    leftContainer.appendChild(paginationContainer);
  }

  function createPaginationButton(text, className, page) {
    const listItem = document.createElement("li");
    listItem.classList.add(className);
    if (page === 1) {
      if (text !== "<" || text !== ">") {
        listItem.classList.add("active");
      }
    }
    listItem.textContent = text;
    listItem.addEventListener("click", () => {
      toggleDisabledButton(page);

      handlePaginationClick(page);
    });
   
    return listItem;
  }

  function handlePaginationClick(page) {
    currentPage = page;

    displayItems(page);
    addActiveStyle(page);

   
  }

  function createPrevNextButton(text, className) {
    const listItem = document.createElement("li");
    listItem.classList.add(className);
    listItem.id = className;

    // listItem.id = 'listItem';
    listItem.textContent = text;
    listItem.addEventListener("click", () => {
        const nextButton = document.getElementById("nextButton");
        const prevButton = document.getElementById("prevButton");
      if (text === ">") {
        prevButton.classList.remove("disabled");


        changePagButtonsDisplay(currentPage);

        currentPage++;
        displayItems(currentPage);
        addActiveStyle(currentPage);
        addActiveStyleCurrentButton(currentPage);

        if (currentPage === numberOfPages) {
          
        nextButton.classList.add("disabled");
        }
      } else if (text === "<") {
        
        changePagButtonsDisplayReverse(currentPage);
        
        // changePagButtonsDisplay(currentPage);
        currentPage--;
        if(currentPage === 1){
            
          prevButton.classList.add("disabled");
        } else if (currentPage !== numberOfPages){
            nextButton.classList.remove("disabled");
        }
        displayItems(currentPage);
        addActiveStyle(currentPage);
        addActiveStyleCurrentButton(currentPage);

       
      }
    });
    return listItem;
  }

  function displayPagination() {
    createPaginationContainer();
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const prevButton = createPrevNextButton("<", "prevButton");
    paginationContainer.appendChild(prevButton);

    // const maxPagButtons = 6;
    // let startPagButton = 1;
    // let endPagButton = startPagButton + maxPagButtons;

    for (let i = startPagButton; i < endPagButton && i <= numberOfPages; i++) {
      const listItem = createPaginationButton(i, "listItem", i);

      paginationContainer.appendChild(listItem);
      
    }

    const nextButton = createPrevNextButton(">", "nextButton");
    paginationContainer.appendChild(nextButton);
  }

  

  function addActiveStyle(page) {
    const paginationItems = document.querySelectorAll(".pagination .listItem");

    Array.from(paginationItems).forEach((item) =>
      item.classList.remove("active")
    );
    const activeItem = Array.from(paginationItems).filter(
      (item) => Array.from(paginationItems).indexOf(item) + 1 === page
    );

    if (activeItem.length > 0) {
      activeItem[0].classList.add("active");
    }
  }

 

  function changePagButtonsDisplay(currentPage) {
    if (currentPage > 5 && currentPage % 6 === 0) {
      startPagButton = currentPage + 1;
      endPagButton = startPagButton + maxPagButtons;

      // addActiveStyle(currentPage)

      displayPagination();

      addActiveStyle2();
    }
  }

  function addActiveStyle2() {
    const paginationItems = document.querySelectorAll(".pagination .listItem");
    paginationItems.forEach((item) => {
      
      item.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        item.classList.add("active");
      });
    });
  }

  function addActiveStyleCurrentButton(page) {
    const paginationItems = document.querySelectorAll(".pagination .listItem");
    paginationItems.forEach((item) => {
      if (item.textContent === page.toString()) {
        item.classList.add("active");
      }
    });
  }
  if (currentPage == 1) {
    const prevButton = document.getElementById("prevButton");
    prevButton.classList.add("disabled");
  }

  function changePagButtonsDisplayReverse(page) {
    if (page === 7 || page === 13) {
      console.log("this si siz");
      startPagButton = page === 7 ? 1 : 7;
      endPagButton = startPagButton + maxPagButtons;

      // addActiveStyle(currentPage)

      displayPagination();
      addActiveStyle(page);
      addActiveStyle2();
    }
  }

  function toggleDisabledButton(page) {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    if (page === 1) {
      prevButton.classList.add("disabled");
    }
     else {
      prevButton.classList.remove("disabled");
    }
    if (page === numberOfPages) {
      nextButton.classList.add("disabled");
    } else {
      nextButton.classList.remove("disabled");
    }
  }
}
