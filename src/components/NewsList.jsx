import React from 'react'
import NewsItem from './NewsItem';


const NewsList = React.forwardRef(({ news }, ref) => {
    return (
        <div>
            {news && news.length === 0 && <h4>There is no News</h4>}
            {news && news.map(item => <NewsItem key={item.title} item={item} ref={ref} />)}
        </div>
    )
})

export default NewsList
