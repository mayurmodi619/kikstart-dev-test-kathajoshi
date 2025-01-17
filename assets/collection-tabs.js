/* 
var xhr = new XMLHttpRequest();
xhr.open('GET', '/collections/all?sections=template--14594622488672__product-grid,template--14594622488672__banner');
xhr.onload = function() {
  if (xhr.status === 200) {
    var sections = JSON.parse(xhr.responseText);
      console.log('sections', sections);
    document.getElementById('product-grid').innerHTML = sections['template--14594622488672__product-grid'];
    document.getElementById('banner').innerHTML = sections['template--14594622488672__banner'];
  }
  else {
    console.log('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();
*/

function collectionTabsInit() {
  function renderProductGridContainer(html) {
    console.log(html);
    /* 
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;
    document.getElementById('collectiontabs').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('collectiontabs').innerHTML;
    console.log(document.getElementById('collectiontabs').innerHTML);
    */
    // document.getElementById('ProductGridContainer').querySelectorAll('.scroll-trigger').forEach((element) => {element.classList.add('scroll-trigger--cancel');});
  }
  function getFetchUrl(collectionUrl) {
    var bannerSectionId = document.querySelector('.main-collection-banner.shopify-section').id;
    bannerSectionId = bannerSectionId.replace('shopify-section-','');
    var productSectionId = document.getElementById('product-grid').id;
    var url = collectionUrl;
    if (window.location.search) {
      url = collectionUrl + window.location.search + '&section_id=' + productSectionId;
    } else {
      url = url + '?section_id=' + productSectionId;
    }
    console.log('url: ', url);
    return url;
  }
  function getFetchNewUrl(collectionUrl) {
    var newurl = collectionUrl;
    if (window.location.search) {
      newurl = collectionUrl + window.location.search;
    }
    console.log('newurl: ', newurl);
    return newurl;
  }

  var collectionTabLinks = document.querySelectorAll('.collection-tab-item .collection-link');
  //   console.log('length: ', collectionTabLinks.length > 0);
  if (collectionTabLinks.length > 0) {
    collectionTabLinks.forEach(function (collectionTabLink) {
      //   console.log('collectionTabLink', collectionTabLink);
      // Add an event listener to the collection link element
      collectionTabLink.addEventListener('click', async (event) => {
        // Prevent the default behavior of the link
        event.preventDefault();
        var url = getFetchUrl(event.target.href);
        var newurl = getFetchNewUrl(event.target.href);

        document.querySelector('.tabLoader').classList.add('loading');

        // Fetch the collection data using the URL
        const response = await fetch(url);
        console.log(response);
        // Get the HTML content of the collection
        const html = await response.text();
        console.log(html);
        
        //console.log(html);
        renderProductGridContainer(html);

        window.history.replaceState({ path: newurl }, '', newurl);
        collectionTabsInit();
        document.querySelector('.tabLoader').classList.remove('loading');
        console.log('collection loaded');
      });
    });
  }

  let tabSelect = document.querySelector('#collectionTabs');
  tabSelect.addEventListener('change', async () => {
    var selectValue = tabSelect.options[tabSelect.selectedIndex].value;
    var url = getFetchUrl(selectValue);
    var newurl = getFetchNewUrl(selectValue);
    console.log('url', url);
    console.log('newurl', newurl);
    document.querySelector('.tabLoader').classList.add('loading');

    // Fetch the collection data using the URL
    const response = await fetch(url);

    // Get the HTML content of the collection
    const html = await response.text();
    //console.log(html);
    renderProductGridContainer(html);

    window.history.replaceState({ path: newurl }, '', newurl);
    collectionTabsInit();
    document.querySelector('.tabLoader').classList.remove('loading');
    console.log('collection loaded');
  });
}

window.addEventListener('load', function () {
  collectionTabsInit();
});
