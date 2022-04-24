//implement javascript file
const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather"
function tweetstruct(text, id, creation){
    this.creation=creation;
    this.id=id;
    this.text=text;
    return this;
}
let tweetscont=[];
let id=[]
function getTweets(){
    fetch(url)
    .then(res => res.json()) .then(data => {  
    // do something with data
        for( let i=0;i<Object.keys(data.statuses).length;i++){
            let t = new tweetstruct(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at)
            if(removeDup(t)){
            tweetscont.push(t);}
            console.log(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at);
        }
        refreshTweets(tweetscont);
    })
    .catch(err => {
        // error catching
    console.log(err) })
} 
function removeDup(a){
    for(let i=0; i<tweetscont.length;i++){
        if(a.id===tweetscont[i].id)return false;
    }
    return true;
}

window.onload=function(){
    setInterval(getTweets(),10000)
}
setInterval(getTweets,10000);

let searchString = "" // here we use a global variable

// const handleSearch = event => {
//     searchString = event.target.value.trim().toLowerCase()
//     // you may want to update the displayed HTML here too
// }
// document.getElementById("searchBar").addEventListener("input", handleSearch);
function filteringFunc(arr, query){
    if(query!==""){
        return arr.filter(el => el.text.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }
    return arr;
}
function sortTime (a,b){
    return Date.parse(a.creation) - Date.parse(b.creation);
}

const tweetContainer = document.getElementById('tweet-container');

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    const tweetList = document.createElement("ul");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    tweetContainer.appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable

    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    const filteredResult = filteringFunc(tweets,searchString);//implement function to check if matches and pass in
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort(sortTime);//implement function to check order

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        const tweetTime = document.createTextNode("Date: "+ tweetObject.creation+"\t");
        const tweetID = document.createTextNode("ID: "+tweetObject.id+"\t");
        console.log(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetTime);
        tweetContent.appendChild(tweetID);
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}

