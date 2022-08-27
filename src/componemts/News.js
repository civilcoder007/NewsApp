import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


 const News=(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // document.title= `${capitalizeFirstLetter(props.category)} - NewsAtom`;
  
  

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateAllNews = async ()=>{

    props.setProgress(10);
    const url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=823043b133e84fcf8a9b7cfe697bf905&page=${page}&pagesize= ${props.pageSize}`;
      setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    console.log(parseData);
    props.setProgress(100);
  }
  useEffect(() => {
    updateAllNews(); 
  }, []);

  // // async componentDidMount() {
  //   // let url =
  //   //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=823043b133e84fcf8a9b7cfe697bf905&page=1&pagesize= ${props.pageSize}`;
  //   //   setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // setState({
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   //   loading: false
  //   // });

  // }

  const handlePrevious = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=823043b133e84fcf8a9b7cfe697bf905&page=${
    //   page - 1
    // }&pagesize= ${props.pageSize}`;
    // setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);

    // setState({
    //   page: page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // });
    setPage(page-1);
    updateAllNews(); 
  };

   const handleNext = async () => {
    // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=823043b133e84fcf8a9b7cfe697bf905&page=${
    //     page + 1
    //   }&pagesize= ${props.pageSize}`;
    //   setState({loading: true});
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   console.log(parseData);

    //   setState({
    //     page: page + 1,
    //     articles: parseData.articles,
    //     loading: false
    //   });
    // }

    setPage(page + 1)
    updateAllNews(); 
  };

   const fetchMoreData =  async () => {
     const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=823043b133e84fcf8a9b7cfe697bf905&page=${page+1}&pagesize= ${props.pageSize}`;
     setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    console.log(parseData);   
  }; 
    return (   
      <>
        <div className="container my-4">
          <h2 className="text-center" style={{margin:'40px 0px', marginTop:'80px'}}>Top {capitalizeFirstLetter(props.category)} Headlines for Today</h2>
          {loading &&<Spinner/>}

          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>

          <div className="container">
            
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    // description={
                    //   element.description
                    //     ? element.description.slice(0, 80)
                    //     : ""
                    // }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author ={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>  
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevious}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNext}
            disabled = {page + 1 > Math.ceil(totalResults / props.pageSize)}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );

News.defaultProps = {
  country: 'in',
  pageSize:8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category:PropTypes.string,  
}
}
export default News