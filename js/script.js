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
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }