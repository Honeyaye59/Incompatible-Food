import { data } from './IncompatibleFood.js';

// fetch("/IncompatibleFood.json")
//   .then((response) => response.json())
//   .then((data) => {
//     getDes(data.Tbl_IncompatibleFood);
    
//   })
//   .catch((error) => console.error("Error fetching data:", error));

let numOfMuu = 0;
let numOfOne = 0;
let numOfOrt = 0;
let numOfYinKyat = 0;
let numOfAKyaw = 0;
let numOfOneKite = 0;
let numOfYinPu = 0;
let numOfASate = 0;
let numOfThay = 0;
let numOfTout = 0;

getDes(data.Tbl_IncompatibleFood);

function getDes(listItems) {
  listItems.forEach((item) => {
    switch (item.Description) {
      case "မူးဝေ":
        numOfMuu++;
        break;
      case "ဝမ်းလျှော":
        numOfOne++;
        break;
      case "အော့အန်":
        numOfOrt++;
        break;
      case "ရင်ကြပ်":
        numOfYinKyat++;
        break;
      case "အကြောတက်":
        numOfAKyaw++;
        break;
      case "ဝမ်းကိုက်နာ":
        numOfOneKite++;
        break;
      case "ရင်ပူ":
        numOfYinPu++;
        break;
      case "အဆိပ်သင့်":
        numOfASate++;
        break;
      case "သေ":
        numOfThay++;
        break;
      case "တောက်":
        numOfTout++;
    }
  });

  const rightContentList = [
    {
      Description: "မူးဝေ ",
      number: numOfMuu,
    },
    {
      Description: "ဝမ်းလျှော ",
      number: numOfOne,
    },
    {
      Description: "အော့အန် ",
      number: numOfOrt,
    },
    {
      Description: "ရင်ကြပ်",
      number: numOfYinKyat,
    },
    {
      Description: "အကြောတက်",
      number: numOfAKyaw,
    },
    {
      Description: "ဝမ်းကိုက်နာ",
      number: numOfOneKite,
    },
    {
      Description: "ရင်ပူ",
      number: numOfYinPu,
    },
    {
      Description: "အဆိပ်သင့်",
      number: numOfASate,
    },
    {
      Description: "သေ",
      number: numOfThay,
    },
    {
      Description: "တောက်",
      number: numOfTout,
    },
  ];

  displayDes(rightContentList, listItems);
}

function displayDes(list, leftDataList) {
  const rightContentContainer = document.getElementById(
    "right-content-container"
  );

  const descContainer = document.getElementById("des-container");
  list.forEach((item) => {
    const descItem = document.createElement("div");
    descItem.classList.add("desc-item");
    descItem.innerHTML = `
        <div class="desc">
         ${item.Description}
        </div>
        <div class="number">${item.number}</div>
        
        `;
    descContainer.appendChild(descItem);
  });

  
      
      
      

  const descItemList = document.querySelectorAll(".desc-item");
  descItemList.forEach((item1) => {
    item1.addEventListener("click", () => {
      const splitItemText = item1.innerText.split("\n")[0]; //မူးဝေ
      const splitItemNumber = +item1.innerText.split("\n")[1]; //type == number 5
      
      

      const leftContainer = document.getElementById("left-content-container");
      const leftItemsContainer = document.getElementById(
        "left-items-container");
      
      
      

      let itemsToShow = leftDataList.filter((item2) => {
        return item2.Description == splitItemText;
      });
      

    //   itemsToShow.forEach((item3) => {
    //     const itemDiv = document.createElement("div");
    //     itemDiv.classList.add("leftItem");
    //     itemDiv.innerHTML = `<span>${item3.FoodA} + ${item3.FoodB} => ${item3.Description}</span>`;
    //     leftItemsContainer.appendChild(itemDiv);
    //   });

      // Remove Pagination First
      createPaginationContainer();
     
      const pagination = document.getElementById("pagination");
      
      pagination.innerHTML = "";
      let currentPage = 1;
      const maxPagesToShow = 6;
      let startPage = 1; //start pagination button
    let endPage = startPage + maxPagesToShow; 
const itemsPerPage = itemsToShow.length >= 10 ? 10 : itemsToShow.length;
const numberOfPages = Math.ceil(itemsToShow.length / itemsPerPage);

displayItems(currentPage);

      
      
      displayPagination();
      

      // End Pagination Section
      function createPaginationContainer() {
        // Create Pagination
        const paginationContainer = document.createElement("ul");
        paginationContainer.classList.add("pagination");
        paginationContainer.id = "pagination";
        leftContainer.appendChild(paginationContainer);
      }

      function displayItems(page){
        
        leftItemsContainer.innerHTML = "";
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        for (let i = startIndex; i < endIndex && i < itemsToShow.length; i++) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("leftItem");
            itemDiv.innerHTML = `<span>${itemsToShow[i].FoodA} + ${itemsToShow[i].FoodB} => ${itemsToShow[i].Description}</span>`;
            leftItemsContainer.appendChild(itemDiv);
          }
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

      function createPrevNextButton(text, className) {
        const listItem = document.createElement("li");
        listItem.classList.add(className);
        listItem.id = className;
        listItem.textContent = text;

        listItem.addEventListener("click", () => {
            const nextButton = document.getElementById("nextButton");
        const prevButton = document.getElementById("prevButton");
          if (text === ">") {
           
            prevButton.classList.remove('disabled')
            
            changeListItemDisplay(currentPage);
            
            currentPage++;
            
            displayItems(currentPage);
            addActiveStyle(currentPage);
            addActiveStyleCurrentPage(currentPage);
            if (currentPage === numberOfPages) {
          
                nextButton.classList.add("disabled");
                }
                
          } else if (text === "<") {
            console.log(currentPage);
            changeListItemDisplayReverse(currentPage);
            
            currentPage--;
            if(currentPage === 1){
                prevButton.classList.add('disabled');
                nextButton.classList.remove('disabled')
            }
            displayItems(currentPage);
            addActiveStyle(currentPage);
            addActiveStyleCurrentPage(currentPage);
          }
        });
        return listItem;
      }

      function displayPagination(){
        
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = ""
   
    const prevButton = createPrevNextButton("<", "prevButton");
    
   
    
    if(splitItemNumber > itemsPerPage){
        paginationContainer.appendChild(prevButton);
    }
    
    
   
    if(splitItemNumber > itemsPerPage){
        
        if(numberOfPages > maxPagesToShow){
            
            for(let i = startPage; i < endPage; i++){
                const listItem = createPaginationButton(i, "listItem", i);
                paginationContainer.appendChild(listItem);
            }
        }else{
            for(let i = startPage; i <= numberOfPages; i++){
                const listItem = createPaginationButton(i, "listItem", i);
                paginationContainer.appendChild(listItem);
            }
        }
      
    }

   
      const nextButton = createPrevNextButton(">", "nextButton");
      if(splitItemNumber > itemsPerPage){
        paginationContainer.appendChild(nextButton);
      }
     
      }

      function handlePaginationClick(page) {
        currentPage = page;
       
        displayItems(page);
        addActiveStyle(page);
    
        // addActiveStyle(page);
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

      function changeListItemDisplay(currentPage) {
        
        if (currentPage > 5 && currentPage % 6 === 0) {
            
          startPage = currentPage + 1;
          
          endPage = startPage + maxPagesToShow;
    
          // addActiveStyle(currentPage)
    
          displayPagination();
    
          addActiveStyle2();
        }
    
        
      }

      function addActiveStyle2() {
        const paginationItems = document.querySelectorAll(
          ".pagination .listItem"
        );
        paginationItems.forEach((item) => {
          // if(item.textContent === startPage.toString()){
          //   item.classList.add('active')
          // }
  
          item.addEventListener("click", () => {
            document.querySelector(".active")?.classList.remove("active");
            item.classList.add("active");
          });
        });
      }


      function changeListItemDisplayReverse(page) {
        
        if (page === 7) {
          
          startPage = 1;
          endPage = startPage + maxPagesToShow;
    
          // addActiveStyle(currentPage)
    
          displayPagination();
          addActiveStyle(page);
          addActiveStyle2();
        }
      }
    
      function addActiveStyleCurrentPage(page) {
        const paginationItems = document.querySelectorAll(".pagination .listItem");
        paginationItems.forEach((item) => {
          if (item.textContent === page.toString()) {
            item.classList.add("active");
          }
        });
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
      if (currentPage == 1) {
        const prevButton = document.getElementById("prevButton");
        prevButton.classList.add("disabled");
      }
    });
  });


}
