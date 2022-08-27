import React from "react";

const NewsItem = (props)=>{
 
    let { title, description, imgUrl, newsUrl, author, date,source } = props;
    return (
      <div className="my-4">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imgUrl
                ? "https://images.livemint.com/img/2022/08/22/600x338/PTI14-11-2020_000103B_1605496217265_1605496235680_1661128085755_1661128085755.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            </h5>
            <span className="badge text-bg-dark">New</span>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-danger">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-outline-info"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}
export default NewsItem
