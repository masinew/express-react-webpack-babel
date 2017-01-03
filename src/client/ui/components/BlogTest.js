import React, { PropTypes } from 'react'
import localStyle from '../style/BlogList.scss';

const Bloga = ({
  dataSet
}) => {
  return (
    <div className="blog-list">
      <div className="jumbotron" style={{marginBottom: 0}}>
        <div className="container">
          <h1 className="display-3">Blog</h1>
        </div>
      </div>
      <div className="container">
        {
          dataSet.map((data) => {
            return <div className={localStyle.blog} id="callout-btn-group-accessibility" key={data.id}>
              <h3>{data.header}</h3>
              <hr/>
              <p>{data.shortInfo}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

Bloga.propTypes = {
  dataSet: PropTypes.array.isRequired
}

export default Bloga
