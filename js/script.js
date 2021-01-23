'use strict';

const titleClickHandler = function(event){
    const clickedElement = this;
    event.preventDefault();

    const activeLinks = document.querySelectorAll('.titles a.active');
 
    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    
    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('article.active');
 
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    let articleId = clickedElement.getAttribute('href');
    let targetArticle = document.querySelector(articleId);

    targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
    const currentList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let i=0; i = currentList.childElementCount; i++) {
        currentList.removeChild(currentList.childNodes[i]);
    }

    for( let article of articles) {

        let articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        currentList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

function generateTags(){
    const articles = document.querySelectorAll('.post');
  
    for(let article of articles) {
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      const tagsString = article.getAttribute('data-tags');
      const tagsArr = tagsString.split(' ');

        for (let i = 0; i < tagsArr.length; i++) {
          const tag = tagsArr[i];
          const tagHTML = "<li><a href='#tag-" + tag + "'>" + tag + "</a></li> ";
          tagWrapper.insertAdjacentHTML('beforeend', tagHTML);
        }
    }
}

function tagClickHandler(event){
    event.preventDefault();

    const clickedElement = event.target;
    const href = clickedElement.getAttribute('href'); 
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }

    const allTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(allTagLinks);
    for(let tagLink of allTagLinks) {
        tagLink.classList.add('active');
    }
    generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags(){
    const tags = document.querySelectorAll('a[href^="#tag-"]');

    for (let tag of tags) {
        tag.addEventListener('click', tagClickHandler);
    }
}

function authorClickHandler(event){
    event.preventDefault();

    const clickedElement = event.target;
    const auth = clickedElement.getAttribute('href'); 
    const activeAuths = document.querySelectorAll('a.active[href^="#auth-"]');
    for (let activeAuth of activeAuths) {
        activeAuth.classList.remove('active');
    }

    const allAuthorsLinks = document.querySelectorAll(`a[href="${auth}"]`);
    for(let authorLink of allAuthorsLinks) {
        authorLink.classList.add('active');
    }
    generateTitleLinks(`[data-authors~="${auth}"]`);

}

function addClickListenersToAuthors(){
    const authors = document.querySelectorAll('a[href^="#auth-"]');

    for (let author of authors) {
        author.addEventListener('click', authorClickHandler);
    }
}
  
  
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

generateTitleLinks();
generateTags();
addClickListenersToTags();
addClickListenersToAuthors();

