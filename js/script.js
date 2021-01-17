'use strict';


const titleClickHandler = function(event){
    const clickedElement = this;
    console.log('Link was clicked!');
    event.preventDefault();
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
 
    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
 
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */

    let articleId = clickedElement.getAttribute('href');
    console.log(clickedElement.getAttribute('href'));
  
    /* find the correct article using the selector (value of 'href' attribute) */

    let targetArticle = document.querySelector(articleId);

  
    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  }



function generateTitleList() {

    /* current list of articles */
    const currentList = document.querySelector(optTitleListSelector);

    /* remove contents of titleList */
    for (let i=0; i = currentList.childElementCount; i++) {
        currentList.removeChild(currentList.childNodes[i]);
    }

    /* for each article */
    for( let article of articlesId) {
        
        /* get the article id */
        let articleId = article.getAttribute('id');

        /* find the title element and get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        currentList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}


const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';


const articlesId = document.querySelectorAll(optArticleSelector);
const articlesTitle = document.querySelectorAll(optTitleSelector);
generateTitleList();






// const tags = document.querySelectorAll('.post-tags > ul > li > a');
// console.log(tags);

// for(let tag of tags){
// tag.addEventListener('click', generateTitleList);
// }


