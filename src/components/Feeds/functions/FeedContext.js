

export default class FeedContext{
   
    constructor(feed){
        this.feed = feed
    }
    setFeedContext(feed){
        this.feed = feed
    }
    sortFeed(array){
       return this.feed.stort(array)
    }
}