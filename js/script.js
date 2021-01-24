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
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    currentList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const val = Object.values(tags);
  const min = Math.min(...val);  // czy to jest ok, zeby uzyc? I jak dokladnie sie tego uzywa? Czy to zmienia obiekt w tablice?
  const max = Math.max(...val);
  const result = { 'min': min, 'max': max};
  return result;
}

function calculateTagClass(count, params) {
  let a = Math.floor(count/params['max'] * 5);
  let className = optCloudClassPrefix + a;
  return className;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll('.post');
  for(let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    const tagsString = article.getAttribute('data-tags');
    const tagsArr = tagsString.split(' ');
    for (let i = 0; i < tagsArr.length; i++) {
      const tag = tagsArr[i];
      const tagHTML = "<li><a href='#tag-" + tag + "'>" + tag + "</a></li> ";
      tagWrapper.insertAdjacentHTML('beforeend', tagHTML);
      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
  }
  const tagList = document.querySelector('.tags');
  let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  for(let tag in allTags) {
    let tagClass = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += `<li><a href='#tag-${tag}' class="${tagClass}"> ${tag}</a></li>`;
  }
  tagList.innerHTML = allTagsHTML;
}

function generateAuthors(){
  let allAuth = {};
  const articles = document.querySelectorAll('.post');
  const authWrapper = document.querySelector(optAuthorListSelector); 
  for(let article of articles) {
    const authorID = article.getAttribute('data-authors');
    const author =  authorID.replace('#auth-', '');
    const authorName = article.querySelector('.post-author>a').innerHTML;
    const authHTML = `<li> <a href="${authorID}" class="${author}">${authorName}</a> </li>`;
    if (!allAuth[author]) {
      authWrapper.insertAdjacentHTML('beforeend', authHTML);
      allAuth[author] = 1;
    } else {
      allAuth[author]++;
    }
  }
  const authParams = calculateTagsParams(allAuth);
  for(let auth in allAuth) {
    let authClass = calculateTagClass(allAuth[auth], authParams);
    let targetElement = document.querySelector(`.${auth}`);
    targetElement.classList.add(authClass);  
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
  generateTitleLinks(`[data-authors="${auth}"]`);

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
const optTagsListSelector = '.tags.list';
const optAuthorListSelector = '.list.authors';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

generateTitleLinks();
generateAuthors();
generateTags();
addClickListenersToTags();
addClickListenersToAuthors();

