//implement javascript file
const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather"
function tweetstruct(text, id, creation){
    this.creation=creation;
    this.id=id;
    this.text=text;
}
let tweetsID=[];
    let dupsCulled = 0;
let tweetscont=[];
    //tweetscont.filter = filter;
//let queriedTweets=[];
//let tweets = [];
function getTweets(){
    console.log("ENTERED GETtWEETS()");
    fetch(url)
    .then(res => res.json()) .then(data => {  
    // do something with data
        for( let i=0; i < Object.keys(data.statuses).length; i++){
            if( isDuplicate(data.statuses[i].id) ){
                tweetscont.push(new tweetstruct(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at));
                console.log(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at);
            }
            
        }
        refreshTweets(tweetscont);
    })
    .catch(err => {
        // error catching
    console.log(err) })
} 

var feed = { interval: 0, active: true };
window.onload=function(){
    getTweets();
    feed.interval = setInterval(getTweets,10000);
    feed.active = true;
}

let searchString = "" // here we use a global variable

const handleSearch = event => {
    //needs work ############################
     //searchString = event.target.value.trim().toLowerCase()
     // you may want to update the displayed HTML here too
     console.log("Boop");
}

document.getElementById("searchBar").addEventListener("input", handleSearch);

const tweetContainer = document.getElementById('tweet-container');

// /**
//  * Removes all existing tweets from tweetList and then append all tweets back in
//  *
//  * @param {Array<Object>} tweets - A list of tweets
//  * @returns None, the tweets will be renewed
//  */
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
    const filteredResult = tweets.filter();//implement function to check if matches and pass in
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort();//implement function to check order

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
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}

//=====ADDED=====
function isDuplicate(request){
    for(let i = 0; i < tweetsID.length; ++i){
        if(tweetsID[i] == request){
            dupsCulled++;
            return 0;
        }
    }
    tweetsID.push(request);
    return 1;
}

function toggleFeed(feed){
    if(feed.active)
        clearInterval(feed.interval);
    else{
        feed.interval = setInterval(getTweets, 10000);   
    }

    feed.active = !feed.active;
    console.log(`Toggle Feed -> [${feed.active}] \t- (${feed.interval})`);
    document.getElementById('Feed_Button').innerText = (feed.active) ? "ii": ">";
}

tweetscont.filter = function(){
    let filteredTweets = [];
    filteredTweets.sort = sort;

    for(let i = 0; i < this.length; ++i){
        if(this[i].text.includes(searchString))
            filteredTweets.push(this[i]);
    }
    //done?############## 
    return filteredTweets;
}

function sort() {
    //needs work ################
    console.log("Bye - Sort");

    return this;
}